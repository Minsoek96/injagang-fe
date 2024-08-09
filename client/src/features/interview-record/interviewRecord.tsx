import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { useInterViewStore } from '@/src/entities/interview_question';

import {
  Container,
  MainButton,
} from '@/src/shared/components';
import { styleMixin, V } from '@/src/shared/styles';
import { useMediaRecord, useModal, useWebSpeech } from '@/src/shared/hooks';

import VideoTimer from '@/src/features/interview-record/video/VideoTimer';
import InterViewSlider from './InterViewSlider';
import { VideoPlayer, ScriptTextArea } from './video';

/** 영상 녹화 메인 컴포넌트 */
function InterviewRecord() {
  const [curIndex, setCurIndex] = useState<number>(0);
  const [isSpeaching, setIsSpeching] = useState<boolean>(false);
  const [isResultMode, setIsResultMode] = useState<boolean>(false);
  const [isScriptView, setIsScriptView] = useState<boolean>(false);
  const [videoIndex] = useState<number>(0);

  const {
    videoRef,
    handleRecord,
    handlePauseRecord,
    handleResumeRecord,
    handleRecordRemove,
    isPaused,
    isRecord,
    recordedChunks,
  } = useMediaRecord();

  const { setModal } = useModal();

  const { confirmQuestions } = useInterViewStore();

  const { setSpeechData, readingTheScript, speechData } = useWebSpeech(
    [],
    3000,
  );

  const isComplete = curIndex >= speechData.length;

  // 유저가 컨펌한 질문 리스트 셋팅
  useEffect(() => {
    setSpeechData([...confirmQuestions]);
  }, [confirmQuestions]);

  /** 음성 텍스트 시작 */
  const handleSpeak = async (): Promise<void> => {
    if (isComplete) {
      setModal({
        onAction: () => setCurIndex(0),
        contents: {
          title: 'Congratulations',
          message:
            '준비된 모든 질문이 끝났습니다. 처음부터 다시 반복을 원하시면 게속 진행해주세요',
        },
      });
      return;
    }
    if (isRecord || isResultMode) {
      handleRecordRemove();
      return;
    }

    await readCurrentScript();
    if (videoRef.current) handleRecord();
  };

  const handleEndRecord = () => {
    setIsScriptView(false);
    handleRecordRemove();
  };

  const readCurrentScript = async (): Promise<void> => {
    setIsSpeching(true);
    await readingTheScript(curIndex);
    setIsSpeching(false);
    setCurIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <RecordContainer $size={{ height: '60vh', width: '100%', flex: 'Col' }}>
      <PlayerHeader>
        <PlayerState>{isRecord ? '녹화중' : '대기상태'}</PlayerState>
        <SpeachingState $isBlock={isSpeaching || isRecord}>
          {isSpeaching
            ? '타이머가 3초가 되면 스피칭이 진행됩니다.'
            : isRecord && `${speechData[curIndex - 1]}`}
        </SpeachingState>
        <VideoTimer isRunning={isSpeaching || isRecord} />
      </PlayerHeader>
      {isResultMode && !isRecord ? (
        <InterViewSlider
          idx={videoIndex}
          video={recordedChunks}
          question={speechData}
        />
      ) : (
        <VideoPlayer videoRef={videoRef} />
      )}
      <ScriptWrapper $isScript={isScriptView}>
        <ScriptTextArea />
      </ScriptWrapper>
      <PlayerController>
        <MainButton
          onAction={handleSpeak}
          label={
            !speechData.length ? '설정된 질문이 없습니다.' : '면접 녹화 시작'
          }
          disabled={!speechData.length || isResultMode}
        />
        {!isRecord && !!recordedChunks.length && (
          <MainButton
            label={isResultMode ? '다음촬영' : '결과확인'}
            onAction={() => setIsResultMode(!isResultMode)}
          />
        )}
        {isRecord && (
          <>
            {isPaused ? (
              <MainButton onAction={handleResumeRecord} label="영상재개" />
            ) : (
              <MainButton onAction={handlePauseRecord} label="촬영정지" />
            )}
            <MainButton onAction={handleEndRecord} label="촬영완료" />
            <MainButton
              onAction={() => setIsScriptView(!isScriptView)}
              label="스크립트기록"
            />
          </>
        )}
      </PlayerController>
    </RecordContainer>
  );
}

export default InterviewRecord;

const RecordContainer = styled(Container.ArticleCard)`
  position: relative;
  width: 100%;
  height: 70dvh;
  padding: 2em 1em;

  @media screen and (max-width: ${V.mediaMobile}) {
    padding: 1em 0.5em;
  }
`;

const PlayerHeader = styled.header`
  ${styleMixin.Flex('space-between')}
  width: 100%;
  padding-inline: 1.2em;

  @media screen and (max-width: ${V.mediaMobile}) {
    div:nth-child(2) {
      display: none;
    }
  }
`;

const PlayerController = styled.div`
  ${styleMixin.Flex()}
  gap: 1rem;
  button {
    font-size: 1.8rem;
    background-color: ${(props) => props.theme.colors.signatureColor};
  }

  @media screen and (max-width: ${V.mediaMobile}) {
    button {
      font-size: 1.4rem;
    }
  }
`;

const PlayerState = styled.span`
  color: ${(props) => props.theme.colors.brandColor};
  font-weight: bold;
`;

type ScriptProps = {
  $isScript: boolean;
};

const ScriptWrapper = styled.div<ScriptProps>`
  z-index: 100;
  position: absolute;
  width: 50%;
  bottom: 10rem;
  display: ${(props) => (props.$isScript ? 'block' : 'none')};

  @media screen and (max-width: ${V.mediaMobile}) {
    display: none;
  }
`;

type SpeachingProps = {
  $isBlock: boolean;
};

const SpeachingState = styled.span<SpeachingProps>`
  display: ${(props) => (props.$isBlock ? 'block' : 'none')};
  padding: 0.5rem 1rem;
  opacity: 0.8;
  border-radius: 1rem;
  font-weight: 600;
  border-left: 0.2em solid ${(props) => props.theme.colors.signatureColor};
  border-right: 0.2em solid ${(props) => props.theme.colors.signatureColor};
`;

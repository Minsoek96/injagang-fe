import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { useInterViewStore } from '@/src/entities/interview_question';

import { Container, MainButton } from '@/src/shared/components';
import { styleMixin, V } from '@/src/shared/styles';
import { useMediaRecord, useModal, useWebSpeech } from '@/src/shared/hooks';

import { InterViewResult } from './video-result';
import { VideoPlayer, ScriptTextArea, RecordActionButtons } from './video';

/** 영상 녹화 메인 컴포넌트 */
function InterviewRecord() {
  const [curIndex, setCurIndex] = useState<number>(0);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
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
    setIsSpeaking(true);
    await readingTheScript(curIndex);
    setIsSpeaking(false);
    setCurIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <RecordContainer
      $size={{
        height: '60vh',
        width: '100%',
        flex: 'Col',
        isMedia: true,
      }}
    >
      {isResultMode ? (
        <InterViewResult
          idx={videoIndex}
          video={recordedChunks}
          question={speechData}
        />
      ) : (
        <VideoPlayer
          videoRef={videoRef}
          isRecord={isRecord}
          isSpeaking={isSpeaking}
          currentQuestion={speechData[curIndex - 1]}
        />
      )}

      <ScriptWrapper $isScript={isScriptView}>
        <ScriptTextArea />
      </ScriptWrapper>

      <PlayerController $isResultMode={isResultMode}>
        {!isResultMode && (
          <MainButton
            onAction={handleSpeak}
            label={
              !speechData.length ? '설정된 질문이 없습니다.' : '면접 녹화 시작'
            }
            disabled={!speechData.length || isResultMode}
          />
        )}
        {!isRecord && !!recordedChunks.length && (
          <MainButton
            label={isResultMode ? '다음촬영' : '결과확인'}
            onAction={() => setIsResultMode(!isResultMode)}
            disabled={isSpeaking || isRecord}
          />
        )}
        {isRecord && (
          <RecordActionButtons
            handleEndRecord={handleEndRecord}
            handlePauseRecord={handlePauseRecord}
            handleResumeRecord={handleResumeRecord}
            changeModeScript={() => setIsScriptView(!isScriptView)}
            isRecordPaused={isPaused}
          />
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

type ControllerProps = {
  $isResultMode: boolean;
};

const PlayerController = styled.div<ControllerProps>`
  ${(props) =>
    (props.$isResultMode ? styleMixin.Flex('flex-end') : styleMixin.Flex())};
  width: 100%;
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

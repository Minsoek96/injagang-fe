import { useEffect, useState } from 'react';

import { styled } from 'styled-components';

import { useRecordInfoStore } from '@/src/entities/interview_question';
import { styleMixin, V } from '@/src/shared/styles';
import { useMediaRecord, useModal } from '@/src/shared/hooks';
import { MainButton } from '@/src/shared/components';

import ScriptTextArea from './ScriptTextArea';
import VideoHeader from './VideoHeader';
import RecordActionButtons from './RecordActionButtons';

type Props = {
  currentIndex: number;
  onChangeIndex: (index: number) => void;
  speechData: string[];
  readingTheScript: (index: number) => Promise<void>;
};

export default function VideoPlayer({
  currentIndex,
  onChangeIndex,
  readingTheScript,
  speechData,
}: Props) {
  const isComplete = currentIndex >= speechData.length;

  const [isScriptView, setIsScriptView] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const { setModal } = useModal();

  const {
    setRecordedChunks,
    curScript,
    curTimer,
    addRecordInfo,
    initCurinfos,
    setInterviewMode,
    recordedChunks: storeChunks,
    audioDevice,
    videoDevice,
  } = useRecordInfoStore();

  const {
    videoRef,
    handleRecord,
    handlePauseRecord,
    handleResumeRecord,
    handleRecordRemove,
    recordStatus,
    recordedChunks,
  } = useMediaRecord({
    audioId: audioDevice?.deviceId,
    videoId: videoDevice?.deviceId,
  });

  useEffect(() => {
    setRecordedChunks(recordedChunks);
  }, [recordedChunks, setRecordedChunks]);

  useEffect(() => {
    const recordingResults = () => {
      addRecordInfo({ timer: curTimer, script: curScript });
      initCurinfos();
    };
    if (recordStatus === 'pending' && curTimer) {
      recordingResults();
    }
  }, [curTimer, curScript, addRecordInfo, initCurinfos, recordStatus]);

  const readCurrentScript = async (): Promise<void> => {
    setIsSpeaking(true);
    await readingTheScript(currentIndex);
    setIsSpeaking(false);
  };

  const handleEndRecord = () => {
    setIsScriptView(false);
    handleRecordRemove();
    onChangeIndex(currentIndex + 1);
  };

  const onCompleteMsg = () => {
    setModal({
      onAction: () => onChangeIndex(0),
      contents: {
        title: 'Congratulations',
        message:
          '준비된 모든 질문이 끝났습니다.\n 처음부터 다시 반복을 원하시면 확인을 눌러주세요',
      },
    });
  };

  /** 면접 질문 스피칭 */
  const handleSpeak = async (): Promise<void> => {
    if (isComplete) {
      onCompleteMsg();
      return;
    }
    if (recordStatus === 'record') {
      handleRecordRemove();
      return;
    }

    await readCurrentScript();
    if (videoRef.current) handleRecord();
  };

  return (
    <>
      <VideoHeader
        isRecord={recordStatus === 'record'}
        isSpeaking={isSpeaking}
        currentQuestion={speechData[currentIndex]}
      />
      <PlayerWrapper ref={videoRef} autoPlay muted />
      {isScriptView && (
        <ScriptWrapper>
          <ScriptTextArea />
        </ScriptWrapper>
      )}
      <PlayerController>
        {recordStatus === 'pending' ? (
          <>
            <MainButton onAction={handleSpeak} label="면접녹화시작" />
            <MainButton
              onAction={() => setInterviewMode('result')}
              label="결과보기"
              disabled={!storeChunks.length}
            />
          </>
        ) : (
          <RecordActionButtons
            isRecordPaused={recordStatus === 'pause'}
            handleEndRecord={handleEndRecord}
            handlePauseRecord={handlePauseRecord}
            handleResumeRecord={handleResumeRecord}
            changeModeScript={() => setIsScriptView(!isScriptView)}
          />
        )}
      </PlayerController>
    </>
  );
}

const PlayerWrapper = styled.video`
  margin-block: 2rem;
  width: 100%;
  height: 90%;
  object-fit: cover;
  z-index: 1;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 0.8rem;
`;

const ScriptWrapper = styled.div`
  z-index: 100;
  position: absolute;
  width: 50%;
  bottom: 10rem;

  @media screen and (max-width: ${V.mediaMobile}) {
    display: none;
  }
`;

const PlayerController = styled.div`
  ${styleMixin.Flex()};
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

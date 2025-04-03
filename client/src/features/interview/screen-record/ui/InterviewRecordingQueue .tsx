import { memo, useState } from 'react';

import { styled } from 'styled-components';

import { styleMixin, V } from '@/src/shared/styles';
import { useModal } from '@/src/shared/hooks';
import { MainButton } from '@/src/shared/ui';

import { RecordingStatusHeader } from './status-header';
import { ScriptTextArea } from './script-textarea';
import { RecordActionButtons } from './record-action-button';

import {
  useInterviewRecorder,
  useIntvNarration,
  useIntvSpeechToText,
} from '../model';

type Props = {
  currentIndex: number;
  onChangeIndex: (index: number) => void;
};

const MemoizedRecordingStatusHeader = memo(RecordingStatusHeader);
const MemoizedScriptTextArea = memo(ScriptTextArea);
const MemoizedRecordActionButtons = memo(RecordActionButtons);

export default function InterviewRecordingQueue({
  currentIndex,
  onChangeIndex,
}: Props) {
  const [isScriptView, setIsScriptView] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const { setModal } = useModal();

  const {
    handlePauseRecord,
    handleRecordRemove,
    handleRecord,
    handleResumeRecord,
    videoRef,
    recordStatus,
    setInterviewMode,
    storeChunks,
  } = useInterviewRecorder();

  const { narrationState, startNarration } = useIntvNarration();
  const { beginSpeechToText, endSpeechToText } = useIntvSpeechToText();

  const isComplete = currentIndex >= narrationState.length;
  /** 메시지를 표시하고, 면접을 처음부터 다시 진행 설정 */
  const onCompleteMsg = () => {
    setModal({
      onAction: () => onChangeIndex(0),
      title: 'Congratulations',
      message:
        '준비된 모든 질문이 끝났습니다.\n 처음부터 다시 반복을 원하시면 확인을 눌러주세요',
    });
  };

  /** 면접 종료 */
  const endInterviewRecord = () => {
    setIsScriptView(false);
    handleRecordRemove();
    endSpeechToText();
    onChangeIndex(currentIndex + 1);
  };

  /** 스크립트를 읽고 상태를 업데이트 */
  const readCurrentScript = async (): Promise<void> => {
    setIsSpeaking(true);
    await startNarration(currentIndex);
    setIsSpeaking(false);
  };

  /** 면접 질문 스피칭 */
  const startInterviewRecord = async (): Promise<void> => {
    if (isComplete) {
      onCompleteMsg();
      return;
    }
    if (isSpeaking) return;

    await readCurrentScript();
    if (videoRef.current) {
      handleRecord();
      beginSpeechToText();
    }
  };

  return (
    <Container>
      <MemoizedRecordingStatusHeader
        isRecord={recordStatus === 'record'}
        isSpeaking={isSpeaking}
        currentQuestion={narrationState[currentIndex]}
      />
      <VideoPlayer ref={videoRef} autoPlay muted playsInline />
      {isScriptView && <MemoizedScriptTextArea />}
      <RecordingControls>
        {recordStatus === 'pending' ? (
          <>
            <MainButton
              onClick={startInterviewRecord}
              label="면접녹화시작"
              variant="signature"
            />
            <MainButton
              onClick={() => setInterviewMode('result')}
              label="결과보기"
              disabled={!storeChunks.length}
              variant="signature"
            />
          </>
        ) : (
          <MemoizedRecordActionButtons
            isRecordPaused={recordStatus === 'pause'}
            handleEndRecord={endInterviewRecord}
            handlePauseRecord={handlePauseRecord}
            handleResumeRecord={handleResumeRecord}
            changeModeScript={() => setIsScriptView(!isScriptView)}
          />
        )}
      </RecordingControls>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: ${styleMixin.Column()};
  width: 100%;
  height: 100%;
`;

const VideoPlayer = styled.video`
  margin-block: 1.5rem;
  width: 100%;
  height: 90%;
  object-fit: cover;
  z-index: 1;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 0.8rem;
`;

const RecordingControls = styled.div`
  ${styleMixin.Flex()};
  width: 100%;
  gap: 1rem;
  button {
    font-size: 1.8rem;
    background-color: ${(props) => props.theme.colors.signatureColor};
    color: white;
  }

  @media screen and (max-width: ${V.mediaMobile}) {
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: ${(props) => props.theme.colors.primary};
    border-top-right-radius: 3rem;
    border-top-left-radius: 3rem;
    height: 6rem;
    box-shadow: 0 -4px 6px -1px rgba(63, 24, 24, 0.1);
    z-index: 100;
    button {
      font-size: 1.6rem;
    }
  }
`;

// // // 주요 상태들
// useWhyDidYouRender(
//   'RecordingQueue',
//   {
//     currentIndex,
//     isScriptView,
//     isSpeaking,
//     recordStatus,
//     narrationState,
//     isComplete,
//   },
//   {
//     onChangeIndex,
//     handlePauseRecord,
//     handleRecordRemove,
//     handleRecord,
//     handleResumeRecord,
//     setInterviewMode,
//     beginSpeechToText,
//     endSpeechToText,
//     startNarration,
//     endInterviewRecord,
//   },
// );

import { styled } from 'styled-components';

import { styleMixin, V } from '@/src/shared/styles';

import RecordingTimer from './RecordingTimer';

type Props = {
  isRecord: boolean;
  isSpeaking: boolean;
  currentQuestion: string;
};

export default function RecordingStatusHeader({
  isRecord,
  isSpeaking,
  currentQuestion,
}: Props) {
  return (
    <RecordingStatusWrapper>
      <StatusSection>
        <RecordingStateLabel $isRecording={isRecord}>
          <StatusDot $isRecording={isRecord} />
          {isRecord ? '녹화중' : '대기상태'}
        </RecordingStateLabel>
      </StatusSection>

      <SpeakingStatusMessage $isBlock={isSpeaking || isRecord}>
        {isSpeaking
          ? '타이머가 3초가 되면 스피칭이 진행됩니다.'
          : isRecord && currentQuestion}
      </SpeakingStatusMessage>

      <TimerSection>
        <RecordingTimer isRunning={isRecord || isSpeaking} />
      </TimerSection>
    </RecordingStatusWrapper>
  );
}

const RecordingStatusWrapper = styled.header`
  ${styleMixin.Flex('space-between')}
  width: 100%;
  padding: 1.6rem 2rem;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 1.2rem;

  @media screen and (max-width: ${V.mediaMobile}) {
    padding: 1.2rem 1.6rem;
  }
`;

const StatusSection = styled.div`
  flex: 0 0 auto;
`;

const StatusDot = styled.span<{ $isRecording: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  margin-right: 8px;
  background-color: ${(props) => (props.$isRecording ? '#ff4444' : '#666')};
  animation: ${(props) => (props.$isRecording ? 'pulse 2s infinite' : 'none')};

  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

const RecordingStateLabel = styled.span<{ $isRecording: boolean }>`
  ${styleMixin.Flex()}
  font-size: 1.6rem;
  font-weight: 600;
  padding: 0.6rem 1.2rem;
  border-radius: 2rem;
  color: ${(props) => (props.$isRecording ? '#ff4444' : props.theme.colors.text)};
  background-color: ${(props) =>
    (props.$isRecording
      ? 'rgba(255, 68, 68, 0.1)'
      : 'rgba(102, 102, 102, 0.1)')
};
  transition: all 0.3s ease;
`;

const SpeakingStatusMessage = styled.div<{ $isBlock: boolean }>`
  display: ${(props) => (props.$isBlock ? 'block' : 'none')};
  flex: 1;
  margin: 0 2rem;
  padding: 0.8rem 1.6rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
  border-radius: 0.8rem;
  border-left: 3px solid ${(props) => props.theme.colors.signatureColor};
  border-right: 3px solid ${(props) => props.theme.colors.signatureColor};

  @media screen and (max-width: ${V.mediaMobile}) {
    display: none;
  }
`;

const TimerSection = styled.div`
  flex: 0 0 auto;
`;

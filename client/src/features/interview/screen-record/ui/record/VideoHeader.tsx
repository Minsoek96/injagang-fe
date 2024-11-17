import { styleMixin, V } from '@/src/shared/styles';

import { styled } from 'styled-components';

import VideoTimer from './VideoTimer';

type Props = {
  isRecord: boolean;
  isSpeaking: boolean;
  currentQuestion: string;
};

export default function VideoHeader({
  isRecord,
  isSpeaking,
  currentQuestion,
}: Props) {
  return (
    <PlayerHeader>
      <PlayerState>{isRecord ? '녹화중' : '대기상태'}</PlayerState>
      <SpeachingState $isBlock={isSpeaking || isRecord}>
        {isSpeaking
          ? '타이머가 3초가 되면 스피칭이 진행됩니다.'
          : isRecord && `${currentQuestion}`}
      </SpeachingState>
      <VideoTimer isRunning={isRecord || isSpeaking} />
    </PlayerHeader>
  );
}

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

const PlayerState = styled.span`
  color: ${(props) => props.theme.colors.brandColor};
  font-weight: bold;
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

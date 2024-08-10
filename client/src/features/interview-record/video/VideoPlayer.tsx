import { RefObject } from 'react';

import { styled } from 'styled-components';

import VideoHeader from './VideoHeader';

type Props = {
  videoRef: RefObject<HTMLVideoElement>;
  isSpeaking: boolean;
  isRecord: boolean;
  currentQuestion: string;
};
export default function VideoPlayer({
  videoRef,
  isSpeaking,
  isRecord,
  currentQuestion,
}: Props) {
  return (
    <>
      <VideoHeader
        isRecord={isRecord}
        isSpeaking={isSpeaking}
        currentQuestion={currentQuestion}
      />
      <PlayerWrapper ref={videoRef} autoPlay muted />
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

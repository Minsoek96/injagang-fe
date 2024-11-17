import { RefObject } from 'react';
import { styled } from 'styled-components';

type Props = {
    videoRef: RefObject<HTMLVideoElement>;
}

export default function VideoSettingPlayer({ videoRef }:Props) {
  return (
    <PlayerWrapper
      autoPlay
      muted
      ref={videoRef}
    />
  );
}

const PlayerWrapper = styled.video`
  margin-block: 2rem;
  width: 100%;
  height: 100%;
  max-width: 80rem;
  max-height: 45rem;
  object-fit: cover;
  z-index: 1;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 0.8rem;
`;

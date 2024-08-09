import { RefObject } from 'react';

import { styled } from 'styled-components';

type Props = {
  videoRef: RefObject<HTMLVideoElement>;
};
export default function VideoPlayer({ videoRef }: Props) {
  return <PlayerWrapper ref={videoRef} autoPlay muted />;
}

const PlayerWrapper = styled.video`
  margin-block: 2rem;
  width: 100%;
  height: 90%;
  object-fit: cover;
  z-index: 1;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: .8rem;
`;

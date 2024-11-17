import { styled } from 'styled-components';

type Props = {
    currentVideoChunk: Blob
}

export default function VideoResultPlayer({ currentVideoChunk }:Props) {
  return (
    <PlayerWrapper
      autoPlay
      controls
      src={URL.createObjectURL(currentVideoChunk)}
    />
  );
}

const PlayerWrapper = styled.video`
  margin-block: 2rem;
  width: 100%;
  height: 100%;
  max-width: 110rem;
  max-height: 45rem;
  object-fit: cover;
  z-index: 1;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 0.8rem;
`;

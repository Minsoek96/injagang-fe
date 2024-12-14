import { useEffect, useRef } from 'react';
import { styled } from 'styled-components';

type Props = {
    currentVideoChunk: Blob
}

export default function RecordPlayer({ currentVideoChunk }:Props) {
  const videoUrl = useRef<string>(URL.createObjectURL(currentVideoChunk));

  useEffect(() => () => {
    URL.revokeObjectURL(videoUrl.current); // 메모리 누수 방지를 위해 URL 해제
  }, []);

  if (!currentVideoChunk) {
    return <p>비디오를 로드 중입니다...</p>;
  }

  return (
    <PlayerWrapper
      autoPlay
      controls
      playsInline
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

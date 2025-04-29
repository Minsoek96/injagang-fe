import { useEffect, useState } from 'react';

import { styled } from 'styled-components';

import { V } from '@/src/shared/styles';
import { Spinner } from '@/src/shared/ui';

type Props = {
  currentVideoChunk: Blob;
};

export default function RecordPlayer({ currentVideoChunk }: Props) {
  const [videoUrl, setVideoUrl] = useState<string>('');

  useEffect(() => {
    if (!currentVideoChunk) return;

    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }

    const newUrl = URL.createObjectURL(currentVideoChunk);
    setVideoUrl(newUrl);

    // eslint-disable-next-line consistent-return
    return () => {
      URL.revokeObjectURL(newUrl);
    };
  }, [currentVideoChunk]);

  if (!videoUrl) {
    return (
      <VideoLoaderContainer>
        <Spinner message="비디오를 로드 중입니다" />
      </VideoLoaderContainer>
    );
  }

  return <PlayerWrapper autoPlay controls playsInline src={videoUrl} />;
}

const PlayerWrapper = styled.video`
  margin-block: 1.5rem;
  height: 100%;
  width: 100%;
  max-height: 50rem;
  object-fit: cover;
  z-index: 1;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 0.8rem;

  @media screen and (max-width: ${V.mediaMobile}) {
    width: 100%;
  }
`;

const VideoLoaderContainer = styled.div`
  height: 100%;
  width: 100%;
  max-height: 50rem;
  min-height: 30rem;
  background-color: ${(props) => props.theme.colors.primary};
  border-top: 1px dashed ${(props) => props.theme.colors.highlightLine};
  border-bottom: 1px dashed ${(props) => props.theme.colors.highlightLine};
  border-radius: 0.8rem;
  padding: 2rem;
`;

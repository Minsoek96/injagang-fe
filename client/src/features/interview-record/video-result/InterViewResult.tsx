import styled from 'styled-components';

import { MdOutlineFileDownload } from 'react-icons/md';

import { styleMixin, V } from '@/src/shared/styles';
import { saveAs } from 'file-saver';
import { MainButton } from '@/src/shared/components';

type InterViewSliderProps = {
  video: Blob[];
  question: string[];
  idx: number;
};

const script = ['fdsasfsa', 'sdfasfasdf', 'sadfasf'];
export default function InterViewResult({ video, question, idx }: InterViewSliderProps) {
  const downloadScript = () => {
    if (script.length > 0) {
      const blob = new Blob([script[idx]], {
        type: 'text/plain;charset=utf-8',
      });

      const url = URL.createObjectURL(blob);

      saveAs(blob, `${question[idx]}대본.txt`);

      URL.revokeObjectURL(url);
    }
  };

  const downloadVideo = () => {
    if (video.length > 0) {
      const url = URL.createObjectURL(video[idx]);
      fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          saveAs(blob, `${question[idx]}.mp4`);
          URL.revokeObjectURL(url);
        });
      downloadScript();
    }
  };

  return (
    <InterViewResultContainer>
      <PlayerWrapper autoPlay controls src={URL.createObjectURL(video[idx])}>
        <track
          kind="captions"
          src="path/to/captions.vtt"
          srcLang="en"
          label="English captions"
          default
        />
        Your browser does not support the video tag.
      </PlayerWrapper>
      <AccessoriesWrapper>
        <RecordInfo>
          <p>
            <span>인터뷰 질문 : </span>
            {question[idx]}
          </p>
          <p>
            <span>스크립트 : </span>
            [작성한 대본이 있습니다.]
          </p>
          <p>
            <span>녹화 시간 : </span>
            [00:00]
          </p>
        </RecordInfo>
        <MainButton
          onAction={downloadVideo}
          label={(
            <p>
              <MdOutlineFileDownload />
              DOWNLOAD
            </p>
          )}
          sx={{ marginTop: '1rem', fontSize: '1.8rem' }}
        />
      </AccessoriesWrapper>
    </InterViewResultContainer>
  );
}

const InterViewResultContainer = styled.div`
  position: relative;
  ${styleMixin.Column('flex-start')}
  width: 100%;
  height: 100%;
`;

const AccessoriesWrapper = styled.div`
  ${styleMixin.Column('', 'flex-start')};
  width: 100%;
  max-width: 110rem;
  font-size: 1.8rem;
  line-height: 1.6;

  @media screen and (max-width: ${V.mediaMobile}) {
    font-size: 1.4rem;
    button {
      font-size: 1.4rem !important;
    }
  }
`;

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

const RecordInfo = styled.div`
  font-size: 1.8rem;
  span {
    color: ${(props) => props.theme.colors.signatureColor};
  }

  @media screen and (max-width: ${V.mediaMobile}) {
    font-size: 1.4rem;
  }
`;

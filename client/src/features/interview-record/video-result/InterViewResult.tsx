import styled from 'styled-components';

import { MdOutlineFileDownload } from 'react-icons/md';

import { styleMixin, V } from '@/src/shared/styles';
import { saveAs } from 'file-saver';
import { MainButton } from '@/src/shared/components';
import { useRecordInfoStore } from '@/src/entities/interview_question';
import { useCounter } from '@/src/shared/hooks';

type InterViewSliderProps = {
  video: Blob[];
  question: string[];
  currentIdx: number;
};

export default function InterViewResult({
  video,
  question,
  currentIdx,
}: InterViewSliderProps) {
  const { counter, handleDecrease, handleIncrease } = useCounter({
    maxCounter: video.length,
    initCounter: currentIdx,
  });
  const { recordInfoList } = useRecordInfoStore();
  const downloadScript = () => {
    if (recordInfoList.length > 0) {
      const blob = new Blob(
        [
          `질문내용 : ${question[counter]}\n`,
          `작성한 대본 : ${recordInfoList[counter]?.script}\n`,
          `녹화시간 : ${recordInfoList[counter]?.timer}\n`,
        ],
        {
          type: 'text/plain;charset=utf-8',
        },
      );

      const url = URL.createObjectURL(blob);

      saveAs(blob, `${question[counter]}대본.txt`);

      URL.revokeObjectURL(url);
    }
  };

  const downloadVideo = () => {
    if (video.length > 0) {
      const url = URL.createObjectURL(video[counter]);
      fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          saveAs(blob, `${question[counter]}.mp4`);
          URL.revokeObjectURL(url);
        });
      downloadScript();
    }
  };
  return (
    <InterViewResultContainer>
      <VideoController>
        <MainButton
          label="<="
          onAction={handleDecrease}
          disabled={counter === 0}
        />
        <span>
          진행현황
          {`${counter + 1}/${question.length}`}
        </span>
        <MainButton
          label="=>"
          onAction={handleIncrease}
          disabled={video.length - 1 <= counter}
        />
      </VideoController>
      <PlayerWrapper
        autoPlay
        controls
        src={URL.createObjectURL(video[counter])}
      >
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
            {question[counter]}
          </p>
          <p>
            <span>스크립트 : </span>
            {recordInfoList[counter]?.script || ['작성한 대본이 없습니다.']}
          </p>
          <p>
            <span>녹화 시간 : </span>
            {recordInfoList[counter]?.timer || ['00:00']}
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
  overflow-x: hidden;
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

const VideoController = styled.div`
  ${styleMixin.Flex('space-between')};
  width: 100%;
  margin-bottom: 1rem;
  button {
    background-color: ${(props) => props.theme.colors.signatureColor};
  }
`;

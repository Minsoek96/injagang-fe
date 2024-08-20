import styled from 'styled-components';

import { saveAs } from 'file-saver';

import { MdOutlineFileDownload } from 'react-icons/md';

import { useRecordInfoStore } from '@/src/entities/interview_question';

import { MainButton } from '@/src/shared/components';
import { useCounter } from '@/src/shared/hooks';
import { styleMixin, V } from '@/src/shared/styles';

import VideoResultPlayer from '@/src/features/interview-record/video-result/VideoResultPlayer';
import VideoInfos from '@/src/features/interview-record/video-result/VideoInfos';
import VideoResultHeader from './VideoResultHeader';

type InterViewSliderProps = {
  question: string[];
  currentIdx: number;
};

export default function InterViewResult({
  question,
  currentIdx,
}: InterViewSliderProps) {
  const {
    recordInfoList,
    recordedChunks: video,
    setInterviewMode,
  } = useRecordInfoStore();
  const { counter, handleDecrease, handleIncrease } = useCounter({
    maxCounter: video.length,
    initCounter: currentIdx,
  });

  const downloadScript = () => {
    if (recordInfoList.length) {
      const recordInfos = new Blob(
        [
          `질문내용 : ${question[counter]}\n`,
          `작성한 대본 : ${recordInfoList[counter]?.script}\n`,
          `녹화시간 : ${recordInfoList[counter]?.timer}\n`,
        ],
        {
          type: 'text/plain;charset=utf-8',
        },
      );

      const url = URL.createObjectURL(recordInfos);

      saveAs(recordInfos, `${question[counter]}대본.txt`);

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
      <VideoResultHeader
        onCounterDecrease={handleDecrease}
        onCounterIncrease={handleIncrease}
        counter={counter}
        progressStatus={`${counter + 1}/${question.length}`}
        lastVideo={video.length - 1 <= counter}
      />
      <VideoResultPlayer currentVideoChunk={video[counter]} />
      <AccessoriesWrapper>
        <VideoInfos
          question={question[counter]}
          script={recordInfoList[counter]?.script || '작성한 대본이 없습니다.'}
          timer={recordInfoList[counter]?.timer || '00:00'}
        />
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
        <MainButton
          label="면접장으로"
          onAction={() => setInterviewMode('record')}
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

  button  {
    background-color: ${(props) => props.theme.colors.signatureColor};
  }

  @media screen and (max-width: ${V.mediaMobile}) {
    font-size: 1.4rem;
    button {
      font-size: 1.4rem !important;
    }
  }
`;

import styled from 'styled-components';

import { MdOutlineFileDownload } from 'react-icons/md';

import { useRecordInfoStore } from '@/src/entities/interview_question';

import { MainButton } from '@/src/shared/ui';
import { useCounter } from '@/src/shared/hooks';
import { styleMixin, V } from '@/src/shared/styles';

import RecordNavigation from './RecordNavigation';
import RecordPlayer from './RecordPlayer';
import RecordingDetails from './RecordingDetails';
import { useDownloadHandler } from '../model/useDownloadHandler';

type Props = {
  question: string[];
  currentIdx: number;
};

export default function InterviewResultViewer({
  question,
  currentIdx,
}: Props) {
  const {
    recordInfoList,
    recordedChunks: video,
    setInterviewMode,
  } = useRecordInfoStore();

  const { counter, handleDecrease, handleIncrease } = useCounter({
    maxCounter: video.length,
    initCounter: currentIdx,
  });

  const { downloadVideo } = useDownloadHandler({
    video,
    recordInfoList,
    question,
    counter,
  });

  return (
    <InterViewResultContainer>
      <RecordNavigation
        onCounterDecrease={handleDecrease}
        onCounterIncrease={handleIncrease}
        counter={counter}
        progressStatus={`${counter + 1}/${question.length}`}
        lastVideo={video.length - 1}
      />
      <RecordPlayer currentVideoChunk={video[counter]} />
      <ResultControlsWrapper>
        <RecordingDetails
          question={question[counter]}
          script={recordInfoList[counter]?.script || '작성한 대본이 없습니다.'}
          timer={recordInfoList[counter]?.timer || '00:00'}
        />
        <MainButton
          onClick={downloadVideo}
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
          onClick={() => setInterviewMode('record')}
          sx={{ marginTop: '1rem', fontSize: '1.8rem' }}
        />
      </ResultControlsWrapper>
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

const ResultControlsWrapper = styled.div`
  ${styleMixin.Column('', 'flex-start')};
  width: 100%;
  max-width: 110rem;
  font-size: 1.8rem;
  line-height: 1.6;

  button {
    background-color: ${(props) => props.theme.colors.signatureColor};
  }

  @media screen and (max-width: ${V.mediaMobile}) {
    font-size: 1.4rem;
    button {
      font-size: 1.4rem !important;
    }
  }
`;

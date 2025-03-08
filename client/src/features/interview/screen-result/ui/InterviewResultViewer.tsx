import styled from 'styled-components';

import { MdOutlineFileDownload, MdOutlineReplay } from 'react-icons/md';

import { useIntvContentStore, useRecordInfoStore } from '@/src/entities/interview_question';

import { HideSvg } from '@/src/shared/ui';
import { useCounter } from '@/src/shared/hooks';
import { styleMixin } from '@/src/shared/styles';

import RecordNavigation from './RecordNavigation';
import RecordPlayer from './RecordPlayer';
import RecordingDetails from './RecordingDetails';
import { useDownloadHandler } from '../model/useDownloadHandler';

type Props = {
  question: string[];
  currentIdx: number;
};

export default function InterviewResultViewer({ question, currentIdx }: Props) {
  const {
    recordedChunks: video,
    setInterviewMode,
  } = useRecordInfoStore();
  const {
    recordContents,
  } = useIntvContentStore();

  const { counter, handleDecrease, handleIncrease } = useCounter({
    maxCounter: video.length,
    initCounter: currentIdx,
  });

  const { downloadVideo } = useDownloadHandler({
    video,
    recordContents,
    question,
    counter,
  });

  // TODO:
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
          voiceScript={recordContents[counter]?.voiceScript || '발음 인식이 진행되지 않았습니다.'}
          script={recordContents[counter]?.script || '작성한 대본이 없습니다.'}
          timer={recordContents[counter]?.timer || '00:00'}
        />
      </ResultControlsWrapper>
      <ButtonSection>
        <HideSvg
          Logo={<MdOutlineFileDownload />}
          label="다운로드"
          onClick={downloadVideo}
          sx={{ fontSize: '3.5rem' }}
        />
        <HideSvg
          Logo={<MdOutlineReplay />}
          label="면접장으로"
          onClick={() => setInterviewMode('record')}
          sx={{ fontSize: '3.5rem' }}
        />
      </ButtonSection>
    </InterViewResultContainer>
  );
}

const InterViewResultContainer = styled.div`
  ${styleMixin.Column('flex-start')}
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  ${styleMixin.hideScrollbarStyle}
`;

const ResultControlsWrapper = styled.div`
  ${styleMixin.Column('', 'flex-start')};
  width: 100%;
  line-height: 1.4;
`;

const ButtonSection = styled.div`
  ${styleMixin.Flex()};
  position: fixed;
  width: 100%;
  gap: 5rem;
  background-color: ${(props) => props.theme.colors.primary};
  bottom: 0;
  border-top-right-radius: 3rem;
  border-top-left-radius: 3rem;
  height: 6rem;
  box-shadow: 0 -4px 6px -1px rgba(63, 24, 24, 0.1);
  z-index: 100;
`;

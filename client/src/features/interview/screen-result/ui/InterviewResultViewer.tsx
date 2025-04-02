import styled from 'styled-components';

import {
  useIntvContentStore,
  useIntvPlaylistStore,
  useIntvRecordStore,
} from '@/src/entities/interview_question';

import { useCounter } from '@/src/shared/hooks';
import { styleMixin } from '@/src/shared/styles';

import { IntvFeedbackModal } from './feedback-modal';
import { RecordNavigation } from './record-navigation';
import { RecordPlayer } from './record-player';
import { RecordingDetails } from './content-detail';
import { FooterActionPanel } from './footer-panel';
import { type ResultStateProps } from '../model';

type Props = {
  currentIndex: number;
};

export default function InterviewResultViewer({ currentIndex }: Props) {
  const questions = useIntvPlaylistStore((state) => state.userPlayList);
  const video = useIntvRecordStore((state) => state.recordedChunks);
  const recordContents = useIntvContentStore((state) => state.recordContents);

  const { counter, handleDecrease, handleIncrease } = useCounter({
    maxCounter: video.length,
    initCounter: currentIndex,
  });

  const resultState: ResultStateProps = {
    video,
    recordContents,
    question: questions,
    counter,
  };

  // TODO:
  return (
    <InterViewResultContainer>
      <RecordNavigation
        onCounterDecrease={handleDecrease}
        onCounterIncrease={handleIncrease}
        counter={counter}
        questionLen={questions.length}
        lastVideo={video.length - 1}
      />
      <RecordPlayer currentVideoChunk={video[counter]} />
      <ResultControlsWrapper>
        <RecordingDetails
          question={questions[counter]}
          recordContents={recordContents[counter] ?? {}}
        />
      </ResultControlsWrapper>
      <ButtonSection>
        <FooterActionPanel
          resultState={resultState}
        />
      </ButtonSection>
      <IntvFeedbackModal
        question={questions[counter]}
        recordContent={recordContents[counter] ?? {}}
        counter={counter}
      />
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

import { useMemo } from 'react';

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

  const { currentQuestion, questionProgress } = useMemo(
    () => getQuestionProgress(counter, questions),
    [counter, questions],
  );

  return (
    <InterViewResultContainer>
      <RecordNavigation
        onCounterDecrease={handleDecrease}
        onCounterIncrease={handleIncrease}
        counter={counter}
        questionProgress={questionProgress}
        lastVideo={video.length - 1}
      />
      <RecordPlayer currentVideoChunk={video[counter]} />
      <ResultControlsWrapper>
        <RecordingDetails
          question={currentQuestion}
          recordContents={recordContents[counter] ?? {}}
        />
      </ResultControlsWrapper>
      <ButtonSection>
        <FooterActionPanel
          resultState={resultState}
        />
      </ButtonSection>
      <IntvFeedbackModal
        question={currentQuestion}
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

/**
 * 질문 진행 상태 관련 유틸 함수
 *
 * @param counter : 현재 진행 스텝
 * @param questions : question 질문 모음
 * @returns 질문 진행 관련 정보 객체
 */
function getQuestionProgress(counter:number, questions:string[]) {
  const questionLen = questions.length;
  const cycleCount = Math.floor(counter / questionLen) + 1;
  const currentQuestionIndex = Math.min(counter % questionLen, questionLen - 1);
  const currentQuestion = questions[currentQuestionIndex];
  const questionProgress = `${currentQuestionIndex + 1}/${questionLen} (${cycleCount}회차)`;

  return {
    currentQuestion,
    questionProgress,
  };
}

import { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

import {
  interviewMutation,
  interviewType,
} from '@/src/entities/interview_question';

import { styleMixin } from '@/src/shared/styles';

import RandomQuestionForm from './RandomQuestionForm';
import { RandomQuestionType } from '../model/type';

const MAX_RANDOM_QUESTIONS = 2;

function InterviewRandomSetting() {
  const [submissionCount, setSubmissionCount] = useState<number>(0);
  const { mutate: getRandomQuestions } = interviewMutation.useFetchRandomQuestion();
  const isLimited = submissionCount >= MAX_RANDOM_QUESTIONS;

  const labels = useMemo(
    () => [
      {
        key: interviewType.QuestionType.CS,
        label: 'CS질문',
        type: 'number',
      },
      {
        key: interviewType.QuestionType.FRONT,
        label: '프론트엔드 질문',
        type: 'number',
      },
      {
        key: interviewType.QuestionType.BACK,
        label: '백엔드 질문',
        type: 'number',
      },
      {
        key: interviewType.QuestionType.SITUATION,
        label: '상황 질문',
        type: 'number',
      },
      {
        key: interviewType.QuestionType.COMMON,
        label: '직업 공통 질문',
        type: 'number',
      },
    ],
    [],
  );

  const onSubmit = useCallback(
    (data: RandomQuestionType) => {
      if (isLimited) return;

      const formattedData = Object.entries(data).map(([type, size]) => ({
        size: Number(size),
        questionType: type as interviewType.QuestionTypeValue,
      }));

      getRandomQuestions(formattedData);
      setSubmissionCount((prev) => prev + 1);
    },
    [getRandomQuestions, isLimited],
  );

  return (
    <Container>
      <RandomQuestionForm
        onSubmit={onSubmit}
        labels={labels}
        isLimitReached={isLimited}
      />
    </Container>
  );
}

export default InterviewRandomSetting;

const Container = styled.div`
  ${styleMixin.Column()}
  width: 100%;
  height: 100%;
  margin: 30px auto;
`;

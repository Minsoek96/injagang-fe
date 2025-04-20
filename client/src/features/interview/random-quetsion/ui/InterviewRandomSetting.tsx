import { useCallback, useMemo } from 'react';

import styled from 'styled-components';

import {
  interviewMutation,
  interviewType,
} from '@/src/entities/interview_question';

import { styleMixin } from '@/src/shared/styles';

import RandomQuestionForm from './RandomQuestionForm';
import { RandomQuestionType } from '../model/type';

function InterviewRandomSetting() {
  const { mutate: getRandomQustions } = interviewMutation.useFetchRandomQuestion();

  const labels = useMemo(() => [
    {
      key: interviewType.QuestionType.CS,
      label: 'CS질문',
      type: 'number',
    },
    {
      key: interviewType.QuestionType.SITUATION,
      label: '상황 판단 질문',
      type: 'number',
    },
    {
      key: interviewType.QuestionType.JOB,
      label: '직무 적합성 질문',
      type: 'number',
    },
    {
      key: interviewType.QuestionType.PERSONALITY,
      label: '성격 질문',
      type: 'number',
    },
  ], []);

  const onSubmit = useCallback(
    (data: RandomQuestionType) => {
      const {
        CS, SITUATION, JOB, PERSONALITY,
      } = data;
      const formattedData = [
        { size: CS, questionType: interviewType.QuestionType.CS },
        {
          size: SITUATION,
          questionType: interviewType.QuestionType.SITUATION,
        },
        { size: JOB, questionType: interviewType.QuestionType.JOB },
        {
          size: PERSONALITY,
          questionType: interviewType.QuestionType.PERSONALITY,
        },
      ];

      getRandomQustions(formattedData);
    }
    , [getRandomQustions],
  );

  return (
    <Container>
      <RandomQuestionForm onSubmit={onSubmit} labels={labels} />
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

import styled from 'styled-components';
import { ComboBox } from '@/src/shared/components/combobox';

import { interviewType } from '@/src/entities/interview_question';
import { memo } from 'react';
import { V } from '@/src/shared/styles';

const InterViewSelectData = [
  { title: interviewType.QuestionType.CS, id: 'qeustion_1' },
  { title: interviewType.QuestionType.SITUATION, id: 'qeustion_2' },
  { title: interviewType.QuestionType.JOB, id: 'qeustion_3' },
  { title: interviewType.QuestionType.PERSONALITY, id: 'qeustion_4' },
  { title: 'ALL', id: 'qeustion_5' },
];

interface IQuestionSelectorProps {
  selectedType: interviewType.QuestionType | string;
  onChange: (type: interviewType.QuestionType | string) => void;
}

function QuestionSelector({ selectedType, onChange }: IQuestionSelectorProps) {
  return (
    <Container>
      <ComboBox
        label="질문타입선택"
        hideLabel
        items={InterViewSelectData.map((item) => item.title)}
        selectedItem={selectedType}
        itemToId={(item) => item || ''}
        itemToText={(item) => item || ''}
        onChange={(value) => value && onChange(value)}
        Size={{ width: '100%', height: '3rem' }}
      />
    </Container>
  );
}

export default memo(QuestionSelector);

const Container = styled.div`
  width: 100%;
  max-width: ${V.lgItemWidth};
  margin-bottom: 15px;
`;

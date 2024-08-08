import styled from 'styled-components';
import { ComboBox } from '@/src/shared/components/combobox';

import { interviewType } from '@/src/entities/interview_question';
import { memo } from 'react';
import { V } from '@/src/shared/styles';

const InterViewSelectData = [
  { title: interviewType.QuestionType.CS, id: 1 },
  { title: interviewType.QuestionType.SITUATION, id: 2 },
  { title: interviewType.QuestionType.JOB, id: 3 },
  { title: interviewType.QuestionType.PERSONALITY, id: 4 },
  { title: 'ALL', id: 5 },
];

interface IQuestionSelectorProps {
  selectedType: interviewType.QuestionType | string;
  onChange: (type: interviewType.QuestionType | string) => void;
}

function QuestionSelector({ selectedType, onChange }: IQuestionSelectorProps) {
  return (
    <Container>
      <ComboBox
        value={selectedType}
        optionList={InterViewSelectData}
        onChange={onChange}
        Size={{ width: '100%', height: '30px' }}
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

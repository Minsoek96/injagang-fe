import { styleMixin } from '@/src/shared/styles';

import { memo } from 'react';

import styled from 'styled-components';
import { UseFormRegister } from 'react-hook-form';
import { templateType } from '@/src/entities/template';
import { UnResizeableTextarea } from '@/src/shared/ui';

interface Props {
  index: number;
  register: UseFormRegister<templateType.IAddFormTemplate>;
}

function QuestionItem({ index, register }: Props) {
  return (
    <Wrapper>
      {index + 1}
      . 질문:
      <UnResizeableTextarea
        register={register(`questions.${index}.question`)}
        placeholder="질문을 입력해주세요"
        maxSize={10}
        minSize={5}
        style={{ resize: 'vertical' }}
      />
    </Wrapper>
  );
}

export default memo(QuestionItem);

const Wrapper = styled.div`
  ${styleMixin.Column('flex-start', 'flex-start')}
  width: 100%;
  height: 120px;

  font-size: 1.5rem;
  > textarea {
    margin-top: 1rem;
    background-color: white;
    color: black;

    &:focus {
      border: 0.3em solid #6b7a90;
    }
  }
`;

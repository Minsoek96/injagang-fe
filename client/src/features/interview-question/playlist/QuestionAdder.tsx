import { useState, useRef } from 'react';

import styled from 'styled-components';

import { MainButton, MainInput } from '@/src/shared/components';
import { styleMixin } from '@/src/shared/styles';

interface AddTextInputProps {
  handleAddQuestion: (title: string) => void;
  handleCancelQuestion: () => void;
}
function QuestionAdder({
  handleAddQuestion,
  handleCancelQuestion,
}: AddTextInputProps) {
  const [title, setTitle] = useState<string>('');
  const textRef = useRef<HTMLInputElement>(null);

  const handleAddText = () => {
    handleAddQuestion(title);
    setTitle('');
    textRef.current?.focus();
  };

  return (
    <AddTextInputStyle>
      <MainInput
        ref={textRef}
        placeholder="커스텀 질문을 등록해주세요."
        value={title}
        onChange={setTitle}
        sx={{ width: '100%' }}
      />
      <ButtonContainer>
        <MainButton
          label="확인"
          sx={{ width: '6.3rem', font: '1rem' }}
          onAction={handleAddText}
        />
        <MainButton
          label="확정"
          sx={{ width: '6.3rem', font: '1rem' }}
          onAction={handleCancelQuestion}
        />
      </ButtonContainer>
    </AddTextInputStyle>
  );
}

export default QuestionAdder;

const AddTextInputStyle = styled.div`
  ${styleMixin.Flex()};
  width: 100%;
  margin-top: 1rem;
  button {
    margin: auto 2px;
  }
`;

const ButtonContainer = styled.div`
  ${styleMixin.Flex()};
  button {
    height: 4rem;
  }
`;

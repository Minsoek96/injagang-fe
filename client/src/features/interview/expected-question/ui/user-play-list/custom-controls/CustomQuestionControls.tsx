import { useState, useRef } from 'react';

import styled from 'styled-components';

import { MainButton, MainInput } from '@/src/shared/ui';
import { styleMixin } from '@/src/shared/styles';

interface AddTextInputProps {
  handleAddQuestion: (title: string) => void;
  handleConfirmQuestion: () => void;
  playListLen: number;
}
function CustomQuestionControls({
  handleAddQuestion,
  handleConfirmQuestion,
  playListLen,
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
          label="추가"
          sx={{ width: '6.5rem', font: '1rem' }}
          onClick={handleAddText}
        />
        <MainButton
          label="비우기"
          sx={{ width: '7rem', font: '1rem' }}
          disabled={!playListLen}
          onClick={handleConfirmQuestion}
        />
      </ButtonContainer>
    </AddTextInputStyle>
  );
}

export default CustomQuestionControls;

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

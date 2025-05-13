import React, { useState, useRef } from 'react';

import styled from 'styled-components';

import { MainButton, MainInput } from '@/src/shared/ui';
import { styleMixin, V } from '@/src/shared/styles';

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

  const handleAddText = (e:React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleAddQuestion(title);
    setTitle('');
    textRef.current?.focus();
  };

  return (
    <AddFormContainer onSubmit={handleAddText}>
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
          sx={{ width: '6.5rem' }}
          onClick={handleAddText}
        />
        <MainButton
          label="비우기"
          sx={{ width: '7rem' }}
          disabled={!playListLen}
          onClick={handleConfirmQuestion}
        />
      </ButtonContainer>
    </AddFormContainer>
  );
}

export default CustomQuestionControls;

const AddFormContainer = styled.form`
  ${styleMixin.Flex()};
  width: 100%;
  margin-top: 1rem;
`;

const ButtonContainer = styled.div`
  ${styleMixin.Flex()};
  button {
    height: 4rem;
    margin-left: 4px;
  }

  @media screen and (max-width: ${V.mediaMobile}){
    button {
      font-size: 1.5rem;
      word-break: keep-all;
    }
  }
`;

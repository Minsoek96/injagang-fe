import { useRef, useEffect } from 'react';

import {
  BiPlus, BiRedo, BiCheck, BiX,
} from 'react-icons/bi';

import styled from 'styled-components';

import { styleMixin } from '@/src/shared/styles';

import { keys } from '@/src/shared/utils';
import { MainInput } from '@/src/shared/components';
import TQustionItem from './TQustionItem';

import useAddTemplateLogic from '../hooks/useAddTemplateLogic';

interface AddTemplateProps {
  onClose: (isClose: boolean) => void;
}

function AddTemplate({ onClose }: AddTemplateProps) {
  const {
    templateList,
    setTemplateList,
    handleQuestionChange,
    addQuestion,
    removeLastQuestion,
    confirmTemplateCreation,
  } = useAddTemplateLogic();
  const questionRef = useRef<HTMLTextAreaElement | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    questionRef.current?.focus();
  }, [templateList.templateQuestion.length]);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const ControllerData = [
    { icon: <BiPlus onClick={addQuestion} />, text: '질문추가' },
    { icon: <BiRedo onClick={removeLastQuestion} />, text: '되돌리기' },
    { icon: <BiCheck onClick={confirmTemplateCreation} />, text: '확정하기' },
  ];

  const handleChangeTitle = (text: string) => {
    setTemplateList((prev) => ({
      ...prev,
      templateTitle: text,
    }));
  };

  return (
    <TemplateAddStyled>
      <TopMenu>
        <BiX onClick={() => onClose(false)} />
      </TopMenu>
      <MainInput
        ref={titleRef}
        value={templateList.templateTitle}
        onChange={handleChangeTitle}
        placeholder="제목을 입력해주세요"
        sx={{ width: '100%' }}
      />
      <QuestionContainer>
        {templateList.templateQuestion.map((question, index) => (
          <TQustionItem
            key={keys(question, index)}
            index={index}
            question={question}
            onChange={handleQuestionChange}
            ref={questionRef}
          />
        ))}
      </QuestionContainer>
      <Controller>
        {ControllerData.map((info, idx) => (
          <IconButton key={keys(info.text, idx)}>
            {info.icon}
            <IconLabel>{info.text}</IconLabel>
          </IconButton>
        ))}
      </Controller>
    </TemplateAddStyled>
  );
}

export default AddTemplate;

const TemplateAddStyled = styled.div`
  ${styleMixin.Column('space-between')}
  padding: 1em 2em;
  height: 100%;
  width: 100%;
  position: relative;
`;

const TopMenu = styled.div`
  position: absolute;
  top: -1.5rem;
  right: -1rem;
`;

const QuestionContainer = styled.div`
  margin-top:2rem;
  width: 100%;
  overflow-x: hidden;
`;

const Controller = styled.div`
  ${styleMixin.Flex()};
  svg {
    font-size: 40px;
    cursor: pointer;
  }
`;

const IconButton = styled.div`
  position: relative;
  margin: auto 15px;
  cursor: pointer;

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;

const IconLabel = styled.span`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s, visibility 0.2s;
`;

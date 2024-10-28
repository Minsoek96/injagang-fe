import styled from 'styled-components';

import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { v4 as uuid4 } from 'uuid';

import {
  BiPlus, BiRedo, BiCheck, BiX,
} from 'react-icons/bi';

import { templateSchema, templateType } from '@/src/entities/template';

import { styleMixin } from '@/src/shared/styles';
import { keys } from '@/src/shared/utils';
import { HideSvg, UnInput } from '@/src/shared/ui';

import QustionItem from './QustionItem';

interface AddTemplateProps {
  onClose: (isClose: boolean) => void;
  onSubmit: (data: templateType.IAddFormTemplate) => void;
}

function AddTemplate({ onClose, onSubmit }: AddTemplateProps) {
  const {
    handleSubmit,
    register,
    control,
  } = useForm<templateType.IAddFormTemplate>({
    resolver: zodResolver(templateSchema.create),
    defaultValues: {
      title: '',
      questions: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const onDeleteQuestion = () => {
    if (fields.length > 1) {
      remove(fields.length - 1);
    }
  };

  const onAddQuestion = () => {
    if (fields.length < 5) {
      append({ question: '', id: uuid4() });
    }
  };

  const ControllerData = [
    {
      icon: <BiPlus onClick={onAddQuestion} />,
      text: '질문추가',
    },
    { icon: <BiRedo onClick={onDeleteQuestion} />, text: '되돌리기' },
    { icon: <BiCheck onClick={handleSubmit(onSubmit)} />, text: '확정하기' },
  ];

  return (
    <TemplateAddStyled>
      <TopMenu>
        <HideSvg onClick={() => onClose(false)} Logo={<BiX />} label="닫기" />
      </TopMenu>
      <UnInput
        register={register('title')}
        placeholder="제목을 입력해주세요"
        style={{ width: '100%' }}
      />
      <QuestionContainer>
        {fields.map((question, index) => (
          <QustionItem key={question.id} register={register} index={index} />
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
  margin-top: 2rem;
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

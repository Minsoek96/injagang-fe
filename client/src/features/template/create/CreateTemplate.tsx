import styled from 'styled-components';

import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { v4 as uuid4 } from 'uuid';

import { BiX } from 'react-icons/bi';

import {
  templateMutations,
  templateSchema,
  templateType,
} from '@/src/entities/template';

import { styleMixin } from '@/src/shared/styles';
import { HideSvg, UnInput } from '@/src/shared/ui';

import FormHandler from './FormHandler';
import QuestionItem from './QuestionItem';

interface Props {
  onClose: (isClose: boolean) => void;
}

/** CreateTemplate - Template 생성을 위한 폼
 *
 * @param onClose : 생성 모드를 제어하기 위한 함수
 */
function CreateTemplate({ onClose }: Props) {
  const { mutate: addTemplate } = templateMutations.useAddTemplate();

  const { handleSubmit, register, control } = useForm<templateType.IAddFormTemplate>({
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
    const minFieldNum = 1;
    if (fields.length <= minFieldNum) return;
    remove(fields.length - 1);
  };

  const onAddQuestion = () => {
    const maxFieldNum = 5;
    if (fields.length >= maxFieldNum) return;
    append({ question: '', id: uuid4() });
  };

  const onSubmit = (data: templateType.IAddFormTemplate) => {
    const formatData: templateType.IAddTemplate = {
      title: data.title,
      questions: data.questions.map((item) => item.question),
    };
    addTemplate(formatData);
    onClose(false);
  };

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
          <QuestionItem key={question.id} register={register} index={index} />
        ))}
      </QuestionContainer>
      <FormHandler
        onAddQuestion={onAddQuestion}
        onDeleteQuestion={onDeleteQuestion}
        handleSubmit={handleSubmit(onSubmit)}
      />
    </TemplateAddStyled>
  );
}

export default CreateTemplate;

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

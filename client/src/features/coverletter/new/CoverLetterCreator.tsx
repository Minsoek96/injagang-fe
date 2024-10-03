import { useState } from 'react';

import { styled } from 'styled-components';

import { v4 as uuid4 } from 'uuid';
import { BiPlus } from 'react-icons/bi';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

import {
  coverLetterMutation, coverLetterType, CoverLetterItem, coverLetterModel,
} from '@/src/entities/coverLetter';
import { useFetchTemplate } from '@/src/entities/template/queries';

import { StlyeInput } from '@/src/shared/ui/uncontrolled';
import { styleMixin, V } from '@/src/shared/styles';
import {
  ComboBox, Container, HideSvg, MainButton,
} from '@/src/shared/ui';

export default function CoverLetterCreator() {
  const { data: templateList = [] } = useFetchTemplate();
  const { mutate } = coverLetterMutation.useWriteCoverLetter();
  const [selectedTemplateTitle, setSelectedTemplateTitle] = useState<string>('');

  const {
    register, control, handleSubmit, reset, formState: { errors },
  } = useForm<coverLetterType.ICoverLetter>({
    resolver: zodResolver(coverLetterModel.schema),
    defaultValues: {
      title: '',
      qnaList: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'qnaList',
  });

  const changeSelectedTemplate = (selctedTemplate: string) => {
    setSelectedTemplateTitle(selctedTemplate);
    const template = templateList.find(
      (item) => item.title === selctedTemplate,
    );
    if (template) {
      reset({ qnaList: [] });
      template.questions.forEach((item) => {
        append({ question: item, answer: '', qnaId: uuid4() });
      });
    }
  };

  /** field 데이터추가 */
  const addQustion = () => {
    append({ question: '', answer: '', qnaId: uuid4() });
  };

  /** field 데이터삭제 */
  const onRemove = (targetIdx: number) => {
    if (fields.length <= 1) return;
    remove(targetIdx);
  };

  /** field 반영 */
  const onSubmit: SubmitHandler<coverLetterType.ICoverLetter> = (data) => {
    mutate(data);
  };

  return (
    <CoverLetterCreatorContainer>
      <MainTitle>자기소개서 작성</MainTitle>
      <CoverLetterForm onSubmit={handleSubmit(onSubmit)}>
        <StlyeInput
          register={register('title')}
          placeholder="자소서제목"
          style={{ width: '100%', marginBottom: '1.5rem' }}
        />
        <ComboBox
          sx={{ maxWidth: '100%', height: '4rem' }}
          label="자소서 선택"
          hideLabel
          selectedItem={selectedTemplateTitle}
          items={templateList.map((item) => item.title)}
          itemToId={(item) => item || ''}
          itemToText={(item) => item || ''}
          onChange={(value) => value && changeSelectedTemplate(value)}
        />
        {fields.map((field, index) => (
          <CoverLetterItem
            key={field.id}
            register={register}
            index={index}
            remove={onRemove}
            errors={errors}
            control={control}
          />
        ))}
        <HideSvg
          label="리스트 추가"
          onClick={addQustion}
          Logo={<BiPlus />}
          sx={{ fontSize: '3.5rem', margin: '1rem' }}
        />
        <MainButton type="submit" label="Submit" />
      </CoverLetterForm>
    </CoverLetterCreatorContainer>
  );
}

const CoverLetterCreatorContainer = styled(Container.ItemBase)`
  ${styleMixin.Column()}
  width: 100%;
  max-width: ${V.lgWidth};
`;

const MainTitle = styled.h2`
  ${styleMixin.Flex('flex-start', 'flex-start')}
  width: 100%;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 3rem;
  text-decoration: underline;
  text-underline-position: under;
  text-underline-offset: 0;
`;

const CoverLetterForm = styled.form`
  ${styleMixin.Column()}
  width: 100%;
`;

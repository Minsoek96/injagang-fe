import { styled } from 'styled-components';

import { v4 as uuid4 } from 'uuid';

import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { BiPlus } from 'react-icons/bi';

import {
  CoverLetterItem,
  coverLetterModel,
  coverLetterType,
} from '@/src/entities/coverLetter';
import { templateType } from '@/src/entities/template';

import {
  ComboBox, HideSvg, MainButton, StlyeInput,
} from '@/src/shared/ui';
import { styleMixin, V } from '@/src/shared/styles';
import { getFirstErrorMessage } from '@/src/shared/utils/check/getFirstErrorMessage';
import { useModal } from '@/src/shared/hooks';

type Props = {
  onSubmit: (data: coverLetterType.ICoverLetter) => void;
  templateList: templateType.IGetTemplate[];
  selectedTemplateTitle: string;
  setSelectedTemplateTitle: (template: string) => void;
  movePage: () => void;
};

/**
 * CreateForm 컴포넌트는 자소서를 생성하는 폼을 관리합니다.
 * - 제목 입력 필드
 * - 템플릿 선택 및 필드 생성
 * - 동적 질문 추가 및 삭제
 *
 * @param {Function} movePage - 페이지 이동 함수
 * @param onSubmit - 폼 제출 시 호출되는 함수
 * @param templateList - 템플릿 리스트
 * @param selectedTemplateTitle - 선택된 템플릿의 제목
 * @param setSelectedTemplateTitle - 템플릿 선택 변경 함수
 */

export default function CreateForm({
  movePage,
  onSubmit,
  templateList,
  selectedTemplateTitle,
  setSelectedTemplateTitle,
}: Props) {
  const { setModal } = useModal();
  const {
    register, control, handleSubmit, reset,
    formState: { errors },
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

  /** field 데이터추가 */
  const addQustion = () => {
    append({ question: '', answer: '', qnaId: uuid4() });
  };

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

  /** field 데이터삭제 */
  const onRemove = (targetIdx: number) => {
    if (fields.length <= 1) return;
    remove(targetIdx);
  };

  const onError = () => {
    const getError = getFirstErrorMessage(errors);
    if (getError) {
      setModal({
        contents: {
          title: 'Warring',
          message: getError,
        },
      });
    }
  };

  return (
    <CoverLetterForm onSubmit={handleSubmit(onSubmit, onError)}>
      <StlyeInput
        register={register('title')}
        placeholder="자소서제목"
        style={{ width: '100%', marginBottom: '1.5rem' }}
      />
      <ComboBox
        sx={{ maxWidth: '100%', height: '4rem' }}
        label="자소서 선택"
        placeholder="템플릿 선택(선택사항)"
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
          control={control}
        />
      ))}
      <HideSvg
        label="리스트 추가"
        onClick={addQustion}
        Logo={<BiPlus />}
        sx={{ fontSize: '3.5rem', margin: '1rem' }}
      />
      <ControllerBtns>
        <MainButton type="button" label="뒤로가기" sx={{ fontSize: '1.7em' }} onClick={movePage} />
        <MainButton type="submit" label="작성완료" sx={{ fontSize: '1.7em' }} />
      </ControllerBtns>
    </CoverLetterForm>
  );
}

const CoverLetterForm = styled.form`
  ${styleMixin.Column()}
  width: 100%;
`;

const ControllerBtns = styled.div`
  margin-top: 3rem;
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media screen and (max-width: ${V.mediaMobile}) {
    font-size: 0.7rem;
  }
`;

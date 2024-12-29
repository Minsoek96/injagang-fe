import { styled } from 'styled-components';

import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { BiPlus } from 'react-icons/bi';

import {
  CoverLetterItem,
  coverLetterModel,
  coverLetterType,
} from '@/src/entities/coverLetter';

import { HideSvg, MainButton, UnInput } from '@/src/shared/ui';
import { styleMixin, V } from '@/src/shared/styles';
import { getFirstErrorMessage } from '@/src/shared/utils/check/getFirstErrorMessage';
import { useModal } from '@/src/shared/hooks';

import useProgressCoverLetter from '../../model/useProgressCoverLetter';
import TemplateSelector from '../template-selector/TemplateSelector';

type Props = {
  onSubmit: (data: coverLetterType.IWriteCoverLetter) => void;
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
 */

export default function CreateForm({ movePage, onSubmit }: Props) {
  const { setModal } = useModal();
  const {
    register,
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<coverLetterType.IWriteCoverLetter>({
    resolver: zodResolver(coverLetterModel.schema),
    defaultValues: {
      title: '',
      qnaList: [],
    },
  });

  // 초안 관리
  useProgressCoverLetter(reset, getValues);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'qnaList',
  });

  /** field 데이터추가 */
  const addQustion = () => {
    append({ question: '', answer: '' });
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
        title: 'Warring',
        message: getError,
      });
    }
  };

  return (
    <CoverLetterForm onSubmit={handleSubmit(onSubmit, onError)}>
      <UnInput
        register={register('title')}
        placeholder="자소서제목"
        style={{ width: '100%', marginBottom: '1.5rem' }}
      />
      <TemplateSelector append={append} reset={reset} />
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
        <MainButton
          type="button"
          label="뒤로가기"
          variant="signature"
          onClick={movePage}
        />
        <MainButton type="submit" label="작성완료" variant="signature" />
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
  display: flex;
  justify-content: space-between;
  width: 100%;

  button {
    font-size: 1.8rem;

    @media screen and (max-width: ${V.mediaMobile}) {
      font-size: 1.6rem;
    }
  }
`;

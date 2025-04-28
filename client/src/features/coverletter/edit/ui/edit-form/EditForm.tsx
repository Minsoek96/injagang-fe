import { v4 as uuid4 } from 'uuid';

import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { BiPlus } from 'react-icons/bi';

import {
  CoverLetterItem,
  coverLetterModel,
  coverLetterType,
  FormStyle as S,
} from '@/src/entities/coverLetter';

import { MainButton, UnInput } from '@/src/shared/ui';
import { getFirstErrorMessage } from '@/src/shared/utils/check/getFirstErrorMessage';
import { useModal } from '@/src/shared/hooks';

type Props = {
  onSubmit: (data: coverLetterType.ICoverLetter) => void;
  onDelete: () => void;
  movePage: () => void;
  coverLetters: coverLetterType.ICoverLetterDetail | undefined;
};

/**
 * CreateForm 컴포넌트는 자소서를 생성하는 폼을 관리합니다.
 * - 제목 입력 필드
 * - 템플릿 선택 및 필드 생성
 * - 동적 질문 추가 및 삭제
 *
 * @param movePage - 페이지 이동 함수
 * @param onSubmit - 폼 제출 시 호출되는 함수
 * @param templateList - 템플릿 리스트
 */

export default function EditForm({
  movePage,
  onSubmit,
  onDelete,
  coverLetters,
}: Props) {
  const { setModal } = useModal();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<coverLetterType.ICoverLetterDetail>({
    resolver: zodResolver(coverLetterModel.schema),
    defaultValues: {
      title: coverLetters?.title,
      qnaList: coverLetters?.qnaList.map((field) => ({
        question: field.question,
        answer: field.answer,
        qnaId: field.qnaId,
      })),
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
    <>
      <S.formHeader>
        <S.coverletterTitle>자소설 수정</S.coverletterTitle>
      </S.formHeader>
      <S.coverletterForm onSubmit={handleSubmit(onSubmit, onError)}>
        <S.titleInputWrapper>
          <UnInput
            register={register('title')}
            placeholder="자소서제목"
            style={{ width: '100%' }}
          />
        </S.titleInputWrapper>

        {fields.map((field, index) => (
          <CoverLetterItem
            key={field.id}
            register={register}
            index={index}
            remove={onRemove}
            control={control}
          />
        ))}
        <MainButton
          label={(
            <>
              <BiPlus size={24} />
              <span>문항 추가하기</span>
            </>
          )}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addQustion();
          }}
          variant="dashed"
          sx={{ width: '100%' }}
        />
        <S.controllerWrapper>
          <MainButton
            type="button"
            label="뒤로가기"
            variant="signature"
            onClick={movePage}
          />
          <MainButton
            type="button"
            label="삭제하기"
            variant="signature"
            sx={{ fontSize: '1.7rem' }}
            onClick={onDelete}
          />
          <MainButton type="submit" label="수정완료" variant="signature" />
        </S.controllerWrapper>
      </S.coverletterForm>
    </>
  );
}

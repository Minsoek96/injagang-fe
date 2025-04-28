import { styled } from 'styled-components';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BiPlus } from 'react-icons/bi';

import {
  CoverLetterItem,
  coverLetterModel,
  coverLetterType,
  FormStyle as S,
} from '@/src/entities/coverLetter';

import { MainButton, UnInput, ErrorBoundary } from '@/src/shared/ui';
import { V } from '@/src/shared/styles';
import { getFirstErrorMessage } from '@/src/shared/utils/check/getFirstErrorMessage';
import { useModal } from '@/src/shared/hooks';

import useProgressCoverLetter from '../../model/useProgressCoverLetter';
import TemplateSelectorFallback from '../template-selector/TemplateSelectorFallback';
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
    <>
      <S.formHeader>
        <S.coverletterTitle>자소설 제목</S.coverletterTitle>
        <FormSubtitle>
          인생의
          <span>새로운 챕터</span>
          를 시작하세요
        </FormSubtitle>
      </S.formHeader>

      <S.coverletterForm onSubmit={handleSubmit(onSubmit, onError)}>
        <S.titleInputWrapper>
          <UnInput
            register={register('title')}
            placeholder="자기소개서 제목을 입력해주세요."
            style={{ width: '100%', marginBottom: '1.5rem', height: '5rem' }}
          />
        </S.titleInputWrapper>

        <TemplateSection>
          <S.sectionTitle>템플릿 선택</S.sectionTitle>
          <ErrorBoundary
            renderFallback={(error, onReset) => (
              <TemplateSelectorFallback onReset={onReset} />
            )}
          >
            <TemplateSelector append={append} reset={reset} />
          </ErrorBoundary>
        </TemplateSection>

        <QuestionsSection>
          <SectionTitle>자소서 항목</SectionTitle>

          <QuestionList>
            {fields.map((field, index) => (
              <CoverLetterItem
                key={field.id}
                register={register}
                index={index}
                remove={onRemove}
                control={control}
              />
            ))}
          </QuestionList>

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
        </QuestionsSection>

        <S.controllerWrapper>
          <MainButton
            type="submit"
            label="뒤로가기"
            variant="signature"
            onClick={movePage}
          />
          <MainButton type="submit" label="작성완료" variant="signature" />
        </S.controllerWrapper>
      </S.coverletterForm>
    </>
  );
}

const FormSubtitle = styled.p`
  font-size: 1.4rem;
  margin-top: 0.5rem;
  font-family: ${V.serif};
  font-style: italic;

  span {
    font-family: ${V.serif};
    border-bottom: 2.5px solid ${(props) => props.theme.colors.signatureColor};
  }
`;

const SectionTitle = styled.h3`
  font-family: ${V.serif};
  font-weight: 500;
  color: ${(props) => props.theme.colors.signatureColor};
  font-size: 2rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.mainLine};
`;

const TemplateSection = styled.div`
  width: 100%;
`;

const QuestionsSection = styled.div`
  width: 100%;
`;

const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
`;

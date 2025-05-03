import { Suspense } from 'react';
import dynamic from 'next/dynamic';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { boardType, boardSchema } from '@/src/entities/qnaboard';

import {
  MainButton, Container, Spinner, UnInput,
} from '@/src/shared/ui';

import styled from 'styled-components';
import { CoverLetterDetail } from './coverletter-preview';
import { CoverLetterSelector } from './coverletter-selector';

const MarkdownEditor = dynamic(
  () => import('@/src/shared/ui/markdown/MarkdownEditor'),
  {
    loading: () => <Spinner message="편집기를 불러오는 중입니다." />,
    ssr: false,
  },
);

type Props = {
  onSubmit: (data: boardType.IWriteQnaBoard) => void;
};

/**
 * QuestionCreateForm 컴포넌트는 자소서 첨부 게시물을 작성.
 * - 제목, 질문내용 입력 필드
 * - 첨부 자소서 선택
 * - 첨부 자소서 출력
 * @param onSubmit - 폼 제출 시 호출되는 함수
 */
function QuestionCreateForm({ onSubmit }: Props) {
  const {
    register, handleSubmit, setValue, watch, control,
  } = useForm<boardType.IWriteQnaBoard>({
    resolver: zodResolver(boardSchema.create),
    defaultValues: {
      title: '',
      content: '',
      essayId: 0,
    },
  });

  return (
    <>
      <ArticleCard $size={{ width: '100%', height: '100%' }}>
        <UnInput
          register={register('title')}
          style={{ width: '100%', marginBottom: '1rem' }}
          placeholder="제목을 작성해주세요."
        />
        <CoverLetterSelector handleChange={(id) => setValue('essayId', id)} />
        <Controller
          name="content"
          control={control}
          render={({ field: { onChange } }) => (
            <MarkdownEditor
              onChange={onChange}
              placeholder="질문을 작성해주세요."
            />
          )}
        />
        <MainButton
          label="작성완료"
          onClick={handleSubmit(onSubmit)}
          variant="signature"
          sx={{
            width: '100%',
            minHeight: '4rem',
            fontSize: '1.6rem',
          }}
        />
      </ArticleCard>
      <ArticleCard $size={{ width: '100%', height: '100%' }}>
        <Suspense fallback={<Spinner />}>
          <CoverLetterDetail essayId={watch('essayId')} />
        </Suspense>
      </ArticleCard>
    </>
  );
}

export default QuestionCreateForm;

const ArticleCard = styled(Container.ArticleCard)`
  height: 87dvh;
  min-height: 40rem;
`;

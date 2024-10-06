import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import styled from 'styled-components';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { boardType, boardMutation, boardSchema } from '@/src/entities/qnaboard';

import {
  MainButton, Container, Spinner, UnInput,
} from '@/src/shared/ui';
import { styleMixin, V } from '@/src/shared/styles';

import CoverLetterDetail from './CoverLetterDetail';
import CoverLetterSelector from './CoverLetterSelector';

const MarkdownEditor = dynamic(
  () => import('@/src/shared/ui/markdown/MarkdownEditor'),
  {
    loading: () => <Spinner message="편집기를 불러오는 중입니다." />,
    ssr: false,
  },
);

function QuestionComposer() {
  const router = useRouter();
  const { mutate: writeBoard } = boardMutation.useWriteBoard();

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

  const navigateToList = () => {
    router.push('/qna/list');
  };

  const onSubmit = (data: boardType.IWriteQnaBoard) => {
    writeBoard(data);
    navigateToList();
  };

  return (
    <ComposerContainer>
      <Container.ArticleCard $size={{ width: '100%', height: '87dvh' }}>
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
          sx={{
            width: '100%',
            minHeight: '4rem',
            fontSize: '1.6rem',
            backgroundColor: '#ff8800',
          }}
        />
      </Container.ArticleCard>
      <Container.ArticleCard $size={{ width: '100%', height: '87dvh' }}>
        <CoverLetterDetail essayId={watch('essayId')} />
      </Container.ArticleCard>
    </ComposerContainer>
  );
}

export default QuestionComposer;

const ComposerContainer = styled(Container.ItemBase)`
  ${styleMixin.Flex('flex-start')}
  width: 100%;
  height: 100%;
  gap: 30px;
  @media screen and (max-width: ${V.mediaWeb}) {
    ${styleMixin.Column('flex-start')}
  }
`;

import dynamic from 'next/dynamic';

import styled from 'styled-components';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  boardType, useBoardStore, boardMutation, boardSchema,
} from '@/src/entities/qnaboard';

import {
  MainButton, Container, Spinner,
  UnInput,
} from '@/src/shared/ui';
import { styleMixin, V } from '@/src/shared/styles';
import { usePageRouter } from '@/src/shared/hooks';

const MarkdownEditor = dynamic(
  () => import('@/src/shared/ui/markdown/MarkdownEditor'),
  {
    loading: () => <Spinner message="편집기를 불러오는 중입니다." />,
    ssr: false,
  },
);

type Props = {
  boardId: number;
};

function QuestionEditComposer({ boardId }: Props) {
  const { mutate: reviseBoard } = boardMutation.useReviseBoard();
  const { editBoardState } = useBoardStore();
  const { moveBoardDetailPage } = usePageRouter();

  const {
    register,
    handleSubmit,
    control,
  } = useForm<boardType.IReviseQnaBoard>({
    resolver: zodResolver(boardSchema.revise),
    defaultValues: {
      changeTitle: editBoardState.title,
      changeContent: editBoardState.content,
      boardId,
    },
  });

  const onSubmit = (data: boardType.IReviseQnaBoard) => {
    reviseBoard(data);
    moveBoardDetailPage(boardId);
  };

  return (
    <ComposerContainer>
      <Container.ArticleCard $size={{ width: '100%', height: '87vh' }}>
        <UnInput
          register={register('changeTitle')}
          style={{ width: '100%', marginBottom: '1rem' }}
          placeholder="제목을 작성해주세요."
        />
        <Controller
          name="changeContent"
          control={control}
          render={({ field: { onChange, value } }) => (
            <MarkdownEditor
              initText={value}
              onChange={onChange}
              placeholder="질문을 작성해주세요."
            />
          )}
        />
        <MainButton
          label="수정완료"
          onClick={handleSubmit(onSubmit)}
          sx={{
            width: '100%',
            minHeight: '4rem',
            fontSize: '1.6rem',
            backgroundColor: '#ff8800',
          }}
        />
      </Container.ArticleCard>
    </ComposerContainer>
  );
}

export default QuestionEditComposer;

const ComposerContainer = styled(Container.ItemBase)`
  ${styleMixin.Flex('flex-start')}
  width: 100%;
  height: 100%;
  gap: 30px;
  @media screen and (max-width: ${V.mediaWeb}) {
    ${styleMixin.Column('flex-start')}
  }
`;

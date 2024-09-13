import { memo, useState } from 'react';

import { useRouter } from 'next/router';

import styled from 'styled-components';

import { useBoardStore } from '@/src/entities/qnaboard';
import { useReviseBoard } from '@/src/entities/qnaboard/mutaions';

import {
  MainButton,
  MainInput,
  Container,
  Spinner,
} from '@/src/shared/ui';
import { styleMixin, V } from '@/src/shared/styles';
import dynamic from 'next/dynamic';

const MarkdownEditor = dynamic(
  () => import('@/src/shared/ui/markdown/MarkdownEditor'),
  {
    loading: () => (
      <Spinner message="편집기를 불러오는 중입니다." />
    ),
    ssr: false,
  },
);

type Props = {
  boardId: number;
};

function QuestionEditComposer({ boardId }: Props) {
  const router = useRouter();
  const { mutate: reviseBoard } = useReviseBoard();
  const { editBoardState } = useBoardStore();

  const [title, setTitle] = useState<string>(editBoardState.title);
  const [content, setContent] = useState<string>(editBoardState.content);

  const navigateToList = () => {
    router.push(`/qna/detail/${boardId}`);
  };

  const handleSubmit = () => {
    const data = {
      boardId,
      changeTitle: title,
      changeContent: content,
    };
    reviseBoard(data);
    navigateToList();
  };

  return (
    <ComposerContainer>
      <Container.ArticleCard $size={{ width: '100%', height: '87vh' }}>
        <MainInput
          value={title}
          onChange={setTitle}
          sx={{ width: '100%', marginBottom: '1rem' }}
        />
        <MarkdownEditor
          initText={editBoardState.content}
          onChange={setContent}
          placeholder="질문을 작성해주세요."
        />
        <MainButton
          label="수정완료"
          onClick={handleSubmit}
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

export default memo(QuestionEditComposer);

const ComposerContainer = styled(Container.ItemBase)`
  ${styleMixin.Flex('flex-start')}
  width: 100%;
  height: 100%;
  gap: 30px;
  @media screen and (max-width: ${V.mediaWeb}) {
    ${styleMixin.Column('flex-start')}
  }
`;

import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { styled } from 'styled-components';

import { QuestionDetailView } from '@/src/features/qna/detail';
import { AnswerDragCoverLetter } from '@/src/features/qna/dragview';

import { boardQueries, useBoardStore } from '@/src/entities/qnaboard';

import { Container } from '@/src/shared/ui';
import { styleMixin, V } from '@/src/shared/styles';

export default function QuestionDetail() {
  const router = useRouter();
  const boardId = router.query;

  const { setQuestionIds } = useBoardStore();

  const {
    data: boardList,
    isLoading,
    isError,
  } = boardQueries.useFetchBoardDetail(Number(boardId.id));

  useEffect(() => {
    if (boardList) {
      const questions = boardList.qnaList.map((item) => item.qnaId);
      setQuestionIds(questions);
    }
  }, [boardList]);

  if (isLoading) return <p>게시글을 받아오는중입니다.</p>;

  if (isError || !boardList) return <p>오류가 발생했습니다.</p>;

  const {
    owner, title, nickname, content,
  } = boardList;
  return (
    <DetailContainer>
      <Container.ArticleCard
        $size={{ width: '100%', height: '100%', isMedia: true }}
      >
        <QuestionDetailView
          owner={owner}
          title={title}
          content={content}
          boardId={Number(boardId.id)}
          nickname={nickname}
        />
      </Container.ArticleCard>
      <Container.ArticleCard
        $size={{ width: '100%', height: '100%', isMedia: true }}
      >
        <AnswerDragCoverLetter boardId={Number(boardId.id)} />
      </Container.ArticleCard>
    </DetailContainer>
  );
}

const DetailContainer = styled(Container.ItemBase)`
  ${styleMixin.Column()}
  font-family: ${V.malgunGothic};
  width: 100%;
  gap: 2rem;
  margin-bottom: 2rem;

  @media screen and (max-width: ${V.mediaWeb}) {
    ${styleMixin.Column()}
  }

  > article:first-child {
    max-height: 100%;
  }
`;

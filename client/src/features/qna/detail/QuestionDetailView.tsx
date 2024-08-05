import { useEffect } from 'react';

import { useRouter } from 'next/router';

import styled from 'styled-components';

import { boardQueries, useBoardStore } from '@/src/entities/qnaboard';
import { Container } from '@/src/shared/components';
import { styleMixin, V } from '@/src/shared/styles';

import EditMenuBar from './EditMenuBar';
import BoardItem from './BoardItem';
import AnswerDragView from './AnswerDragView';

function QuestionDetailView() {
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
  // $size={{ width: '100%', height: '45vh', flex: 'row' }}
  return (
    <DetailContainer>
      <Container.ArticleCard
        $size={{ width: '100%', height: '100%', isMedia: true }}
      >
        {boardList?.owner && <EditMenuBar boardID={boardList.boardId} />}
        <BoardItem {...boardList} />
      </Container.ArticleCard>
      <Container.ArticleCard
        $size={{ width: '100%', height: '100%', isMedia: true }}
      >
        <AnswerDragView boardId={Number(boardId.id)} />
      </Container.ArticleCard>
    </DetailContainer>
  );
}

export default QuestionDetailView;

const DetailContainer = styled(Container.ItemBase)`
  ${styleMixin.Column()}
  font-family: "Malgun Gothic", sans-serif;
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

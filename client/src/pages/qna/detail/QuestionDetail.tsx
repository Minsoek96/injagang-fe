import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { styled } from 'styled-components';

import { QuestionDetailView } from '@/src/features/qna/detail';
import { AnswerDragCoverLetter } from '@/src/features/qna/dragview';

import { boardQueries, useBoardStore } from '@/src/entities/qnaboard';

import { Container, RunningLoader } from '@/src/shared/ui';
import { styleMixin, V } from '@/src/shared/styles';

export default function QuestionDetail() {
  const router = useRouter();
  const boardId = router.query;

  const setQuestionIds = useBoardStore((state) => state.setQuestionIds);

  const {
    data: boardList,
    isLoading,
    isError,
  } = boardQueries.useFetchCurrentBoardDetail();

  /** 보드 상태를 조회한 후 피드백 검색기 생성 */
  useEffect(() => {
    if (boardList) {
      const questions = boardList.qnaList.map((item) => item.qnaId);
      setQuestionIds(questions);
    }
  }, [boardList]);

  if (isLoading) {
    return (
      <Container.ArticleCard
        $size={{ width: '100%', height: '100%', isMedia: true }}
      >
        <RunningLoader />
        <p>자소서 상세 정보를 가져오는 중이에요.</p>
      </Container.ArticleCard>
    );
  }

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
      <ArticleCard
        $size={{
          width: '100%', height: '100%', isMedia: true,
        }}
      >
        <AnswerDragCoverLetter />
      </ArticleCard>
    </DetailContainer>
  );
}

const DetailContainer = styled(Container.ItemBase)`
  ${styleMixin.Column()}
  font-family: ${V.malgunGothic};
  width: 100%;
  gap: 2rem;
  margin-bottom: 2rem;

  > article:first-child {
    max-height: 100%;
  }
`;

const ArticleCard = styled(Container.ArticleCard)`
  max-height: 100%;
`;

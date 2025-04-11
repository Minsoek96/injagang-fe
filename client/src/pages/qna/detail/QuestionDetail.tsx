import { styled } from 'styled-components';

import { QuestionDetailView } from '@/src/features/qna/detail';
import { DraggableCoverLetterView } from '@/src/features/qna/dragview';

import { boardQueries } from '@/src/entities/qnaboard';

import { Container, RunningLoader } from '@/src/shared/ui';
import { styleMixin, V } from '@/src/shared/styles';

export default function QuestionDetail() {
  const {
    data: boardList,
    isLoading,
    isError,
  } = boardQueries.useFetchCurrentBoardDetail();

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

  return (
    <DetailContainer>
      <Container.ArticleCard
        $size={{ width: '100%', height: '100%', isMedia: true }}
      >
        <QuestionDetailView />
      </Container.ArticleCard>
      <ArticleCard
        $size={{
          width: '100%', height: '100%', isMedia: true,
        }}
      >
        <DraggableCoverLetterView />
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

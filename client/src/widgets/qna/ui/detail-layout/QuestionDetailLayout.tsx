import { styled } from 'styled-components';

import { QuestionDetailView } from '@/src/features/qna/detail';
import { DraggableCoverLetterView } from '@/src/features/qna/dragview';

import { Container, ErrorBoundary, MainButton } from '@/src/shared/ui';
import { styleMixin, V } from '@/src/shared/styles';

export default function QuestionDetail() {
  return (
    <DetailContainer>
      <ErrorBoundary
        renderFallback={(error, reset) => ErrorFallback(error, reset)}
      >
        <Container.ArticleCard
          $size={{ width: '100%', height: '100%', isMedia: true }}
        >
          <QuestionDetailView />
        </Container.ArticleCard>
        <ArticleCard
          $size={{
            width: '100%',
            height: '100%',
            isMedia: true,
          }}
        >
          <DraggableCoverLetterView />
        </ArticleCard>
      </ErrorBoundary>
    </DetailContainer>
  );
}

function ErrorFallback(_: Error, reset: () => void) {
  return (
    <ArticleCard
      $size={{
        width: '100%',
        height: '100%',
        isMedia: true,
      }}
    >
      <ErrorContainer>
        <h3>잠시만요!</h3>
        <p>상세 질문을 불러오는 중 문제가 발생했습니다.</p>
        <p>불편을 끼쳐 죄송합니다.🙇‍♂️🙇‍♂️🙇‍♂️</p>
        <MainButton label="복구 시도 버튼" onClick={reset} variant="signature" />
      </ErrorContainer>
    </ArticleCard>
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

const ErrorContainer = styled.div`
  ${styleMixin.Column()}
  text-align: center;
  gap: 2rem;

  p {
    font-size: 1.6rem;
    line-height: 1;
  }

  h3 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
`;

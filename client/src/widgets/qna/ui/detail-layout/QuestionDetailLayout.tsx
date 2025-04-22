import { styled } from 'styled-components';

import { QuestionDetailView } from '@/src/features/qna/detail';
import { DraggableCoverLetterView } from '@/src/features/qna/dragview';

import { Container } from '@/src/shared/ui';
import { styleMixin, V } from '@/src/shared/styles';

export default function QuestionDetail() {
  return (
    <DetailContainer>
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

import { styled } from 'styled-components';

import { QuestionDetailView } from '@/src/features/qna/detail';
import { DraggableCoverLetterView } from '@/src/features/qna/dragview';

import { Container } from '@/src/shared/ui';
import { styleMixin, V } from '@/src/shared/styles';

export default function QuestionCoverLetterView() {
  return (
    <DetailContainer>
      <ArticleCard
        $size={{ width: '100%', height: '100%', isMedia: true }}
      >
        <QuestionDetailView />
      </ArticleCard>
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
  @media screen and (max-width: ${V.mediaTablet}){
    border: none;
    border-top: 2px solid ${(props) => props.theme.colors.mainLine};
    border-bottom: 2px solid ${(props) => props.theme.colors.mainLine};
    border-radius: 0;
  }
`;

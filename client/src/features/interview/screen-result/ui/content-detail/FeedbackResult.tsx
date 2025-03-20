import { styled } from 'styled-components';

import { V } from '@/src/shared/styles';

import FeedbackItems from './FeedbackItems';

type Props = {
  strengths: string[];
  improvements: string[];
  rating?: string;
};

export default function FeedbackResult({ strengths, improvements, rating = '' }: Props) {
  return (
    <FeedbackContainer>
      <FeedbackWrapper>
        <CategoryLabel>
          평점 :
          {rating}
        </CategoryLabel>
      </FeedbackWrapper>
      <FeedbackItems itemList={strengths} label="강점" type="strengths" />
      <FeedbackItems itemList={improvements} label="약점" type="improvements" />
    </FeedbackContainer>
  );
}

const FeedbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

const FeedbackWrapper = styled.div`
  margin-top: 0.5rem;
  border-radius: 0.8rem;
  padding: 1.2rem 1.5rem;
`;

const CategoryLabel = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 1rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px dashed ${(props) => props.theme.colors.mainLine};

  @media screen and (max-width: ${V.mediaMobile}) {
    font-size: 1.4rem;
  }
`;

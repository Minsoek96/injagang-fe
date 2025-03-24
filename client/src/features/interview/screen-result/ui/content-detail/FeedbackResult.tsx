import { styled } from 'styled-components';

import { V } from '@/src/shared/styles';

import FeedbackItems from './FeedbackItems';

type Props = {
  strengths: string[];
  improvements: string[];
  rating: string;
};

export default function FeedbackResult({
  strengths,
  improvements,
  rating,
}: Props) {
  if (!rating || !strengths || !improvements) {
    return (
      <p>
        피드백 분석 기록이 없습니다. 첫 피드백을 요청하시려면 하단의 돋보기 아이콘을 눌러주세요.
      </p>
    );
  }
  return (
    <FeedbackContainer>
      <FeedbackWrapper>
        <CategoryLabel>
          등급:
          <span>{rating}</span>
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
  padding-bottom: 1rem;
  border-bottom: 1px dashed ${(props) => props.theme.colors.mainLine};

  span {
    font-size: 1.8rem;
    color: ${(props) => props.theme.colors.signatureColor};
    margin-left: 0.5rem;
    padding-bottom: 0.2rem;
  }

  @media screen and (max-width: ${V.mediaMobile}) {
    font-size: 1.4rem;
  }
`;

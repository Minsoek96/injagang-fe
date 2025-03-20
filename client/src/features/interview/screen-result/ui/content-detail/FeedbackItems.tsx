import { styled } from 'styled-components';

import { V } from '@/src/shared/styles';
import { keys } from '@/src/shared/utils';

type Props<T> = {
    itemList: T[];
    type: 'improvements' | 'strengths';
    label: string;
  }

export default function FeedbackItemList<T>({ itemList, type, label }: Props<T>) {
  if (itemList.length === 0) return null;

  return (
    <FeedbackWrapper>
      <CategoryLabel>{label}</CategoryLabel>
      {itemList.map((item, idx) => (
        <FeedbackItem $iconType={type} key={keys(item as string, idx)}>
          {String(item)}
        </FeedbackItem>
      ))}
    </FeedbackWrapper>
  );
}

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

type FeedItemStyle = {
  $iconType: 'improvements' | 'strengths';
};

const FeedbackItem = styled.p<FeedItemStyle>`
  position: relative;
  font-size: 1.7rem;
  line-height: 1.5;
  color: ${(props) => props.theme.colors.text};
  margin: 0.8rem 0;
  padding-left: 1.8rem;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.6rem;
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    background-color: ${(props) =>
    (props.$iconType === 'strengths' ? 'green' : 'orange')};
  }

  @media screen and (max-width: ${V.mediaMobile}) {
    font-size: 1.4rem;
    padding-left: 1.6rem;

    &::before {
      top: 0.5rem;
      width: 0.7rem;
      height: 0.7rem;
    }
  }
`;

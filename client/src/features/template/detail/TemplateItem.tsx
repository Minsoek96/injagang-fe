import { styled } from 'styled-components';

import { V } from '@/src/shared/styles';

type Props = {
  index: number;
  question: string;
};
export default function TemplateItem({ index, question }: Props) {
  return (
    <ItemContainer>
      {index + 1}
      .
      {' '}
      {question}
    </ItemContainer>
  );
}

const ItemContainer = styled.div`
  font-size: 1.8rem;
  line-height: 1.6;
  margin-bottom: 8px;

  @media screen and (max-width: ${V.mediaMobile}){
    font-size: 1.6rem;
  }
`;

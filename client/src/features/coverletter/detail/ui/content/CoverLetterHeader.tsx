import { styled } from 'styled-components';

import { V } from '@/src/shared/styles';

type Props ={
    title: string;
    questionLen: number;
}
export default function CoverLetterHeader({ title, questionLen }:Props) {
  return (
    <PageHeader>
      <TitleWrapper>
        <Title>{title}</Title>
        <SubText>
          총
          {' '}
          {questionLen}
          개의 문항
        </SubText>
      </TitleWrapper>
    </PageHeader>
  );
}

const PageHeader = styled.div`
  padding: 2rem 2rem 1.5rem 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.mainLine};
  margin-bottom: 2rem;
`;

const TitleWrapper = styled.div`
  line-height: 1.4;
`;

const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: 600;
  font-family: ${V.serif};
  color: ${(props) => props.theme.colors.signatureColor};
  margin-bottom: 0.5rem;
`;

const SubText = styled.span`
  font-size: 1.4rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.emptyGray};
`;

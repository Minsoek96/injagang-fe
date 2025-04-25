import styled from 'styled-components';
import { PiBookLight } from 'react-icons/pi';

import {
  coverLetterQueries,
  useCoverLetterStore,
} from '@/src/entities/coverLetter';

import { styleMixin, V } from '@/src/shared/styles';

export default function CoverLetterDetail() {
  const selectedCoverLetter = useCoverLetterStore(
    (state) => state.selectedCoverLetter,
  );
  const { essayId } = selectedCoverLetter;

  if (essayId === 0) {
    return (
      <CoverLetterContainer>
        <EmptyStateContainer>
          <EmptyStateIcon><PiBookLight /></EmptyStateIcon>
          <EmptyStateMessage>아직 펼쳐보지 않은 페이지</EmptyStateMessage>
          <EmptyStateSubMessage>
            왼쪽 책갈피에서 당신의 이야기를 선택해 읽어보세요
          </EmptyStateSubMessage>
        </EmptyStateContainer>
      </CoverLetterContainer>
    );
  }

  return <CoverLetterDetailContent essayId={essayId} />;
}

type Props = {
  essayId: number;
};

function CoverLetterDetailContent({ essayId }: Props) {
  const { data: coverLetterData } = coverLetterQueries.useFetchDetailCoverLetter(essayId);
  const { qnaList } = coverLetterData;

  return (
    <CoverLetterContainer>
      <PageHeader>
        <TitleWrapper>
          <Title>{coverLetterData.title}</Title>
          <SubText>
            총
            {' '}
            {qnaList.length}
            개의 문항
          </SubText>
        </TitleWrapper>
      </PageHeader>

      <ContentWrapper>
        {qnaList.map((item, index) => (
          <QuestionSection key={item.qnaId}>
            <QuestionNumber>
              Q
              {index + 1}
            </QuestionNumber>

            <QuestionContent>
              <QuestionText>{item.question}</QuestionText>
              <AnswerText>{item.answer}</AnswerText>
            </QuestionContent>
          </QuestionSection>
        ))}
      </ContentWrapper>
    </CoverLetterContainer>
  );
}

const EmptyStateContainer = styled.div`
  height: 100%;
  ${styleMixin.Column()}
  padding: 2rem;
  color: ${(props) => props.theme.colors.text};
`;

const EmptyStateIcon = styled.div`
  font-size: 5rem;
  margin-bottom: 1rem;
  opacity: 0.6;
`;

const EmptyStateMessage = styled.p`
  text-align: center;
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.colors.signatureColor};
`;

const EmptyStateSubMessage = styled.p`
  text-align: center;
  font-size: 1.6rem;
  color: ${(props) => props.theme.colors.emptyGray};
`;

const CoverLetterContainer = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid ${(props) => props.theme.colors.mainLine};
  background-color: ${(props) => props.theme.colors.primary};
  box-shadow: ${V.boxShadow2};
  overflow-y: auto;
  ${styleMixin.ScrollBar};
  padding-left: 2rem;
`;

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

const ContentWrapper = styled.div`
  ${styleMixin.Column('flex-start', 'flex-start')}
  padding: 0 2rem 3rem 0;
  gap: 3rem;
`;

const QuestionSection = styled.div`
  position: relative;
  padding-left: 3rem;
`;

const QuestionNumber = styled.div`
  position: absolute;
  ${styleMixin.Flex()}
  left: -0.5rem;
  top: 0;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.signatureColor};
  color: white;
  font-weight: bold;
  font-family: ${V.serif};
  font-size: 1.4rem;
`;

const QuestionContent = styled.div`
  border-left: 2px solid ${(props) => `${props.theme.colors.signatureColor}2A`};
  padding-left: 1.5rem;
`;

const QuestionText = styled.h2`
  font-family: ${V.serif};
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: ${(props) => props.theme.colors.signatureColor};
`;

const AnswerText = styled.p`
  font-family: ${V.serif};
  font-size: 1.4rem;
  line-height: 1.8;
  white-space: pre-line;
  overflow-wrap: break-word;
  word-break: break-word;
`;

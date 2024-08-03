import styled from 'styled-components';

type CoverLetterDetailItemsProps = {
  answer: string;
  question: string;
};

function CoverLetterItem({ answer, question }: CoverLetterDetailItemsProps) {
  return (
    <CoverLetterDetailItemsStyle>
      <CoverLetterQuestionContainer>
        <span>질문 : </span>
        <p>{question}</p>
      </CoverLetterQuestionContainer>
      <CoverLetterAnswerContainer>
        <span>답변:</span>
        <p>{answer}</p>
      </CoverLetterAnswerContainer>
    </CoverLetterDetailItemsStyle>
  );
}

export default CoverLetterItem;

const CoverLetterDetailItemsStyle = styled.div`
  word-break: break-all;
  span {
    color :${(props) => props.theme.colors.signatureColor};
  }
`;
const CoverLetterQuestionContainer = styled.div`
  font-size: 1.8rem;
  padding-block: 0.8em;
  border-top: .1em solid ${(props) => props.theme.colors.mainLine};
  border-bottom: .1em solid ${(props) => props.theme.colors.mainLine};
  margin: 1.5rem auto;
  line-height: 1.45;

  p {
    display: inline-block;
  }
`;

const CoverLetterAnswerContainer = styled.div`
  line-height: 1.6;
`;

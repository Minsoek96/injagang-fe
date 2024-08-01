import styled from 'styled-components';

function CoverLetterPreViewItem({
  idx,
  question,
}: {
  idx: number;
  question: string;
}) {
  return (
    <CoverLetterTitle>
      {idx + 1}
      .
      {question}
    </CoverLetterTitle>
  );
}

export default CoverLetterPreViewItem;

const CoverLetterTitle = styled.h2`
  margin-top: 1.2rem;
  line-height: 1.4;
`;

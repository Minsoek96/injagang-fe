import styled from "styled-components";

const CoverLetterPreViewItem = ({
  idx,
  question,
}: {
  idx: number;
  question: string;
}) => (
  <CoverLetterTitle>
    {idx + 1}. {question}
  </CoverLetterTitle>
);

export default CoverLetterPreViewItem

const CoverLetterTitle = styled.h2`
  margin-top: 11px;
`;


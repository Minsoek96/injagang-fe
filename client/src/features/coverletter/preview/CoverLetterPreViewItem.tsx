import styled from 'styled-components';

/**
 * CoverLetterItems 유저가 선택한 자소서의 질문 아이템
 * @param idx - 질문 넘버
 * @param question - 질문 제목
 */
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

const CoverLetterTitle = styled.li`
  margin-top: 1.2rem;
  line-height: 1.4;
`;

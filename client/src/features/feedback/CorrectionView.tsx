import styled from 'styled-components';

interface CorrectionViewProps {
  targetQuestion: number;
  targetAnswer: string;
}
function CorrectionView({ targetQuestion, targetAnswer }: CorrectionViewProps) {
  const emptyTarget = targetQuestion === 0;
  return (
    <CorrectionContainer>
      <span className="correction_title">
        현재 선택된 문장
        {' '}
        :
        {' '}
        {emptyTarget ? '첨부된 자소서가 없습니다.' : targetQuestion}
      </span>
      <p className="correction_sentence">{targetAnswer}</p>
    </CorrectionContainer>
  );
}

export default CorrectionView;

const CorrectionContainer = styled.div`
  width: 100%;

  .correction_title {
    font-weight: bold;
    color: red;
    text-align: left;
  }

  .correction_sentence {
    padding: 0.2em;
    margin-top: 1rem;
    word-break: break-all;
    line-height: 1.8;
  }
`;

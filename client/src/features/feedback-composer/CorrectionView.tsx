import styled from 'styled-components';

interface CorrectionViewProps {
  targetQuestion: number;
  targetAnswer: string;
}

/** 첨삭 내용을 보여주는 컴포넌트 */
function CorrectionView({ targetQuestion, targetAnswer }: CorrectionViewProps) {
  const emptyTarget = targetQuestion === 0;
  const emptyMessage = '첨삭된 내용이 없습니다...';
  return (
    <CorrectionContainer>
      <CorrectionTitle>
        현재 선택된 문장 :
        {' '}
        {emptyTarget && emptyMessage }
      </CorrectionTitle>
      <Sentenc>{targetAnswer}</Sentenc>
    </CorrectionContainer>
  );
}

export default CorrectionView;

const CorrectionContainer = styled.div`
  width: 100%;
`;

const CorrectionTitle = styled.span`
  font-weight: bold;
  color: red;
  text-align: left;
`;

const Sentenc = styled.p`
  padding: 0.2em;
  margin-top: 1rem;
  word-break: break-all;
  line-height: 1.8;
`;

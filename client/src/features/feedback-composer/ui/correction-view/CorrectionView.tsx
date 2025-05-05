import { styleMixin } from '@/src/shared/styles';
import styled from 'styled-components';

interface CorrectionViewProps {
  targetAnswer: string;
}

/** 첨삭 내용을 보여주는 컴포넌트 */
function CorrectionView({ targetAnswer }: CorrectionViewProps) {
  const emptyMessage = '첨삭된 내용이 없습니다.';
  const isEmptyTarget = !targetAnswer;
  return (
    <CorrectionContainer>
      <CorrectionTitle>
        현재 선택된 문장 :
        {' '}
        {isEmptyTarget && emptyMessage}
      </CorrectionTitle>
      <Sentenc $isActive={!!targetAnswer.length}>
        {isEmptyTarget ? '답변을 드래그 해주세요.' : targetAnswer.trim()}
      </Sentenc>
    </CorrectionContainer>
  );
}

export default CorrectionView;

const CorrectionContainer = styled.div`
  width: 100%;
`;

const CorrectionTitle = styled.span`
  font-weight: 600;
  color: ${(props) => props.theme.colors.red};
  text-align: left;
`;

const Sentenc = styled.p<{ $isActive: boolean }>`
  ${styleMixin.ReadableText};
  margin-block: 1.2rem;
  padding: 1rem 1.4rem;

  color: ${({ theme, $isActive }) =>
    ($isActive ? theme.colors.boardText : theme.colors.text)};

  border: ${({ theme, $isActive }) =>
    ($isActive ? `2px dashed ${theme.colors.highlightLine}` : 'none')};
  border-left: none;
  border-right: none;
`;

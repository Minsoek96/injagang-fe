import { styleMixin } from '@/src/shared/styles';
import styled from 'styled-components';

interface CorrectionViewProps {
  targetAnswer: string;
}

/** 첨삭 내용을 보여주는 컴포넌트 */
function CorrectionView({ targetAnswer }: CorrectionViewProps) {
  const emptyMessage = '첨삭된 내용이 없습니다...';
  return (
    <CorrectionContainer>
      <CorrectionTitle>
        현재 선택된 문장 :
        {' '}
        {!targetAnswer && emptyMessage}
      </CorrectionTitle>
      <Sentenc $isActive={!!targetAnswer.length}>{targetAnswer.trim()}</Sentenc>
    </CorrectionContainer>
  );
}

export default CorrectionView;

const CorrectionContainer = styled.div`
  width: 100%;
`;

const CorrectionTitle = styled.span`
  font-weight: bold;
  color: #ff0000ae;
  text-align: left;
`;

const Sentenc = styled.p<{ $isActive: boolean }>`
<<<<<<< HEAD
  margin-top: 1rem;
  padding: 0.4rem 1.2rem;
  color: ${(props) => props.theme.colors.boardText};
  border: ${({ theme, $isActive }) =>
    ($isActive ? `2px dashed ${theme.colors.highlightLine}` : 'none')};
  line-height: 1.8;
  white-space: pre-line;
  overflow-wrap: break-word;
  word-break: break-word;
=======
  ${styleMixin.ReadableText};
  margin-block: 1.2rem;
  padding: 1rem 1.4rem;
  color: ${(props) => props.theme.colors.boardText};
  border: ${({ theme, $isActive }) =>
    ($isActive ? `2px dashed ${theme.colors.highlightLine}` : 'none')};
  border-left: none;
  border-right: none;
>>>>>>> 6b8f612 (refact : qna 관련 가독성 스타일 개선)
`;

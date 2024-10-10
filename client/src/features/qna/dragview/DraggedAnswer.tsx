import styled from 'styled-components';

interface DraggedAnswerProps {
  startText: string;
  selectedText: string;
  endText: string;
  onRemove: () => void;
}

/** DraggedAnswer 첨삭된 내용을 추적하여 재조합하여 하이라이터 효과를 부여하는
 *
 * @param startText - 첨삭된 부분 이전까지 내용
 * @param selectedText - 첨삭 내용
 * @param endText - 첨삭된 부분 이후 내용
 * @param onRemove - 첨삭 내용 취소 함수
 */
function DraggedAnswer({
  startText,
  selectedText,
  endText,
  onRemove,
}: DraggedAnswerProps) {
  const handleRemoveCorrection = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove();
  };

  return (
    <Wrapper onClick={handleRemoveCorrection}>
      {startText}
      <SeletedTextWrapper>{selectedText}</SeletedTextWrapper>
      {endText}
    </Wrapper>
  );
}

export default DraggedAnswer;

const Wrapper = styled.div``;

const SeletedTextWrapper = styled.span`
  background-color: ${(props) => props.theme.colors.highlightColor};
  opacity: 0.8;
  color: black !important;
  border-radius: 0.5rem;
`;

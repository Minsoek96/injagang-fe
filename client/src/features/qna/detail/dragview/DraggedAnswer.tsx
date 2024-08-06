import styled from 'styled-components';

interface DraggedAnswerProps {
  startText: string;
  selectedText: string;
  endText: string;
  onRemove: () => void;
}

/** 첨삭된 내용을 추적하여 재조합하여 하이라이터 효과를 부여하는 */
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

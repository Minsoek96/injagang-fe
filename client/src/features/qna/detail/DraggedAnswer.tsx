import styled from 'styled-components';

interface DraggedAnswerProps {
  startText: string;
  selectedText: string;
  endText: string;
  selectedColor: string;
  onRemove: () => void;
}

export default function DraggedAnswer({
  startText,
  selectedText,
  endText,
  selectedColor,
  onRemove,
}: DraggedAnswerProps) {
  return (
    <>
      {startText}
      <SeletedTextWrapper style={{ backgroundColor: selectedColor }} onClick={onRemove}>
        {selectedText}
      </SeletedTextWrapper>
      {endText}
    </>
  );
}

const SeletedTextWrapper = styled.span`
  color: ${(props) => props.theme.colors.text}!important;
`;

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
      <span style={{ backgroundColor: selectedColor }} onClick={onRemove}>
        {selectedText}
      </span>
      {endText}
    </>
  );
}

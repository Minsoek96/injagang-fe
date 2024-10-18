type Props = {
    onSelect: () => void;
    answer: string;
}

export default function DraggableAnswer({ answer, onSelect }:Props) {
  return (
    <div onMouseUp={onSelect}>
      <p>{answer}</p>
    </div>
  );
}

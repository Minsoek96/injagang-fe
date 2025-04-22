type Props = {
    onSelect: () => void;
    answer: string;
}
/** 드래그 첨삭 기능이 적용된 원본 텍스트
 *
 * @param answer - 원본 질문 내용
 * @param onSelect - 첨삭 적용 함수
 */
export default function DraggableAnswer({ answer, onSelect }:Props) {
  return (
    <div onMouseUp={onSelect}>
      <p>{answer}</p>
    </div>
  );
}

type Props = {
  handleSpeak: () => void;
  isRecord: boolean;
};

export function RecordMainBtn({ handleSpeak, isRecord }: Props) {
  return (
    <button type="button" className="record_btn" onClick={handleSpeak}>
      {!isRecord && "I'm ready to record"}
    </button>
  );
}

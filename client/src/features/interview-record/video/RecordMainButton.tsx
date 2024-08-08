type Props = {
  handleSpeak: () => void;
  isRecord: boolean;
};

export function RecordMainBtn({ handleSpeak, isRecord }: Props) {
  return (
    <button type="button" className="record_btn" onClick={handleSpeak}>
      {!isRecord && '면접 녹화 시작'}
    </button>
  );
}

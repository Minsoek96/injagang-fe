import { MainButton } from '@/src/shared/ui';

type Props = {
  isRecordPaused: boolean;
  handleResumeRecord: () => void;
  handlePauseRecord: () => void;
  handleEndRecord: () => void;
  changeModeScript: () => void;
};

export default function RecordActionButtons({
  isRecordPaused,
  handleEndRecord,
  handlePauseRecord,
  handleResumeRecord,
  changeModeScript,
}: Props) {
  return (
    <>
      {isRecordPaused ? (
        <MainButton
          onClick={handleResumeRecord}
          label="영상재개"
          variant="signature"
        />
      ) : (
        <MainButton
          onClick={handlePauseRecord}
          label="촬영정지"
          variant="signature"
        />
      )}
      <MainButton
        onClick={handleEndRecord}
        label="촬영완료"
        variant="signature"
      />
      <MainButton
        onClick={changeModeScript}
        label="스크립트기록"
        variant="signature"
      />
    </>
  );
}

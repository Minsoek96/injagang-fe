import { MainButton } from '@/src/shared/components';

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
        <MainButton onAction={handleResumeRecord} label="영상재개" />
      ) : (
        <MainButton onAction={handlePauseRecord} label="촬영정지" />
      )}
      <MainButton onAction={handleEndRecord} label="촬영완료" />
      <MainButton onAction={changeModeScript} label="스크립트기록" />
    </>
  );
}

import { useIntvContentStore } from '@/src/entities/interview_question';
import { CheckBox } from '@/src/shared/ui';

export default function VoiceRecordChecker() {
  const { isVoiceTranscription, toggleVoiceTranscription } = useIntvContentStore();
  return (
    <div style={{ marginBottom: '20px' }}>
      <CheckBox
        label="발음 체크"
        checked={isVoiceTranscription}
        onChange={toggleVoiceTranscription}
      />
    </div>
  );
}

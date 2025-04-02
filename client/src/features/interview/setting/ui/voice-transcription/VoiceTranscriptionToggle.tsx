import { useIntvContentStore } from '@/src/entities/interview_question';

import { useModal, useVoiceRecognition } from '@/src/shared/hooks';

import { CheckBox } from '@/src/shared/ui';

export default function VoiceRecordChecker() {
  const { voiceTranscriptionEnable, toggleVoiceTranscription } = useIntvContentStore();
  const { checkSpeechRecognitionSupport } = useVoiceRecognition();
  const { setModal } = useModal();

  const handleToggle = () => {
    if (!checkSpeechRecognitionSupport()) {
      setModal({
        title: 'Warning',
        message: '현재 브라우저에서는 \n 음성 인식 기능을 사용할 수 없습니다. \n Chrome 브라우저 사용을 권장합니다.',
      });
      return;
    }

    toggleVoiceTranscription();
  };
  return (
    <div style={{ marginBottom: '20px' }}>
      <CheckBox
        label="발음 체크"
        checked={voiceTranscriptionEnable}
        onChange={handleToggle}
      />
    </div>
  );
}

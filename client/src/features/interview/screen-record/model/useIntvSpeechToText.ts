import { useCallback, useEffect } from 'react';

import { useIntvContentStore } from '@/src/entities/interview_question';

import { useVoiceRecognition } from '@/src/shared/hooks';

/**
 * 인터뷰 음성 - 텍스트 변환 기능을 관리하는 훅
 *
 * @returns beginSpeechToText: 음성 텍스트 변환 함수
 * @returns endSpeechToText: 음성 텍스트 변환 종료 함수
 *
 */
const useIntvSpeechToText = () => {
  const voiceTranscriptionEnable = useIntvContentStore(
    (state) => state.voiceTranscriptionEnable,
  );
  const setCurVoiceScript = useIntvContentStore(
    (state) => state.setCurVoiceScript,
  );

  const { voiceText, startVoiceRecognition, stopVoiceRecognition } = useVoiceRecognition();

  useEffect(() => {
    if (!voiceTranscriptionEnable || !voiceText) return;
    setCurVoiceScript(voiceText);
  }, [voiceText, voiceTranscriptionEnable, setCurVoiceScript]);

  // 스피치 변환 시작
  const beginSpeechToText = useCallback(() => {
    if (!voiceTranscriptionEnable) return;
    startVoiceRecognition();
  }, [voiceTranscriptionEnable, startVoiceRecognition]);

  // 스피치 변환 종료
  const endSpeechToText = useCallback(() => {
    if (!voiceTranscriptionEnable) return;
    stopVoiceRecognition();
  }, [voiceTranscriptionEnable, stopVoiceRecognition]);

  return {
    beginSpeechToText,
    endSpeechToText,
  };
};

export default useIntvSpeechToText;

// useWhyDidYouRender(
//   'useInvSpeechToText',
//   { voiceText, voiceTranscriptionEnable },
//   {
//     setCurVoiceScript,
//     startVoiceRecognition,
//     stopVoiceRecognition,
//     beginSpeechToText,
//     endSpeechToText,
//   },
// );

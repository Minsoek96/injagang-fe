import {
  useCallback, useEffect, useRef, useState,
} from 'react';

import {
  SpeechRecognition,
  SpeechRecognitionErrorEvent,
  SpeechRecognitionEvent,
} from '@/src/shared/hooks/speech/SpeechType';

/**
 * 음성을 텍스트로 변환하는 훅
 *
 * @returns speechRecordStatus - 현재 음성 인식 상태 ('pending', 'record', 'pause')
 * @returns voiceText - 음성 인식 결과 텍스트
 * @returns intermediateVoiceText - 확정되지 않은 중간 음성 인식 결과
 * @returns startVoiceRecognition - 음성 인식 시작 함수
 * @returns stopVoiceRecognition - 음성 인식을 중지하는 함수
 */
const useVoiceRecognition = () => {
  const [speechRecordStatus, setSpeechRecordStatus] = useState<
    'pending' | 'record' | 'pause'
  >('pending');

  const [voiceText, setVoiceText] = useState('');
  const [intermediateVoiceText, setIntermediateVoiceText] = useState('');

  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // 음성 인식 결과 반영
  const handleResult = useCallback((event: SpeechRecognitionEvent) => {
    const results = Array.from(event.results);

    // 현재 결과 처리
    const currentResult = results[results.length - 1];
    if (!currentResult.isFinal) {
      setIntermediateVoiceText(currentResult[0].transcript);
    } else {
      setVoiceText((prev) => `${prev} ${currentResult[0].transcript}
`);
      setIntermediateVoiceText('');
    }
  }, []);

  const handleError = useCallback((event: SpeechRecognitionErrorEvent) => {
    console.error('음성 인식 오류:', event.error);
    setSpeechRecordStatus('pending');
  }, []);

  // 인식 종료 처리 함수
  const handleEnd = useCallback(() => {
    if (speechRecordStatus === 'record' && recognitionRef.current) {
      recognitionRef.current.start();
    }
  }, [speechRecordStatus]);

  // 음성 인식 시작
  const startVoiceRecognition = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setSpeechRecordStatus('record');
      } catch (err) {
        console.error('음성 인식 시작 오류:', err);
      }
    }
  }, []);

  // 음성 인식 중지
  const stopVoiceRecognition = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setSpeechRecordStatus('pending');
    }
  }, []);

  // 음성 인식 지원 여부
  const checkSpeechRecognitionSupport = useCallback(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    return !!SpeechRecognitionAPI;
  }, []);

  useEffect(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognitionAPI) {
      const recognition = new SpeechRecognitionAPI();
      recognition.lang = 'ko-KR';
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onresult = handleResult;
      recognition.onerror = handleError;
      recognition.onend = handleEnd;

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  return {
    speechRecordStatus,
    voiceText,
    intermediateVoiceText,
    startVoiceRecognition,
    stopVoiceRecognition,
    checkSpeechRecognitionSupport,
  };
};

export default useVoiceRecognition;

import { act, renderHook } from '@testing-library/react';
import { MockSpeechRecognition } from '@/fixutures/shared/types';

import useVoiceRecognition from '@/src/shared/hooks/speech/useVoiceRecognition';

const context = describe;

describe('useVoiceRecognition', () => {
  let mockSpeechRecognition: MockSpeechRecognition;

  beforeEach(() => {
    jest.clearAllMocks();
    mockSpeechRecognition = {
      lang: '',
      continuous: false,
      interimResults: false,
      maxAlternatives: 0,
      onresult: null,
      onerror: null,
      onend: null,
      start: jest.fn(),
      stop: jest
        .fn()
        .mockImplementation(function (this: MockSpeechRecognition) {
          if (this.onend) this.onend();
        }),
    };
    window.SpeechRecognition = jest
      .fn()
      .mockImplementation(() => mockSpeechRecognition);
    // 크롬 목킹
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 Chrome/134.0.0.0 Safari/537.36',
      configurable: true,
    });
  });

  context('마운트 시', () => {
    it('초기 상태는 pending, 빈 텍스트로 설정된다', () => {
      const { result } = renderHook(() => useVoiceRecognition());
      expect(result.current.speechRecordStatus).toBe('pending');
      expect(result.current.voiceText).toBe('');
      expect(result.current.intermediateVoiceText).toBe('');
    });

    it('SpeechRecognitionAPI 속성이 설정된다.', () => {
      renderHook(() => useVoiceRecognition());
      // 한국어 설정 확인
      expect(mockSpeechRecognition.lang).toBe('ko-KR');

      // 연속 인식 (말이 끊기면 종료되는 것을 방지)
      expect(mockSpeechRecognition.continuous).toBe(true);

      // 중간 결과 반환
      expect(mockSpeechRecognition.interimResults).toBe(true);
      expect(mockSpeechRecognition.maxAlternatives).toBe(1);

      // 이벤트 핸들러
      expect(mockSpeechRecognition.onresult).not.toBeNull();
      expect(mockSpeechRecognition.onerror).not.toBeNull();
      expect(mockSpeechRecognition.onend).not.toBeNull();
    });
  });

  context('음성 인식을 시작하면', () => {
    it('상태가 record로 변화한다.', () => {
      const { result } = renderHook(() => useVoiceRecognition());

      act(() => {
        result.current.startVoiceRecognition();
      });

      expect(mockSpeechRecognition.start).toHaveBeenCalled();
      expect(result.current.speechRecordStatus).toBe('record');
    });
  });

  context('음성 인식을 중단하면', () => {
    it('상태가 pending으로 변화한다.', () => {
      const { result } = renderHook(() => useVoiceRecognition());

      act(() => {
        result.current.startVoiceRecognition();
      });

      act(() => {
        result.current.stopVoiceRecognition();
      });

      expect(mockSpeechRecognition.stop).toHaveBeenCalled();
      expect(result.current.speechRecordStatus).toBe('pending');
    });

    it('최종 음석 인식 결과는 voiceText에 추가된다', () => {
      const { result } = renderHook(() => useVoiceRecognition());

      act(() => {
        result.current.startVoiceRecognition();
      });

      act(() => {
        const results = [[{ transcript: '최종 텍스트' }]];

        Object.defineProperty(results[0], 'isFinal', {
          value: true,
        });

        if (mockSpeechRecognition.onresult) {
          mockSpeechRecognition.onresult({ results });
        }
        result.current.stopVoiceRecognition();
      });

      expect(result.current.voiceText).toContain('최종 텍스트');
    });
  });

  context('브라우저가 지원에 따른', () => {
    it('Edge 브라우저에서는 checkSpeechRecognitionSupport가 false를 반환한다', () => {
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0',
        configurable: true,
      });

      const { result } = renderHook(() => useVoiceRecognition());
      expect(result.current.checkSpeechRecognitionSupport()).toBe(false);
    });

    it('SpeechRecognition이 지원되지 않는 환경에서는 checkSpeechRecognitionSupport가 false를 반환한다', () => {
      Object.defineProperty(window, 'SpeechRecognition', {
        value: undefined,
        configurable: true,
        writable: true,
      });

      const { result } = renderHook(() => useVoiceRecognition());
      expect(result.current.checkSpeechRecognitionSupport()).toBe(false);
    });
  });

  context('unmount 시', () => {
    it('음성 인식을 정리한다.', () => {
      const { unmount } = renderHook(() => useVoiceRecognition());

      unmount();

      expect(mockSpeechRecognition.stop).toHaveBeenCalled();
    });
  });
});

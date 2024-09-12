import { act, renderHook } from '@testing-library/react';

import useWebSpeech from '@/src/shared/hooks/speech/useWebSpeech';

import { MockSpeech, MockUtterance } from '@/fixutures/shared/types';

jest.useFakeTimers();

describe('useWebSpeech 훅', () => {
  let MockSpeechSynthesisUtterance: MockUtterance;
  let MockSpeechSynthesis: MockSpeech;
  beforeEach(() => {
    MockSpeechSynthesisUtterance = {
      lang: '',
      onboundary: null,
      onend: jest.fn(),
      onerror: null,
      onmark: null,
      onpause: null,
      onresume: null,
      onstart: null,
      pitch: 1,
      rate: 1,
      text: '',
      voice: null,
      volume: 1,
    };

    MockSpeechSynthesis = {
      onvoiceschanged: null,
      paused: false,
      pending: false,
      speacking: true,
      speak: jest.fn(),
    };

    window.SpeechSynthesisUtterance = jest
      .fn()
      .mockImplementation(() => MockSpeechSynthesisUtterance);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.speechSynthesis = MockSpeechSynthesis;
  });
  it('마운트 시점에 리스트가 복사된다.', () => {
    const { result } = renderHook(() => useWebSpeech(['test1', 'test2']));
    expect(result.current.speechData).toHaveLength(2);
  });

  it('스피칭을 시작하면 음성을 읽어준다.', async () => {
    const { result } = renderHook(() => useWebSpeech(['test1', 'test2']));

    await act(() => {
      result.current.readingTheScript(1);
      jest.runAllTimers();
    });
  });
});

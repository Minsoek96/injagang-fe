import { renderHook, act } from '@testing-library/react';

import { useRecordInfoStore } from '@/src/entities/interview_question';
import { useMediaRecord } from '@/src/shared/hooks';

import useInterviewRecorder from './useInterviewRecorder';

jest.mock('@/src/entities/interview_question', () => ({
  useRecordInfoStore: jest.fn(),
}));

jest.mock('@/src/shared/hooks', () => ({
  useMediaRecord: jest.fn(),
}));

describe('useInterviewRecorder 훅 테스트', () => {
  let mockSetRecordedChunks: jest.Mock;
  let mockAddRecordInfo: jest.Mock;
  let mockInitCurinfos: jest.Mock;
  let mockSetInterviewMode: jest.Mock;

  beforeEach(() => {
    mockSetRecordedChunks = jest.fn();
    mockAddRecordInfo = jest.fn();
    mockInitCurinfos = jest.fn();
    mockSetInterviewMode = jest.fn();

    (useRecordInfoStore as unknown as jest.Mock).mockReturnValue({
      setRecordedChunks: mockSetRecordedChunks,
      curScript: 'test script',
      curTimer: '00:01',
      curVoiceScript: 'voice script',
      addRecordInfo: mockAddRecordInfo,
      initCurinfos: mockInitCurinfos,
      setInterviewMode: mockSetInterviewMode,
      recordedChunks: [],
      audioDevice: { deviceId: 'audio1' },
      videoDevice: { deviceId: 'video1' },
    });

    (useMediaRecord as jest.Mock).mockReturnValue({
      videoRef: { current: null },
      handleRecord: jest.fn(),
      handlePauseRecord: jest.fn(),
      handleResumeRecord: jest.fn(),
      handleRecordRemove: jest.fn(),
      recordStatus: 'pending',
      recordedChunks: [],
    });
  });

  it('recordedChunks가 업데이트될 때 setRecordedChunks를 호출해야 한다', () => {
    const { result } = renderHook(() => useInterviewRecorder());

    act(() => {
      result.current.setInterviewMode('record');
    });

    expect(mockSetInterviewMode).toHaveBeenCalledWith('record');
  });

  it('recordStatus가 pending일 때 addRecordInfo와 initCurinfos를 호출해야 한다', () => {
    (useMediaRecord as jest.Mock).mockReturnValueOnce({
      ...useMediaRecord({}),
      recordStatus: 'pending',
    });

    renderHook(() => useInterviewRecorder());

    act(() => {});

    expect(mockAddRecordInfo).toHaveBeenCalledWith({
      timer: '00:01',
      script: 'test script',
      voiceScript: 'voice script',
    });
    expect(mockInitCurinfos).toHaveBeenCalled();
  });
});

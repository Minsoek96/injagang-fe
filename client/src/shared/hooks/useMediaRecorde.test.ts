import {
  MockHTMLVideoElement,
  MockMediaRecorder,
  MockStream,
} from '@/fixutures/shared/types';

import { useMediaRecord } from '@/src/shared/hooks/';

import { act, renderHook } from '@testing-library/react';
import React from 'react';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: jest.fn(),
}));

describe('useMediaRecored', () => {
  const context = describe;
  let mockMediaRecorder: MockMediaRecorder;
  let mockStream: MockStream;
  let videoElement: MockHTMLVideoElement;
  let mediaRecorderRef;

  beforeEach(() => {
    mockStream = {
      getAudioTracks: jest.fn().mockReturnValue([{ stop: jest.fn() }]),
      getVideoTracks: jest.fn().mockReturnValue([{ stop: jest.fn() }]),
    };

    Object.defineProperty(navigator, 'mediaDevices', {
      writable: true,
      value: {
        getUserMedia: jest.fn().mockResolvedValue(mockStream),
      },
    });

    mockMediaRecorder = {
      start: jest.fn(),
      stop: jest.fn(),
      pause: jest.fn(),
      resume: jest.fn(),
      ondataavailable: jest.fn(),
      isTypeSupported: jest.fn(() => true),
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.MediaRecorder = jest
      .fn()
      .mockImplementation(() => mockMediaRecorder);

    videoElement = {
      srcObject: null,
    };

    mediaRecorderRef = {
      current: null,
    };

    const mockedUseRef = React.useRef as jest.Mock;
    mockedUseRef
      .mockReturnValueOnce({ current: videoElement })
      .mockReturnValueOnce(mediaRecorderRef);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const startRecord = async () => {
    const { result } = renderHook(() => useMediaRecord());

    await act(async () => {
      result.current.handleRecord();
    });

    return { result };
  };

  const pauseRecord = async () => {
    const { result } = await startRecord();

    await act(async () => {
      result.current.handlePauseRecord();
    });
    return { result };
  };

  context('녹화를 시작하면', () => {
    it('유저의 권한을 요청한다.', async () => {
      await startRecord();
      expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalledWith({
        audio: true,
        video: true,
      });
    });

    it('Blob 데이터를 RecordedChunks에 추가한다.', async () => {
      const { result } = await startRecord();
      await act(async () => {
        const mockEvent = new Blob(['data'], { type: 'video/webm' });
        mockMediaRecorder.ondataavailable({ data: mockEvent });
      });

      expect(result.current.recordedChunks).toHaveLength(1);
      expect(result.current.recordedChunks[0]).toBeInstanceOf(Blob);
    });
  });

  context('녹화가 진행중인 상태라면', () => {
    it('녹화를 일시중지할 수 있다.', async () => {
      const { result } = await pauseRecord();

      expect(result.current.isPaused).toBe(true);
      expect(mockMediaRecorder.pause).toHaveBeenCalled();
    });

    it('녹화를 재개할 수 있다.', async () => {
      const { result } = await pauseRecord();
      expect(mockMediaRecorder.pause).toHaveBeenCalled();

      await act(async () => {
        result.current.handleResumeRecord();
      });

      expect(mockMediaRecorder.resume).toHaveBeenCalled();
      expect(result.current.isPaused).toBe(false);
    });
  });
});

import { renderHook, act } from '@testing-library/react';

import { MockMediaRecorder } from '@/fixutures/shared/types';
import useMediaRecord from './useMediaRecord';

// MediaStream과 MediaRecorder 모킹
const mockMediaStream = {
  getTracks: jest
    .fn()
    .mockReturnValue([{ stop: jest.fn() }, { stop: jest.fn() }]),
};

const mockMediaRecorder: MockMediaRecorder = {
  start: jest.fn(),
  stop: jest.fn(),
  pause: jest.fn(),
  resume: jest.fn(),
  ondataavailable: null,
  stream: mockMediaStream,
};

const context = describe;

describe('useMediaRecord 훅', () => {
  // navigator.mediaDevices 모킹
  const mockGetUserMedia = jest.fn();
  const mockEnumerateDevices = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // MediaRecorder 모킹 설정
    global.MediaRecorder = jest.fn().mockImplementation(() => ({
      ...mockMediaRecorder,
    })) as unknown as typeof MediaRecorder;
    global.MediaRecorder.isTypeSupported = jest.fn().mockReturnValue(true);

    // navigator.mediaDevices 모킹 설정
    Object.defineProperty(navigator, 'mediaDevices', {
      value: {
        getUserMedia: mockGetUserMedia,
        enumerateDevices: mockEnumerateDevices,
      },
      configurable: true,
    });
  });

  describe('초기 상태', () => {
    it('기본 상태로 초기화되어야 한다.', () => {
      const { result } = renderHook(() => useMediaRecord({}));

      expect(result.current.recordStatus).toBe('pending');
      expect(result.current.recordedChunks).toEqual([]);
    });
  });

  describe('장치 가져오기', () => {
    it('권한을 요청하고 장치를 가져올 수 있어야 한다.', async () => {
      const mockDevices = [
        { kind: 'audioinput', deviceId: 'audio1' },
        { kind: 'videoinput', deviceId: 'video1' },
      ];
      mockEnumerateDevices.mockResolvedValue(mockDevices);

      const { result } = renderHook(() => useMediaRecord({}));
      const devices = await result.current.getDevices();

      expect(mockGetUserMedia).toHaveBeenCalled();
      expect(devices.audioDevices).toHaveLength(1);
      expect(devices.videoDevices).toHaveLength(1);
    });
  });

  describe('미디어 접근', () => {
    context('정상적인 경우', () => {
      it('사용자의 미디어 접근 요청을 처리할 수 있어야 한다.', async () => {
        mockGetUserMedia.mockResolvedValue(mockMediaStream);

        const onError = jest.fn();
        const { result } = renderHook(() => useMediaRecord({ onError }));

        await act(async () => {
          await result.current.handleRecord();
        });

        expect(mockGetUserMedia).toHaveBeenCalledWith({
          video: true,
          audio: true,
        });
        expect(result.current.recordStatus).toBe('record');
      });
    });

    context('오류가 발생한 경우', () => {
      it('미디어 접근 권한 요청 중 오류를 처리할 수 있어야 한다.', async () => {
        mockGetUserMedia.mockRejectedValue(new Error('장치 에러'));

        const onError = jest.fn();
        const { result } = renderHook(() => useMediaRecord({ onError }));

        await act(async () => {
          await result.current.handleRecord();
        });

        expect(onError).toHaveBeenCalled();
      });
    });
  });

  describe('녹화 조작', () => {
    beforeEach(() => {
      mockGetUserMedia.mockResolvedValue(mockMediaStream);
    });

    it('녹화를 일시정지 및 재개할 수 있어야 한다.', async () => {
      const { result } = renderHook(() => useMediaRecord({}));

      await act(async () => {
        await result.current.handleRecord();
      });

      await act(() => {
        result.current.handlePauseRecord();
      });

      expect(result.current.recordStatus).toBe('pause');
      expect(mockMediaRecorder.pause).toHaveBeenCalled();

      await act(() => {
        result.current.handleResumeRecord();
      });

      expect(result.current.recordStatus).toBe('record');
      expect(mockMediaRecorder.resume).toHaveBeenCalled();
    });

    it('녹화를 종료할 수 있어야 한다.', async () => {
      const { result } = renderHook(() => useMediaRecord({}));

      await act(async () => {
        await result.current.handleRecord();
      });

      await act(() => {
        result.current.handleRecordRemove();
      });

      expect(result.current.recordStatus).toBe('end');
      expect(mockMediaRecorder.stop).toHaveBeenCalled();
    });
  });

  context('렌더링 종료시', () => {
    it('녹화 자원이 정리되어야 한다.', async () => {
      mockGetUserMedia.mockResolvedValue(mockMediaStream);

      const { result, unmount } = renderHook(() => useMediaRecord({}));

      await act(async () => {
        await result.current.handleRecord();
      });

      unmount();

      expect(mockMediaStream.getTracks).toHaveBeenCalled();
      mockMediaStream.getTracks().forEach((track: MediaStreamTrack) => {
        expect(track.stop).toHaveBeenCalled();
      });
    });
  });
});

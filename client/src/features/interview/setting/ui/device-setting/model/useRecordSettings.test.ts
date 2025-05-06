import { act, renderHook } from '@testing-library/react';

import { useMediaRecord, useModal } from '@/src/shared/hooks';

import useRecordSettings from './useRecordSettings';

jest.mock('@/src/shared/hooks');

describe('useRecordSettings', () => {
  const mockSetModal = jest.fn();
  const mockHandleRecord = jest.fn();
  const mockGetDevices = jest.fn().mockResolvedValue({
    audioDevices: [{ deviceId: 'audio1', label: 'Microphone 1' }],
    videoDevices: [{ deviceId: 'video1', label: 'Camera 1' }],
  });

  beforeEach(() => {
    (useModal as unknown as jest.Mock).mockReturnValue({
      setModal: mockSetModal,
    });

    (useMediaRecord as jest.Mock).mockReturnValue({
      videoRef: { current: null },
      handleRecord: mockHandleRecord,
      getDevices: mockGetDevices,
    });

    Object.defineProperty(navigator, 'mediaDevices', {
      value: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
      writable: true,
    });
  });

  it('초기 상태를 설정한다', () => {
    const { result } = renderHook(() => useRecordSettings());

    expect(result.current.audioLabels).toEqual([]);
    expect(result.current.videoLabels).toEqual([]);
    expect(result.current.audioDevice).toBeNull();
    expect(result.current.videoDevice).toBeNull();
  });

  it('초기 디바이스 목록이 설정된다', async () => {
    const { result } = renderHook(() => useRecordSettings());

    await act(async () => {
      // 내부에서 FetchSettingDevices 실행
    });

    expect(mockGetDevices).toHaveBeenCalled();
    expect(result.current.audioLabels).toEqual([{ deviceId: 'audio1', label: 'Microphone 1' }]);
    expect(result.current.videoLabels).toEqual([{ deviceId: 'video1', label: 'Camera 1' }]);
  });

  it('디바이스 변경 이벤트가 발생하면 FetchSettingDevices가 실행된다', () => {
    const addEventListenerMock = jest.spyOn(navigator.mediaDevices, 'addEventListener');
    const removeEventListenerMock = jest.spyOn(navigator.mediaDevices, 'removeEventListener');

    const { unmount } = renderHook(() => useRecordSettings());

    expect(addEventListenerMock).toHaveBeenCalledWith('devicechange', expect.any(Function));

    unmount();

    expect(removeEventListenerMock).toHaveBeenCalledWith('devicechange', expect.any(Function));
  });
});

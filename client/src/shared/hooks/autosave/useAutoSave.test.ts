import { act, renderHook } from '@testing-library/react';

import useAutoSave from '@/src/shared/hooks/autosave/useAutoSave';
import useModal from '@/src/shared/hooks/modal/useModal';

jest.mock('@/src/shared/hooks/modal/useModal');

const context = describe;
describe('useAutoSave', () => {
  const mockSetModal = jest.fn();
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    (useModal as jest.Mock).mockReturnValue({
      setModal: mockSetModal,
    });
  });

  context('기본 값', () => {
    it('복구 옵션 상태가 false 이다.', () => {
      const { result } = renderHook(() => useAutoSave(false, jest.fn()));
      expect(result.current.shouldRestoreDraft).toBe(false);
    });

    it('5초마다 저장함수를 실행한다.', () => {
      const mockSave = jest.fn();
      renderHook(() => useAutoSave(false, mockSave));

      // 첫 번째 인터벌
      act(() => {
        jest.advanceTimersByTime(5000);
      });
      expect(mockSave).toHaveBeenCalledTimes(1);

      // 두 번째 인턴벌
      act(() => {
        jest.advanceTimersByTime(5000);
      });
      expect(mockSave).toHaveBeenCalledTimes(2);
    });
  });

  context('hasDraft값이 true인 경우', () => {
    it('데이터 복구 모달을 렌더링한다.', () => {
      const mockSave = jest.fn();
      renderHook(() => useAutoSave(true, mockSave));
      expect(mockSetModal).toHaveBeenCalledWith({
        title: '내용 복구',
        message: '저장되지 않은 이전 작성 내용이 있습니다.\n복구하시겠습니까?',
        onAction: expect.any(Function),
      });
    });

    it('모달 onAction이 호출되면 데이터 복구옵션이 true가 된다', () => {
      const { result } = renderHook(() => useAutoSave(true, jest.fn()));
      const mockCalls = mockSetModal.mock.calls[0][0];

      expect(result.current.shouldRestoreDraft).toBe(false);

      act(() => {
        mockCalls.onAction();
      });
      expect(result.current.shouldRestoreDraft).toBe(true);
    });
  });

  context('hasDraft값이 false인 경우', () => {
    it('데이터 복구 모달을 렌더링 하지 않는다.', () => {
      const mockSave = jest.fn();
      renderHook(() => useAutoSave(false, mockSave));
      expect(mockSetModal).not.toHaveBeenCalled();
    });
  });
});

import {
  renderHook, act,
} from '@testing-library/react';

import useToast from './useToast';

const uniqueId = 'unique-id';
// uuid 함수를 모킹
jest.mock('uuid', () => ({
  v4: jest.fn(() => uniqueId),
}));

describe('useToast 훅', () => {
  describe('showToast 함수', () => {
    it('기본 값으로 토스트를 추가해야 한다', () => {
      const { result } = renderHook(() => useToast());

      act(() => {
        result.current.showToast();
      });

      const { toastList } = result.current;

      const expectedToast = {
        id: uniqueId,
        mode: 'Info',
        message: '',
        duration: 3000,
        startTime: expect.any(Number),
      };

      expect(toastList).toHaveLength(1);
      expect(toastList[0]).toMatchObject(expectedToast);
    });

    it('지정된 값으로 토스트를 추가해야 한다', () => {
      const { result } = renderHook(() => useToast(5000));

      act(() => {
        result.current.showToast('Success', 'Toast message');
      });

      const { toastList } = result.current;
      const expectedToast = {
        id: uniqueId,
        mode: 'Success',
        message: 'Toast message',
        duration: 5000,
        startTime: expect.any(Number),
      };

      expect(toastList).toHaveLength(1);
      expect(toastList[0]).toMatchObject(expectedToast);
    });

    it('지정된 시간이 지나면 토스트를 제거해야 한다', () => {
      jest.useFakeTimers();
      const { result } = renderHook(() => useToast(1000));

      act(() => {
        result.current.showToast('Error', 'Error message');
      });

      const { toastList } = result.current;

      expect(toastList).toHaveLength(1);

      act(() => {
        jest.runAllTimers();
      });

      const { toastList: updatedToastList } = result.current;

      expect(updatedToastList).toHaveLength(0);
    });
  });
});

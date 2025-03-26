import { act, renderHook } from '@testing-library/react';

import useModal from '@/src/shared/hooks/modal/useModal';

import { sampleModal } from '@/fixutures/shared';
import { useModalState } from '@/src/shared/store';

describe('useModal', () => {
  const context = describe;

  /** 기본 모달 셋팅 */
  const renderSetModal = () => {
    const { result } = renderHook(() => useModal());
    act(() =>
      result.current.setModal(sampleModal));

    return { result };
  };

  context('모달 상태 관리', () => {
    it('isModalOpen의 초기값은 false이다.', () => {
      const { result } = renderHook(() => useModalState());
      expect(result.current.isModalOpen).toBe(false);
    });
  });

  context('setModal이 호출 되면', () => {
    it('isModalOpen의 상태는 true로 변한다.', () => {
      const { result } = renderHook(() => useModalState());
      expect(result.current.isModalOpen).toBe(false);
    });
  });

  context('closeModal이 호출 되면', () => {
    it('isModalOpen의 상태는 false가 된다', () => {
      const { current } = renderSetModal().result;

      act(() => current.closeModal());

      const { result } = renderHook(() => useModalState());
      expect(result.current.isModalOpen).toBe(false);
    });
  });
});

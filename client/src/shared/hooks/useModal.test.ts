import { sampleModal } from '@/fixutures/shared';

import useModal from '@/src/shared/hooks/useModal';

import { act, renderHook } from '@testing-library/react';

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
      const { result } = renderHook(() => useModal());
      expect(result.current.isModalOpen).toBe(false);
    });
  });

  context('setModal이 호출 되면', () => {
    it('isModalOpen의 상태는 true로 변한다.', () => {
      const { result } = renderSetModal();

      expect(result.current.isModalOpen).toBe(true);
    });
  });

  context('closeModal이 호출 되면', () => {
    it('isModalOpen의 상태는 false가 된다', () => {
      const { result } = renderSetModal();

      act(() => result.current.closeModal());

      expect(result.current.isModalOpen).toBe(false);
    });
  });
});

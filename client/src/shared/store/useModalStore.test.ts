import { act } from '@testing-library/react';
import { modalType } from '@/src/shared/types';
import useModalStore from './useModalStore';

describe('useModalStore 훅', () => {
  describe('모달 상태 관리', () => {
    const context = describe;

    context('모달을 열 때', () => {
      it('모달 상태를 열림으로 설정하고 주어진 속성을 저장해야 한다', () => {
        const modalProps: modalType.ModalProps = {
          contents: {
            title: '테스트 제목',
            message: '테스트 메시지',
          },
        };

        act(() => {
          useModalStore.getState().setModal(modalProps);
        });

        const { isModalOpen, modalState } = useModalStore.getState();

        expect(isModalOpen).toBe(true);
        expect(modalState).toEqual(modalProps);
      });
    });

    context('모달을 닫을 때', () => {
      it('모달 상태를 닫힘으로 설정해야 한다', () => {
        act(() => {
          useModalStore.getState().closeModal();
        });

        const { isModalOpen } = useModalStore.getState();

        expect(isModalOpen).toBe(false);
      });
    });
  });
});

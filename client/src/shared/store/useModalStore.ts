import { create } from 'zustand';

import { useShallow } from 'zustand/react/shallow';
import { modalType } from '@/src/shared/types';

type State = {
    isModalOpen : boolean;
    modalState : modalType.ModalProps;
}

type Action = {
    setModal: (props: modalType.ModalProps) => void;
    closeModal : () => void;
}

const initialState: State = {
  isModalOpen: false,
  modalState: {
    title: '',
    message: '',
  },
};

const useModalStore = create<State&Action>((set) => ({
  ...initialState,

  setModal: (props: modalType.ModalProps) => set({
    isModalOpen: true,
    modalState: props,
  }),

  closeModal: () => set({
    isModalOpen: false,
  }),
}));

export const useModalAction = () => useModalStore(
  useShallow((state) => ({
    setModal: state.setModal,
    closeModal: state.closeModal,
  })),
);

export const useModalState = () => useModalStore(useShallow((state) => ({
  isModalOpen: state.isModalOpen,
  modalState: state.modalState,
})));

export default useModalStore;

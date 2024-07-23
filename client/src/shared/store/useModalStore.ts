import { modalType } from '@/src/shared/types';
import { create } from 'zustand';

type State = {
    isModalOpen : boolean;
    modalState : modalType.ModalProps;
}

type Action = {
    setModal: (props: modalType.ModalProps) => void;
    closeModal : () => void;
}

const useModalStore = create<State&Action>((set) => ({
  isModalOpen: false,
  modalState: {
    contents: {
      title: '',
      message: '',
    },
  },

  setModal: (props: modalType.ModalProps) => set({
    isModalOpen: true,
    modalState: props,
  }),

  closeModal: () => set({
    isModalOpen: false,
  }),
}));

export default useModalStore;

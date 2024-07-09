import { ModalProps } from '@/types/modal/ModalType';
import { create } from 'zustand';

type State = {
    isModalOpen : boolean;
    modalState : ModalProps;
}

type Action = {
    setModal: (props: ModalProps) => void;
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

  setModal: (props: ModalProps) => set({
    isModalOpen: true,
    modalState: props,
  }),

  closeModal: () => set({
    isModalOpen: false,
  }),
}));

export default useModalStore;

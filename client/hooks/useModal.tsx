import useModalStore from '@/store/modal/useModalStore';

const useModal = () => {
  const { isModalOpen, setModal, closeModal } = useModalStore();

  return {
    isModalOpen,
    setModal,
    closeModal,
  };
};

export default useModal;

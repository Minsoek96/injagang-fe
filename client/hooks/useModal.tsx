import useModalStore from '@/src/shared/store/useModalStore';

const useModal = () => {
  const { isModalOpen, setModal, closeModal } = useModalStore();

  return {
    isModalOpen,
    setModal,
    closeModal,
  };
};

export default useModal;

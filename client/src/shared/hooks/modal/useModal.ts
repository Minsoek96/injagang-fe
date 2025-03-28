import useModalStore from '@/src/shared/store/useModalStore';

import { useShallow } from 'zustand/react/shallow';

// TODO : useModal 정리 하기 현재 제거시 관련 테스트 코드 26개, lint 오류 25개
// 하나씩 바꾸기
const useModal = () => {
  const { setModal, closeModal } = useModalStore(useShallow((state) => ({
    setModal: state.setModal,
    closeModal: state.closeModal,
  })));

  return {
    setModal,
    closeModal,
  };
};

export default useModal;

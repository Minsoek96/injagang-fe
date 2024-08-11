import { useModalStore } from '@/src/shared/store';

import { styled } from 'styled-components';

import { MainButton } from '@/src/shared/components/button';

const MODAL_CLOSE_DELAY = 50;

export default function RenderModal() {
  const { isModalOpen, modalState, closeModal } = useModalStore();

  const { contents } = modalState;

  const actionModal = () => {
    if (!modalState.onAction) return;
    closeModal();
    setTimeout(() => {
      modalState.onAction?.();
    }, MODAL_CLOSE_DELAY);
  };

  if (!isModalOpen || !modalState) {
    return null;
  }

  return (
    <ModalStyle $isOpen={isModalOpen}>
      <ModalBox>
        <div className="modal_Contents">
          <h2>{contents.title}</h2>
          <p>{contents.message}</p>
        </div>
        {modalState.onAction ? (
          <div className="modal_Controller">
            <MainButton
              label="예"
              onAction={actionModal}
              sx={{ width: '150px', fontSize: '15px' }}
            />
            <MainButton
              label="아니요"
              onAction={closeModal}
              sx={{ width: '150px', fontSize: '15px' }}
            />
          </div>
        ) : (
          <div className="modal_center_btn">
            <MainButton
              label="확인"
              onAction={closeModal}
              sx={{ width: '150px', fontSize: '15px' }}
            />
          </div>
        )}
      </ModalBox>
    </ModalStyle>
  );
}

interface ModalStyleProps {
  $isOpen: boolean;
}

const ModalStyle = styled.div<ModalStyleProps>`
  font-size: 1.8rem;
  z-index: 1000;
  display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 100dvh;
  width: 100dvw;
  background-color: rgba(36, 31, 31, 0.5);
`;

const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 25rem;
  width: 50rem;
  border-radius: 1.5rem;
  background-color: #0a0a0aee;
  .modal_Contents {
    display: flex;
    flex-direction: column;
    height: 20rem;
    word-break: keep-all;
  }
  .modal_Contents h2 {
    color: red;
    margin: 2rem;
  }
  .modal_Contents p {
    margin-top: 2rem;
    text-align: center;
    color: #e6dfdf;
  }
  .modal_Controller {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0.5em;
  }
  .modal_center_btn {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 0.5em;
  }
`;

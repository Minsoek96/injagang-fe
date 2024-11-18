import { useModalStore } from '@/src/shared/store';

import { styled } from 'styled-components';

import { MainButton } from '@/src/shared/ui';
import { styleMixin, V } from '@/src/shared/styles';

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

const MODAL_CLOSE_DELAY = 50;

export default function RenderModal() {
  const { isModalOpen, modalState, closeModal } = useModalStore();
  const { title, message } = modalState;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  const modalRoot = document.getElementById('modal-root') || document.body;

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

  return createPortal(
    <ModalStyle>
      <ModalBox>
        <div className="modal_Contents">
          <h2>{title}</h2>
          <p>{message}</p>
        </div>
        {modalState.onAction ? (
          <div className="modal_Controller">
            <MainButton
              label="예"
              onClick={actionModal}
              sx={{ width: '150px', fontSize: '15px' }}
            />
            <MainButton
              label="아니요"
              onClick={closeModal}
              sx={{ width: '150px', fontSize: '15px' }}
            />
          </div>
        ) : (
          <div className="modal_center_btn">
            <MainButton
              label="확인"
              onClick={closeModal}
              sx={{ width: '150px', fontSize: '15px' }}
            />
          </div>
        )}
      </ModalBox>
    </ModalStyle>,
    modalRoot,
  );
}

const ModalStyle = styled.div`
  ${styleMixin.Flex()}
  font-size: 1.8rem;
  position: fixed;
  top: 0;
  left: 0;
  height: 100dvh;
  width: 100dvw;
  background-color: rgba(36, 31, 31, 0.5);
  z-index: 1000;
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
    white-space: pre-line;
    line-height: 1.4;
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

  @media screen and (max-width: ${V.mediaMobile}){
    width: 30rem;
    font-size: 1.6rem;
  }
`;

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { styled } from 'styled-components';
import { BiMessageError } from 'react-icons/bi';

import { useModalStore } from '@/src/shared/store';
import { MainButton } from '@/src/shared/ui';
import { slideUp, styleMixin, V } from '@/src/shared/styles';

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
    <Overlay onClick={closeModal}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Title>
            <BiMessageError />
            {title}
          </Title>
        </ModalHeader>
        <Content>
          <Message>{message}</Message>
          {modalState.onAction ? (
            <ButtonGroup>
              <MainButton
                label="예"
                onClick={actionModal}
                sx={{ width: '15rem', fontSize: '1.5rem' }}
              />
              <MainButton
                label="아니요"
                onClick={closeModal}
                sx={{ width: '15rem', fontSize: '1.5rem' }}
              />
            </ButtonGroup>
          ) : (
            <SingleButtonWrapper>
              <MainButton
                label="확인"
                onClick={closeModal}
                sx={{ width: '15rem', fontSize: '1.5rem' }}
              />
            </SingleButtonWrapper>
          )}
        </Content>
      </ModalContainer>
    </Overlay>,
    modalRoot,
  );
}

const Overlay = styled.div`
  ${styleMixin.Flex()}
  font-size: 1.8rem;
  position: fixed;
  top: 0;
  left: 0;
  height: 100dvh;
  width: 100dvw;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 1000;
`;

const ModalContainer = styled.div`
  ${styleMixin.Column('', '')}
  width: 50rem;
  min-height: 25rem;
  border-radius: 1.6rem;
  background-color: ${(props) => props.theme.colors.modalBody};
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  animation: ${slideUp} 0.3s ease-out;

  @media screen and (max-width: ${V.mediaMobile}) {
    width: calc(100vw - 4rem);
    min-height: 22rem;
  }
`;

const ModalHeader = styled.header`
  ${styleMixin.Column()}
  position: relative;
  height: 6rem;
  padding: 0 2.4rem;
  background-color: ${(props) => props.theme.colors.signatureColor};
  border-bottom: 1px solid ${(props) => props.theme.colors.highlight};

  svg {
    position: relative;
    font-size: 2.5rem;
    top: 5px;
  }
`;

const Title = styled.h2`
  color: #333333;
  font-size: 2rem;
  font-weight: 600;
  word-break: keep-all;
  text-align: center;
`;

const Content = styled.div`
  flex: 1;
  ${styleMixin.Column('space-between', '')}
  padding: 2.4rem;
`;

const Message = styled.p`
  text-align: center;
  color: #333333;
  line-height: 1.6;
  white-space: pre-line;
  margin-bottom: 3rem;
  font-size: 1.8rem;

  @media screen and (max-width: ${V.mediaMobile}) {
    font-size: 1.6rem;
  }
`;

const ButtonGroup = styled.div`
  ${styleMixin.Flex()}
  gap: 1.2rem;
  padding-top: 1rem;
`;

const SingleButtonWrapper = styled.div`
  ${styleMixin.Flex()}
  padding-top: 1rem;
`;

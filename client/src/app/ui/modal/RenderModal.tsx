import { styled } from 'styled-components';

import { BiMessageError } from 'react-icons/bi';

import { MainButton, Modal } from '@/src/shared/ui';
import { styleMixin, V } from '@/src/shared/styles';
import { useModalAction, useModalState } from '@/src/shared/store';

const MODAL_CLOSE_DELAY = 50;

export default function RenderModal() {
  const { closeModal } = useModalAction();
  const { modalState, isModalOpen } = useModalState();

  if (!modalState) {
    return null;
  }

  const { title, message } = modalState;

  const handleAction = () => {
    if (!modalState.onAction) return;
    closeModal();
    setTimeout(() => {
      modalState.onAction?.();
    }, MODAL_CLOSE_DELAY);
  };
  return (
    <Modal isOpen={!!modalState && isModalOpen} onClose={closeModal}>
      <Modal.Header>
        <Title>
          <IconWrapper>
            <BiMessageError />
          </IconWrapper>
          {title}
        </Title>
      </Modal.Header>

      <Modal.Content>
        <Message>{message}</Message>

        {modalState.onAction ? (
          <Modal.Actions>
            <MainButton
              label="예"
              onClick={handleAction}
              sx={{ width: '15rem', fontSize: '1.5rem' }}
            />
            <MainButton
              label="아니요"
              onClick={closeModal}
              sx={{ width: '15rem', fontSize: '1.5rem' }}
            />
          </Modal.Actions>
        ) : (
          <SingleButtonWrapper>
            <MainButton
              label="확인"
              onClick={closeModal}
              sx={{ width: '15rem', fontSize: '1.5rem' }}
            />
          </SingleButtonWrapper>
        )}
      </Modal.Content>
    </Modal>
  );
}

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 2.5rem;
  margin-right: 0.8rem;
  position: relative;
  top: -1px;
`;

const Title = styled.h2`
  ${styleMixin.Flex()}
  color: ${(props) => props.theme.colors.signatureText};
  font-size: 2rem;
  font-weight: 600;
  word-break: keep-all;
  text-align: center;
`;

const Message = styled.p`
  text-align: center;
  color: #333333;
  line-height: 1.6;
  white-space: pre-line;
  margin-bottom: 3rem;
  font-size: 2rem;
  font-weight: 500;

  @media screen and (max-width: ${V.mediaMobile}) {
    font-size: 1.6rem;
  }
`;

const SingleButtonWrapper = styled.div`
  ${styleMixin.Flex()}
  padding-top: 1rem;
`;

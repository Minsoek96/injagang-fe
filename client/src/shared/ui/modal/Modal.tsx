import React, {
  useEffect,
  useState,
  createContext,
  useMemo,
  useContext,
} from 'react';

import { createPortal } from 'react-dom';

import { styled } from 'styled-components';

import { slideUp, styleMixin, V } from '@/src/shared/styles';

interface ModalContextType {
  onClose: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a Modal component');
  }
  return context;
}

type ChildProps = {
  children: React.ReactNode;
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

/**
 * 모달 컴포넌트 시스템
 * 일관된 모달 UI를 제공하는 컴파운드 컴포넌트 패턴 구현
 *
 * @param: isOpen - 모달 오픈 여부
 * @param: onClose - 모달 닫기
 *
 * @subcomponent Modal.Header - 모달 헤더
 * @subcomponent Modal.Content - 모달 내용
 * @subcomponent Modal.Actions - 모달 액션
 */
function Modal({ isOpen, onClose, children }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  const contextValue = useMemo(
    () => ({
      onClose,
    }),
    [onClose],
  );

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  const modalRoot = document.getElementById('modal-root') || document.body;

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <ModalContext.Provider value={contextValue}>
      <Overlay data-testid="modal-overlay" onClick={onClose}>
        <ModalContainer role="dialog" onClick={(e) => e.stopPropagation()}>
          {children}
        </ModalContainer>
      </Overlay>
    </ModalContext.Provider>,
    modalRoot,
  );
}

/** 모달 상단 스타일 */
function ModalHeader({ children, ...props }: ChildProps) {
  return <ModalHeaderContainer {...props}>{children}</ModalHeaderContainer>;
}

/** 모달 내용 스타일 */
function ModalContent({ children, ...props }: ChildProps) {
  return <ModalContentContainer {...props}>{children}</ModalContentContainer>;
}

/** 모달 하단 스타일 */
function ModalActions({ children, ...props }: ChildProps) {
  return <ModalActionsContainer {...props}>{children}</ModalActionsContainer>;
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

const ModalHeaderContainer = styled.header`
  ${styleMixin.Column()}
  position: relative;
  height: 6rem;
  padding: 0 2.4rem;
  background-color: ${(props) => props.theme.colors.signatureColor};
  border-bottom: 1px solid ${(props) => props.theme.colors.highlightLine};
`;

const ModalContentContainer = styled.div`
  flex: 1;
  ${styleMixin.Column('space-between', '')}
  padding: 2.4rem;
`;

const ModalActionsContainer = styled.div`
  ${styleMixin.Flex()}
  gap: 1.2rem;
  padding-top: 1rem;
`;

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Actions = ModalActions;

export default Modal;

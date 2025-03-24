import TestProvider from '@/fixutures/TestProvider';
import Modal, { useModal } from '@/src/shared/ui/modal/Modal';

import {
  fireEvent, render, screen,
} from '@testing-library/react';

const context = describe;

function CloseButton() {
  const { onClose } = useModal();
  return <button type="button" onClick={onClose}>X</button>;
}

describe('Modal', () => {
  const mockOnClose = jest.fn();
  const mockTitle = 'Mock Title';
  const mockContent = 'Mock Content';

  const renderComponent = (isOpen = true) => {
    render(
      <TestProvider>
        <Modal isOpen={isOpen} onClose={mockOnClose}>
          <Modal.Header>
            <h2>{mockTitle}</h2>
            <CloseButton />
          </Modal.Header>
          <Modal.Content>
            <p>{mockContent}</p>
          </Modal.Content>
          <Modal.Actions>
            <button type="button">확인</button>
          </Modal.Actions>
        </Modal>
      </TestProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('모달이 렌더링될 때', () => {
    it('isOpen이 true이면 모달이 화면에 표시된다', () => {
      renderComponent();
      expect(screen.getByText(mockTitle)).toBeInTheDocument();
      expect(screen.getByText(mockContent)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '확인' })).toBeInTheDocument();
    });

    it('isOpen이 false이면 모달이 화면에 출력되지 않는다.', () => {
      renderComponent(false);
      expect(screen.queryByText(mockTitle)).not.toBeInTheDocument();
      expect(screen.queryByText(mockContent)).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: '확인' })).not.toBeInTheDocument();
    });
  });

  context('사용자가 모달과 상호작용할 때', () => {
    it('오버레이를 클릭하면 onClose가 호출된다', () => {
      renderComponent();
      const overlay = screen.getByTestId('modal-overlay');
      fireEvent.click(overlay);

      expect(mockOnClose).toHaveBeenCalled();
    });

    it('콘텐츠를 클릭해도 onClose가 호출되지 않는다.', () => {
      renderComponent();
      const container = screen.getByRole('dialog');
      fireEvent.click(container);

      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  context('useModal을 사용하는 컴포넌트와 상호작용할 때', () => {
    it('모달의 자식으로 존재할 경우 onClose가 동작한다.', async () => {
      renderComponent();
      const closeButton = screen.getByRole('button', { name: 'X' });
      fireEvent.click(closeButton);

      expect(mockOnClose).toHaveBeenCalled();
    });

    it('모달을 벗어나면 onClose는 동작하지 않는다', () => {
      expect(() => {
        render(
          <CloseButton />,
        );
      }).toThrow('useModal must be used within a Modal component');
    });
  });
});

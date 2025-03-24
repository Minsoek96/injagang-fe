import { act } from 'react-dom/test-utils';
import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/react';
import TestProvider from '@/fixutures/TestProvider';

import { useModalStore } from '@/src/shared/store';

import RenderModal from './RenderModal';

const context = describe;
describe('RenderModal', () => {
  const mockTitle = 'Mock Test';
  const mockMessage = 'Mock Message';
  const mockAction = jest.fn();
  const renderComponent = () => {
    render(
      <TestProvider>
        <RenderModal />
      </TestProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('useModalStore에 새로운 상태가 등록되면', () => {
    it('모달에 내용이 출력된다.', () => {
      renderComponent();
      const { result } = renderHook(() => useModalStore());
      act(() => {
        result.current.setModal({ title: mockTitle, message: mockMessage });
      });

      expect(screen.getByText(mockTitle)).toBeInTheDocument();
      expect(screen.getByText(mockMessage)).toBeInTheDocument();
    });
  });

  context('useModalStore에 등록된 액션이 등록되면', () => {
    it('액션 수행 버튼이 출력된다.', () => {
      renderComponent();
      const { result } = renderHook(() => useModalStore());
      act(() => {
        result.current.setModal({
          title: mockTitle,
          message: mockMessage,
          onAction: mockAction,
        });
      });

      expect(screen.getByRole('button', { name: '예' })).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: '아니요' }),
      ).toBeInTheDocument();
    });
  });

  context('사용자가 버튼을 클릭하면', () => {
    it('액션 수행 버튼일 경우 액션을 호출한다.', () => {
      jest.useFakeTimers();
      renderComponent();
      const { result } = renderHook(() => useModalStore());
      act(() => {
        result.current.setModal({
          title: mockTitle,
          message: mockMessage,
          onAction: mockAction,
        });
      });

      const actionButton = screen.getByRole('button', { name: '예' });
      fireEvent.click(actionButton);
      jest.runAllTimers();
      expect(mockAction).toHaveBeenCalled();
    });

    it('거절 버튼일 경우 모달이 사라진다.', async () => {
      renderComponent();
      const { result } = renderHook(() => useModalStore());
      act(() => {
        result.current.setModal({
          title: mockTitle,
          message: mockMessage,
          onAction: mockAction,
        });
      });
      expect(result.current.isModalOpen).toBe(true);
      const rejectedButton = screen.getByRole('button', { name: '아니요' });
      fireEvent.click(rejectedButton);
      expect(result.current.isModalOpen).toBe(false);

      await waitFor(() => {
        expect(screen.queryByText(mockTitle)).not.toBeInTheDocument();
        expect(screen.queryByText(mockMessage)).not.toBeInTheDocument();
      });
    });
  });
});

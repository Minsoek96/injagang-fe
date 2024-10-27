import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import TestProvider from '@/fixutures/TestProvider';
import FeedBackItems from '@/src/features/qna/feedback/TargetFeedBackItems';
import { useModal } from '@/src/shared/hooks';

jest.mock('@/src/shared/hooks', () => ({
  useModal: jest.fn(),
}));

const context = describe;
describe('TargetFeedBackItems', () => {
  const mockTarget = 'Test-Target';
  const mockContent = 'Test-Content';
  const mockFeedbackId = 10001;
  const mockUpdateFeedback = jest.fn();
  const mockDeleteFeedback = jest.fn();
  const mockSetModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useModal as jest.Mock).mockReturnValue({ setModal: mockSetModal });
  });

  // 모달의 액션을 실행하는 함수
  const modalOnAction = () => {
    const { onAction } = mockSetModal.mock.calls[0][0];
    onAction();
  };

  const renderComponent = (isOwner = false) => {
    render(
      <TestProvider>
        <FeedBackItems
          target={mockTarget}
          content={mockContent}
          feedbackId={mockFeedbackId}
          handleUpdateFeedBack={mockUpdateFeedback}
          handleDeleteFeedBack={mockDeleteFeedback}
          owner={isOwner}
        />
      </TestProvider>,
    );
  };

  context('소유주에 관계없는 상황', () => {
    it('피드백 내용이 렌더링된다.', () => {
      renderComponent();
      expect(screen.getByText(mockTarget)).toBeInTheDocument();
      expect(screen.getByText(mockContent)).toBeInTheDocument();
    });
  });

  context('피드백의 소유자라면', () => {
    beforeEach(() => renderComponent(true));

    it('편집과 삭제 버튼이 렌더링된다.', () => {
      expect(screen.getByRole('button', { name: '편집' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '삭제' })).toBeInTheDocument();
    });

    context('편집 버튼을 클릭하면', () => {
      it('수정 모드에 진입한다.', async () => {
        fireEvent.click(screen.getByRole('button', { name: '편집' }));
        modalOnAction();
        await waitFor(() => {
          expect(screen.getByRole('button', { name: '수정완료' })).toBeInTheDocument();
        });
      });

      it('피드백을 수정하면 update가 호출된다.', async () => {
        fireEvent.click(screen.getByRole('button', { name: '편집' }));
        modalOnAction();
        await waitFor(() => {
          const feedbackInput = screen.getByPlaceholderText(/피드백을 입력/);
          fireEvent.input(feedbackInput, { target: { value: 'Change-Content' } });
        });
        fireEvent.click(screen.getByRole('button', { name: '수정완료' }));
        expect(mockUpdateFeedback).toHaveBeenCalled();
      });
    });

    context('삭제 버튼을 클릭하면', () => {
      it('삭제 모드에 진입한다.', async () => {
        fireEvent.click(screen.getByRole('button', { name: '삭제' }));
        modalOnAction();

        await waitFor(() => {
          expect(mockDeleteFeedback).toHaveBeenCalledWith(mockFeedbackId);
        });
      });
    });
  });
});

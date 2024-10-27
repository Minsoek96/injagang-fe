import { act, renderHook } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';

import { useDetailMenu } from '@/src/features/qna/detail/model/useDetailMenu';

import { useModal, usePageRouter } from '@/src/shared/hooks';
import { MODAL_MESSAGES } from '@/src/shared/const';
import { boardMutation, useBoardStore } from '@/src/entities/qnaboard';

jest.mock('@/src/shared/hooks', () => {
  const actualHooks = jest.requireActual('@/src/shared/hooks');
  return {
    ...actualHooks,
    useModal: jest.fn(),
    usePageRouter: jest.fn(),
  };
});

jest.mock('@/src/entities/qnaboard', () => ({
  boardMutation: {
    useDeleteBoard: jest.fn(),
  },
  useBoardStore: jest.fn(),
}));

const context = describe;
describe('useDetailMenu', () => {
  const mockBoardId = 1001;
  const mockContent = 'Test-Content';
  const mockTitle = 'Test-Title';
  const mockSetModal = jest.fn();
  const mockDeleteBoard = jest.fn();
  const mockSetEditBoardState = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useModal as jest.Mock).mockReturnValue({
      setModal: mockSetModal,
    });

    (usePageRouter as jest.Mock).mockReturnValue({
      moveBoardEditPage: jest.fn(),
      moveBoardMainPage: jest.fn(),
    });

    (boardMutation.useDeleteBoard as jest.Mock).mockReturnValue({
      mutate: mockDeleteBoard,
    });

    (useBoardStore as unknown as jest.Mock).mockReturnValue({
      setEditBoardState: mockSetEditBoardState,
    });
  });

  /** renderHook 전용 */
  const testHook = () => {
    const { result } = renderHook(
      () =>
        useDetailMenu({
          content: mockContent,
          title: mockTitle,
          boardId: mockBoardId,
        }),
      { wrapper: TestProvider },
    );
    return { result };
  };

  /** modal 검증 */
  const checkModalCall = (expectedMessage: string) => {
    expect(mockSetModal).toHaveBeenCalledWith({
      onAction: expect.any(Function),
      contents: {
        title: MODAL_MESSAGES.WARNING,
        message: expectedMessage,
      },
    });
  };

  context('액션 테스트', () => {
    it('삭제 요청을 수락 하면 boardId가 전달된다.', () => {
      const { result } = testHook();

      act(() => {
        result.current.deleteConfirm();
      });

      const { onAction } = mockSetModal.mock.calls[0][0];
      onAction();
      expect(mockDeleteBoard).toHaveBeenCalledWith(mockBoardId);
    });

    it('수정 요청을 수락 하면 boardState(title, content)를 전달한다.', () => {
      const { result } = testHook();

      act(() => {
        result.current.editConfirm();
      });

      const { onAction } = mockSetModal.mock.calls[0][0];
      onAction();
      expect(mockSetEditBoardState).toHaveBeenCalledWith({
        title: mockTitle,
        content: mockContent,
      });
    });
  });

  context('모달 테스트', () => {
    it('수정 요청을 하면 확인 메시지를 전달한다.', () => {
      const { result } = testHook();

      act(() => {
        result.current.deleteConfirm();
      });

      checkModalCall('정말 삭제하시겠습니까?');
    });

    it('수정 요청을 하면 확인 메시지를 전달한다.', () => {
      const { result } = testHook();

      act(() => {
        result.current.editConfirm();
      });

      checkModalCall('정말 수정하시겠습니까?');
    });
  });
});

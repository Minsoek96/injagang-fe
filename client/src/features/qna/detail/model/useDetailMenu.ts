import { useCallback } from 'react';
import { useModal, usePageRouter } from '@/src/shared/hooks';
import { useBoardStore, boardMutation } from '@/src/entities/qnaboard';
import { MODAL_MESSAGES } from '@/src/shared/const';

interface UseDetailMenuProps {
  boardId: number;
  content: string;
  title: string;
}

export function useDetailMenu({ boardId, content, title }: UseDetailMenuProps) {
  const { setModal } = useModal();
  const { moveBoardEditPage, moveBoardMainPage } = usePageRouter();
  const { mutate: deleteBoard } = boardMutation.useDeleteBoard();
  const { setEditBoardState } = useBoardStore();

  // 보드 삭제 처리
  const handleRemoveBoard = useCallback(() => {
    deleteBoard(boardId);
    moveBoardMainPage();
  }, []);

  // 보드 수정 처리
  const handleEditBoard = useCallback(() => {
    setEditBoardState({ title, content });
    moveBoardEditPage(boardId);
  }, []);

  // 공통 Modal 설정 함수
  const confirmAction = useCallback((onAction: () => void, message: string) => {
    setModal({
      onAction,
      contents: { title: MODAL_MESSAGES.WARNING, message },
    });
  }, []);

  const deleteConfirm = useCallback(
    () => confirmAction(handleRemoveBoard, '정말 삭제하시겠습니까?'),
    [],
  );

  const editConfirm = useCallback(
    () => confirmAction(handleEditBoard, '정말 수정하시겠습니까?'),
    [],
  );

  return { editConfirm, deleteConfirm };
}

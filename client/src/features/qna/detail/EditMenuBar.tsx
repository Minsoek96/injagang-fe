import { useState } from 'react';

import { useRouter } from 'next/router';

import styled from 'styled-components';

import {
  BiDotsVerticalRounded,
  BiTrash,
  BiMessageAltEdit,
} from 'react-icons/bi';

import { useBoardStore, boardMutation } from '@/src/entities/qnaboard';

import { useModal } from '@/src/shared/hooks';

type EditMenuBarProps = {
  boardId: number;
  content: string;
  title: string;
};

/** EditMenuBar 자소서 메뉴 (수정 - 삭제)
 *
 * @param boardId - 보드 아이디
 * @param content - 질문
 * @param title - 제목
 */
function EditMenuBar({ boardId, content, title }: EditMenuBarProps) {
  const router = useRouter();
  const [tagPosition, setTagPosition] = useState(false);

  const { setModal } = useModal();

  const { mutate: deleteBoard } = boardMutation.useDeleteBoard();
  const { setEditBoardState } = useBoardStore();

  const navigateToList = () => {
    router.replace('/qna/list');
  };

  const handleChangeVisible = () => {
    setTagPosition(!tagPosition);
  };

  const handleRemoveBoard = () => {
    deleteBoard(boardId);
    navigateToList();
  };

  const handleEditBoard = () => {
    setEditBoardState({
      title,
      content,
    });
    router.push(`/qna/edit/${boardId}`);
  };

  // 유저가 삭제를 컨펌 하는 함수
  const userDeleteConfirm = () => {
    setModal({
      onAction: handleRemoveBoard,
      contents: { title: '경고', message: '정말 삭제하시겠습니까?' },
    });
  };

  // 유저가 수정을 컨펌 하는 함수
  const userEditConfirm = () => {
    setModal({
      onAction: handleEditBoard,
      contents: { title: '경고', message: '정말 수정하시겠습니까?' },
    });
  };

  return (
    <MyComponentStyle>
      <BiDotsVerticalRounded onClick={handleChangeVisible} />
      <ButtonContainer $isVisible={tagPosition}>
        <BiTrash onClick={userDeleteConfirm} />
        <BiMessageAltEdit onClick={userEditConfirm} />
      </ButtonContainer>
    </MyComponentStyle>
  );
}

export default EditMenuBar;

const MyComponentStyle = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3.5rem;
  font-size: 2.5rem;
  padding-block: 0.3rem;
`;

const ButtonContainer = styled.div<{ $isVisible: boolean }>`
  display: flex;
  flex-direction: row;
  border: 1px solid ${(props) => props.theme.colors.mainLine};
  padding: 0.5rem;
  z-index: 1;
  margin-left: 1rem;
  visibility: ${(props) => (props.$isVisible ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

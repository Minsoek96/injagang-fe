import { useState } from 'react';

import { useRouter } from 'next/router';

import styled from 'styled-components';

import {
  BiDotsVerticalRounded,
  BiTrash,
  BiMessageAltEdit,
} from 'react-icons/bi';

import { useDeleteBoard } from '@/src/entities/qnaboard/mutaions';

import { useModal } from '@/src/shared/hooks';

type EditMenuBarProps = {
  boardId: number;
};

//* *자소서 편집 액션 컴포넌트 */
function EditMenuBar({ boardId }: EditMenuBarProps) {
  const [tagPosition, setTagPosition] = useState(false);
  const { setModal } = useModal();
  const { mutate: deleteBoard } = useDeleteBoard();
  const router = useRouter();

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

  // 유저가 삭제를 컨펌 하는 함수
  const userConfirm = () => {
    setModal({
      onAction: handleRemoveBoard,
      contents: { title: '경고', message: '정말 삭제하시겠습니까?' },
    });
  };

  return (
    <MyComponentStyle>
      <BiDotsVerticalRounded onClick={handleChangeVisible} />
      <ButtonContainer $isVisible={tagPosition}>
        <BiTrash onClick={userConfirm} />
        <BiMessageAltEdit />
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

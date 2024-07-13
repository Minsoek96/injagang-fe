import { useState } from 'react';

import { useRouter } from 'next/router';

import styled from 'styled-components';

import { BiDotsHorizontal, BiTrash, BiMessageAltEdit } from 'react-icons/bi';

import useModal from '@/hooks/useModal';
import { useDeleteBoard } from '@/src/entities/qnaboard/mutaions';

type EditMenuBarProps = {
  boardID: number;
};
function EditMenuBar({ boardID }: EditMenuBarProps) {
  const [tagPosition, setTagPosition] = useState(false);
  const { setModal } = useModal();
  const { mutate: delteBoard } = useDeleteBoard();
  const router = useRouter();

  const navigateToList = () => {
    router.replace('/qna/list');
  };

  const handleElementClick = () => {
    setTagPosition(!tagPosition);
  };

  const handleRemoveBoard = () => {
    delteBoard(boardID);
    navigateToList();
  };

  const userConfirm = () => {
    setModal({
      onAction: handleRemoveBoard,
      contents: { title: '경고', message: '정말 삭제하시겠습니까?' },
    });
  };

  return (
    <MycomponetStyle>
      <BiDotsHorizontal onClick={handleElementClick} />
      {tagPosition && (
        <ButtonContainer>
          <BiTrash onClick={userConfirm} />
          <BiMessageAltEdit />
        </ButtonContainer>
      )}
    </MycomponetStyle>
  );
}

export default EditMenuBar;

const MycomponetStyle = styled.div`
  position: relative;
  right: 5px;
  svg {
    font-size: 25px;
    cursor: pointer;
  }
  svg:hover {
    color: red;
  }
  width: 15px;
  .p-tag {
    height: 30px;
  }
`;
const ButtonContainer = styled.div``;

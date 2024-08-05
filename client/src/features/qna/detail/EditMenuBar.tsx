import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { BiDotsVerticalRounded, BiTrash, BiMessageAltEdit } from 'react-icons/bi';
import { useModal } from '@/src/shared/hooks';
import { useDeleteBoard } from '@/src/entities/qnaboard/mutaions';

type EditMenuBarProps = {
  boardID: number;
};

function EditMenuBar({ boardID }: EditMenuBarProps) {
  const [tagPosition, setTagPosition] = useState(false);
  const { setModal } = useModal();
  const { mutate: deleteBoard } = useDeleteBoard();
  const router = useRouter();

  const navigateToList = () => {
    router.replace('/qna/list');
  };

  const handleElementClick = () => {
    setTagPosition(!tagPosition);
  };

  const handleRemoveBoard = () => {
    deleteBoard(boardID);
    navigateToList();
  };

  const userConfirm = () => {
    setModal({
      onAction: handleRemoveBoard,
      contents: { title: '경고', message: '정말 삭제하시겠습니까?' },
    });
  };

  return (
    <MyComponentStyle>
      <BiDotsVerticalRounded onClick={handleElementClick} />
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
  padding: .5rem;
  z-index: 1;
  margin-left: 1rem;
  visibility: ${(props) => (props.$isVisible ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

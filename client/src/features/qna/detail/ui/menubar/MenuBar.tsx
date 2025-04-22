import { useState } from 'react';

import styled from 'styled-components';

import {
  BiDotsVerticalRounded,
  BiTrash,
  BiMessageAltEdit,
} from 'react-icons/bi';

import { HideSvg } from '@/src/shared/ui';
import { useDetailMenu } from '@/src/features/qna/detail/model/useDetailMenu';

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
function MenuBar({ boardId, content, title }: EditMenuBarProps) {
  const [tagPosition, setTagPosition] = useState(false);

  const { editConfirm, deleteConfirm } = useDetailMenu({
    boardId,
    content,
    title,
  });

  const handleChangeVisible = () => {
    setTagPosition(!tagPosition);
  };

  return (
    <Container>
      <HideSvg
        Logo={<BiDotsVerticalRounded />}
        label={tagPosition ? 'OFF' : 'ON'}
        onClick={handleChangeVisible}
      />
      <MenuWrapper $isVisible={tagPosition}>
        <HideSvg Logo={<BiTrash />} label="삭제" onClick={deleteConfirm} />
        <HideSvg
          Logo={<BiMessageAltEdit />}
          label="수정"
          onClick={editConfirm}
        />
      </MenuWrapper>
    </Container>
  );
}

export default MenuBar;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3.5rem;
  font-size: 2.5rem;
  padding-block: 0.3rem;
`;

const MenuWrapper = styled.div<{ $isVisible: boolean }>`
  display: flex;
  flex-direction: row;
  border: 1px solid ${(props) => props.theme.colors.mainLine};
  padding: 0.5rem;
  gap: 1rem;
  z-index: 1;
  margin-left: 1rem;
  visibility: ${(props) => (props.$isVisible ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

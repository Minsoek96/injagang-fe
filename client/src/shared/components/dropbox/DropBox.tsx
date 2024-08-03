import { useState } from 'react';

import { CSSProperties, styled } from 'styled-components';

import DropMenuList from './DropMenuList';

import { DropItemType } from './types';

type DropBoxProps = {
  buttonContent: React.ReactNode;
  dropStyles?: CSSProperties;
  dropList: DropItemType[];
};

export default function DropBox({
  buttonContent,
  dropStyles = {},
  dropList,
}: DropBoxProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropToggle = () => {
    setIsOpen((props) => !props);
  };

  return (
    <Container style={dropStyles}>
      <DropToggleButton onClick={handleDropToggle} title="drop-btn">
        {buttonContent}
      </DropToggleButton>
      {isOpen && <DropMenuList dropList={dropList} offBox={handleDropToggle} />}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const DropToggleButton = styled.button`
    border: none;
    background-color: ${(props) => props.theme.colors.primary};
    cursor: pointer;

    p{
      display: none;
    }
`;

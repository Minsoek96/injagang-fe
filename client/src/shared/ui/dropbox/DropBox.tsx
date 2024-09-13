import {
  useCallback, useEffect, useRef, useState,
} from 'react';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDropToggle = () => {
    setIsOpen((props) => !props);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      containerRef.current
      && !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <Container style={dropStyles} ref={containerRef}>
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

  p {
    display: none;
  }
`;

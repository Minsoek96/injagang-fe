import Link from 'next/link';

import styled from 'styled-components';

import { usePathname } from 'next/navigation';

interface MainMenuItemProps {
  title: string;
  path: string;
  icon: React.ReactNode;
}

export default function NavMenuItem({ title, path, icon }: MainMenuItemProps) {
  const pathname = usePathname();
  const isSelected = pathname === path;

  return (
    <Container $isSelected={isSelected}>
      <StyledLink href={path} aria-label={title}>
        <MenuWrapper>
          <i>{icon}</i>
          <span>{title}</span>
        </MenuWrapper>
      </StyledLink>
    </Container>
  );
}

const Container = styled.li<{ $isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: inherit;
  width: 10rem;
  list-style: none;
  position: relative;
  cursor: pointer;

  /* 밑줄 */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background-color: ${(props) => props.theme.colors.svgOnColor};
    transition: width 0.3s ease-in-out;
    width: ${(props) => (props.$isSelected ? '100%' : '0')};
  }

  svg {
    transition: fill 0.3s ease-in-out;
    fill: ${(props) => (props.$isSelected ? props.theme.colors.svgOnColor : props.theme.colors.svgColor)};

    &:hover {
      transform: scale(1.1);
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const MenuWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  color: white;


  > i {
  }

  > span {
    position: absolute;
    top: 0;
    margin-top: 5rem;
    display: none;
    padding: .5em;
    background-color: rgb(0,0,0,0.55);
    white-space: nowrap;
  }

  &:hover {
    > span {
      display: block;
    }
  }
`;

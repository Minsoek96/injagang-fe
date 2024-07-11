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
  opacity: 0.8;
  border-bottom: 1px solid
    ${(props) => (props.$isSelected ? props.theme.colors.subColor : 'none')};
  svg {
    fill: ${(props) => (props.$isSelected ? props.theme.colors.subColor : props.theme.colors.svgColor)};
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const MenuWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.white};


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

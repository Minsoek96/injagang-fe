import Link from 'next/link';

import { styled } from 'styled-components';

import { DropItemType } from './types';

type Props = {
  menuItem: DropItemType;
  offBox: ()=> void;
}

export default function DropMenuItem({ menuItem, offBox }: Props) {
  if (menuItem.type === 'link') {
    const { link } = menuItem;
    return (
      <Container onClick={offBox}>
        <StyledLink href={link.path} aria-label={link.label}>
          <ItemWrapper>
            {link.icon}
            <span>{link.title}</span>
          </ItemWrapper>
        </StyledLink>
      </Container>
    );
  }

  if (menuItem.type === 'component') {
    const { component } = menuItem;
    return (
      <Container onClick={offBox}>
        <ItemWrapper>
          {component}
        </ItemWrapper>
      </Container>
    );
  }

  return null;
}

const Container = styled.li`
  color: black;
  border-bottom: 1px solid ${(props) => props.theme.colors.mainLine};
  border-radius: 12px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.15);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-inline: 1.2rem;
  padding-block: 0.8rem;
  gap: 1.2rem;
  > span {
    font-size: 1.8rem;
    color: ${(props) => props.theme.colors.text}
  }
`;

import { styled } from 'styled-components';

import DropMenuItem from './DropMenuItem';

import { DropItemType } from './types';

type Props = {
  dropList: DropItemType[];
  offBox: () => void;
};

export default function DropMenuList({ dropList, offBox }: Props) {
  if (!dropList.length) {
    return (
      <p>Empty</p>
    );
  }

  return (
    <Container>
      {dropList.map((item) => (
        <DropMenuItem key={item.id} menuItem={item} offBox={offBox} />
      ))}
    </Container>
  );
}

const Container = styled.ul`
  position: absolute;
  border-radius: 12px;
  right: 0;
  width: 25rem;
  background-color: ${(props) => props.theme.colors.primary};
  list-style: none;
`;

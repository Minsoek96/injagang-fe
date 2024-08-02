import styled from 'styled-components';

import { Container } from '@/src/shared/components';
import BoardList from './BoardList';

type Props<T> = {
  boardInfos: T[]
  idKey: string;
  headItem: string[];
  tableKey: string[];
  route: string
}

function BoardListLayout<T>({
  boardInfos, idKey, headItem, tableKey, route,
}:Props<T>) {
  return (
    <BoardListViewStyle>
      <BoardList
        headItem={headItem}
        boardInfos={boardInfos ?? []}
        idKey={idKey as keyof T}
        displayKeys={tableKey as (keyof T)[]}
        route={route}
      />
    </BoardListViewStyle>
  );
}

export default BoardListLayout;

const BoardListViewStyle = styled(Container.ItemBase)`
  max-width: 100%;
  margin: 30px auto;

`;

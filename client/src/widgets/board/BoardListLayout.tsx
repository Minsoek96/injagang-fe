import styled from 'styled-components';

import BoardList from './BoardList';
import BoardListHead from './BoardListHead';

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
      <BoardListHead headItem={headItem} />
      <BoardList
        boardInfos={boardInfos ?? []}
        idKey={idKey as keyof T}
        displayKeys={tableKey as (keyof T)[]}
        route={route}
      />
    </BoardListViewStyle>
  );
}

export default BoardListLayout;

const BoardListViewStyle = styled.table`
  border: 1px solid #0a0a0a;
  margin: 30px auto;
  width: 80%;
  thead th {
    font-weight: bold;
    font-size: 18px;
    border: none;
    background-color: #ffa600e4;
  }
  thead th:first-child {
    width: 10%;
  }
`;

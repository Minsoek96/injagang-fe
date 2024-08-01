import { styled } from 'styled-components';
import BoardListHead from '@/src/widgets/board/BoardListHead';
import BoardListItem from './BoardListItem';

interface BoardListProps<T> {
  boardInfos: T[];
  headItem: string[];
  idKey: keyof T;
  displayKeys: (keyof T)[];
  route?: string;
}

function BoardList<T>({
  headItem,
  boardInfos,
  idKey,
  displayKeys,
  route = '',
}: BoardListProps<T>) {
  return (
    <BoardConatainer>
      <BoardListHead headItem={headItem} />
      <BoardBody>
        {boardInfos?.map((info) => (
          <BoardListItem
            key={String(info[idKey])}
            item={info}
            idKey={idKey}
            displayKeys={displayKeys}
            route={route}
          />
        ))}
      </BoardBody>
    </BoardConatainer>
  );
}

export default BoardList;

const BoardConatainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 1rem;
  overflow: hidden;

  thead {
    font-weight: bold;
    border: 0.1rem solid ${(props) => props.theme.colors.mainLine};
  }

  th,
  td {
    padding: 1.5rem;
    text-align: left;
  }
`;

const BoardBody = styled.tbody`
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.secondary};

  tr {
    border-bottom: 0.1em solid ${(props) => props.theme.colors.mainLine};
    td {
      width: 40%;
    }
    td:first-child {
      width: 10%;
    }
  }

  tr:hover {
    background-color: ${(props) => props.theme.colors.mainHover};
  }

  tr:last-child {
    border-bottom: 0.1rem solid ${(props) => props.theme.colors.mainLine};
  }
`;

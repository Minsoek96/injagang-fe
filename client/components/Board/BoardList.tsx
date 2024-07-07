import BoardListItem from './BoardListItem';

interface BoardListProps<T> {
  boardInfos: T[];
  idKey: keyof T;
  displayKeys: (keyof T)[];
  route?: string;
}

function BoardList<T>({
  boardInfos,
  idKey,
  displayKeys,
  route = '',
}: BoardListProps<T>) {
  return (
    <tbody>
      {boardInfos?.map((info) => (
        <BoardListItem
          key={String(info[idKey])}
          item={info}
          idKey={idKey}
          displayKeys={displayKeys}
          route={route}
        />
      ))}
    </tbody>
  );
}

export default BoardList;

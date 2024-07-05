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
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {boardInfos?.map((info) => (
        <BoardListItem
          key={String(info[idKey])}
          item={info}
          idKey={idKey}
          displayKeys={displayKeys}
          route={route}
        />
      ))}
    </>
  );
}

export default BoardList;

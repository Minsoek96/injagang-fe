import BoardList from './BoardList';

type Props<T> = {
  boardInfos: T[];
  idKey: string;
  headItem: string[];
  tableKey: string[];
  route: string;
};

function BoardListLayout<T>({
  boardInfos,
  idKey,
  headItem,
  tableKey,
  route,
}: Props<T>) {
  // useWhyDidYouRender('BoardLayout', {
  //   boardInfos,
  //   idKey,
  //   headItem,
  //   tableKey,
  //   route,
  // });
  return (
    <BoardList
      headItem={headItem}
      boardInfos={boardInfos ?? []}
      idKey={idKey as keyof T}
      displayKeys={tableKey as (keyof T)[]}
      route={route}
    />
  );
}

export default BoardListLayout;

import { useRouter } from 'next/router';

import { v4 as uuid4 } from 'uuid';

interface BoardListItemProps<T> {
  item: T;
  idKey: keyof T;
  displayKeys: (keyof T)[];
  route?: string;
}

function BoardListItem<T>({
  item,
  idKey,
  displayKeys,
  route = '',
}: BoardListItemProps<T>) {
  const router = useRouter();

  const navigateToDetail = () => {
    if (route) router.push(`${route}/${item[idKey]}`);
  };

  return (
    <tr onClick={navigateToDetail}>
      {displayKeys?.map((key) => (
        <td key={uuid4()}>{String(item[key])}</td>
      ))}
    </tr>
  );
}

export default BoardListItem;

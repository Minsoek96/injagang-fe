import keys from '@/util/keys';

interface BoardListHeadProps {
  headItem: string[];
}
function BoardListHead({ headItem }: BoardListHeadProps) {
  return (
    <thead>
      <tr>
        {headItem.map((title, idx) => (
          <th key={keys(title, idx)}>{title}</th>
        ))}
      </tr>
    </thead>
  );
}

export default BoardListHead;

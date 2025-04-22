import { useDebounce } from '@/src/shared/hooks';
import { MainInput } from '@/src/shared/ui';
import { useEffect, useState } from 'react';

import { useBoardSearch } from '../../model';

export default function SearchInput() {
  const { changeSearchTerm, boardSearch } = useBoardSearch();

  const [searchTerm, setSearchTerm] = useState(boardSearch);
  const debounceSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debounceSearch) {
      changeSearchTerm(debounceSearch);
    }
  }, [debounceSearch, changeSearchTerm]);

  return (
    <>
      <label htmlFor="searchInput" className="sr-only">
        검색 :
      </label>
      <MainInput
        placeholder="Search.."
        id="searchInput"
        value={searchTerm}
        onChange={setSearchTerm}
        sx={{ marginInline: '.5rem' }}
      />
    </>
  );
}

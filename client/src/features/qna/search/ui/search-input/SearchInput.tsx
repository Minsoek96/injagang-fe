import { useEffect, useState } from 'react';

import { styled } from 'styled-components';
import { FiSearch } from 'react-icons/fi';

import { useDebounce } from '@/src/shared/hooks';
import { MainInput } from '@/src/shared/ui';

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
    <SearchContainer>
      <label htmlFor="searchInput" className="sr-only">
        검색 :
      </label>
      <MainInput
        placeholder="Search.."
        id="searchInput"
        value={searchTerm}
        onChange={setSearchTerm}
        sx={{ width: '100%', paddingInline: '1.5rem', margin: 0 }}
      />
      <SearchIcon />
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  right: 1rem;
  font-size: 1.8rem;
  color: ${(props) => props.theme.colors.highlightLine};
  z-index: 1;
`;

import { useEffect, useState } from 'react';

import styled from 'styled-components';
import { MainInput } from '@/src/shared/components/input';

import { useDebounce } from '@/src/shared/hooks';
import { ComboBox } from '@/src/shared/components/combobox';

import { styleMixin } from '@/src/shared/styles';
import userQnaManager from './hooks/userQnaManager';

const typeList = [
  { title: '제목', en: 'title' },
  { title: '작성자', en: 'writer' },
];

function BoardSearch() {
  const { dispatchChangeType, dispatchChangeSearch } = userQnaManager();
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const debounceSearch = useDebounce(search);

  useEffect(() => {
    if (debounceSearch) {
      dispatchChangeSearch(debounceSearch);
    }
  }, [debounceSearch]);

  const changeType = (newType: string) => {
    const findType = typeList.find((item) => item.title === newType);
    setType(newType);
    if (findType) {
      dispatchChangeType(findType.en);
      dispatchChangeSearch('');
    }
    setSearch('');
  };

  return (
    <Container>
      <ComboBox
        value={type}
        optionList={typeList}
        onChange={changeType}
        sx={{ height: '4rem' }}
      />
      <label htmlFor="searchInput" className="sr-only">
        검색 :
      </label>
      <MainInput id="searchInput" value={search} onChange={setSearch} />
    </Container>
  );
}

export default BoardSearch;

const Container = styled.div`
  ${styleMixin.Flex()}
  gap: 3px;
  margin: 1.2rem;
`;

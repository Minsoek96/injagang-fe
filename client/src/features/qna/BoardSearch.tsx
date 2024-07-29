import { useEffect, useState } from 'react';

import styled from 'styled-components';
import { BaseInput } from '@/src/shared/components/input';

import { useDebounce } from '@/src/shared/hooks';
import { ComboBox } from '@/src/shared/components/combobox';

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

  const changeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

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
        Size={{ width: '150px', height: '40px' }}
        value={type}
        optionList={typeList}
        onChange={changeType}
      />
      <Label htmlFor="searchInput" className="sr-only">
        검색 :
      </Label>
      <InputStyle
        type="text"
        id="searchInput"
        value={search}
        onChange={changeSearch}
      />
    </Container>
  );
}

export default BoardSearch;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
`;

const InputStyle = styled(BaseInput)`
  width: 350px;
  margin-top: 16.4px;
`;

const Label = styled.label``;

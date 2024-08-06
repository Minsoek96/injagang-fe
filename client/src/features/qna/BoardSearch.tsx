import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { useBoardStore } from '@/src/entities/qnaboard';

import { useDebounce } from '@/src/shared/hooks';
import { ComboBox, MainInput } from '@/src/shared/components';
import { styleMixin } from '@/src/shared/styles';

const typeList = [
  { title: '제목', en: 'title' },
  { title: '작성자', en: 'writer' },
];

/** 유저가 검색하는 타입와 검색어를 관리 */
function BoardSearch() {
  const { setBoardType, setBoardSearch } = useBoardStore();
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const debounceSearch = useDebounce(search);

  useEffect(() => {
    if (debounceSearch) {
      setBoardSearch(debounceSearch);
    }
  }, [debounceSearch]);

  const changeType = (newType: string) => {
    const findType = typeList.find((item) => item.title === newType);
    setType(newType);
    if (findType) {
      setBoardType(findType.en);
      setBoardSearch('');
    }
    setSearch('');
  };

  return (
    <Container>
      <ComboBox
        value={type}
        optionList={typeList}
        onChange={changeType}
        sx={{ height: '4rem', minWidth: '4rem' }}
      />
      <label htmlFor="searchInput" className="sr-only">
        검색 :
      </label>
      <MainInput
        placeholder="Search.."
        id="searchInput"
        value={search}
        onChange={setSearch}
        sx={{ marginInline: '.5rem' }}
      />
    </Container>
  );
}

export default BoardSearch;

const Container = styled.div`
  ${styleMixin.Flex()}
`;

import { act } from '@testing-library/react';

import useBoardStore from './useBoardStore';

describe('useBoardStore', () => {
  it('유저가 검색한 서칭을 저장한다.', () => {
    const searchValue = 'test';
    act(() => useBoardStore.getState().setBoardSearch(searchValue));
    const { boardSearch } = useBoardStore.getState();
    expect(boardSearch).toEqual(searchValue);
  });

  it('유저가 선택한  검색 유형을 저장한다.', () => {
    const searchType = 'title';
    act(() => useBoardStore.getState().setBoardType(searchType));
    const { boardType } = useBoardStore.getState();
    expect(boardType).toEqual(searchType);
  });

  it('현재 선택된 페이지 넘버를 저장한다.', () => {
    const pagenum = 10001;
    act(() => useBoardStore.getState().setCurPageNum(() => pagenum));
    const { curPageNum } = useBoardStore.getState();
    expect(curPageNum).toEqual(pagenum);
  });

  it('검색 정보를 초기화한다.', () => {
    act(() => useBoardStore.getState().initBoardSearch());
    const { boardSearch, boardType } = useBoardStore.getState();
    expect(boardSearch).toEqual('');
    expect(boardType).toEqual('');
  });
});

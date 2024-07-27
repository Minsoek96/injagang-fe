import { act } from '@testing-library/react';

import { sampleQuestionIds } from '@/fixutures/entities/board';

import useBoardStore from '@/src/entities/qnaboard/useBoardStore';

describe('useBoardStore', () => {
  it('게시판 첨삭 댓글 조회를 위한 1 대 1 매칭될 첨삭 질문Ids를 저장한다.', () => {
    act(() => useBoardStore.getState().setQuestionIds(sampleQuestionIds));
    const { questionIds } = useBoardStore.getState();
    expect(questionIds).toEqual(sampleQuestionIds);
  });

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

  it('전체 페이지 넘버를 저장한다.', () => {
    const totalnum = 100000;
    act(() => useBoardStore.getState().setTotalPage(totalnum));
    const { totalPage } = useBoardStore.getState();
    expect(totalPage).toEqual(totalnum);
  });

  it('검색 정보를 초기화한다.', () => {
    act(() => useBoardStore.getState().initBoardSearch());
    const { boardSearch, boardType } = useBoardStore.getState();
    expect(boardSearch).toEqual('');
    expect(boardType).toEqual('');
  });
});

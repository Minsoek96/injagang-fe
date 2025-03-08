import { act } from '@testing-library/react';

import { sampleType, sampleUserPlayList } from '@/fixutures/entities/intervew_question';

import useIntvPlaylistStore from './useIntvPlaylistStore';

describe('useIntvPlaylistStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    act(() => useIntvPlaylistStore.getState().setUserPlayList(sampleUserPlayList));
  });

  it('유저가 선택한 상황별 질문리스트를 조합한다.', () => {
    const { userPlayList } = useIntvPlaylistStore.getState();
    expect(userPlayList).toEqual(sampleUserPlayList);
  });

  it('중복 질문을 추가하면 무시한다.', () => {
    act(() => useIntvPlaylistStore.getState().setUserPlayList(sampleUserPlayList));
    const { userPlayList } = useIntvPlaylistStore.getState();
    expect(userPlayList.length).toEqual(sampleUserPlayList.length);
  });

  it('유저가 조회한 질문 타입을 설정한다.', () => {
    act(() => useIntvPlaylistStore.getState().setSelectedType(sampleType));

    const { selectedType } = useIntvPlaylistStore.getState();
    expect(selectedType).toEqual(sampleType);
  });

  it('유저가 선택한 질문을 제거한다.', () => {
    act(() => useIntvPlaylistStore.getState().removePlayItem(sampleUserPlayList[2]));
    const copyList = [...sampleUserPlayList];
    copyList.splice(2, 1);

    const { userPlayList } = useIntvPlaylistStore.getState();
    expect(userPlayList).toEqual(copyList);
  });

  it('설정을 초기화 한다.', () => {
    act(() => useIntvPlaylistStore.getState().initUserPlayList());

    const { userPlayList } = useIntvPlaylistStore.getState();
    expect(userPlayList).toEqual([]);
  });
});

import { act } from '@testing-library/react';

import { sampleType, sampleUserPlayList } from '@/fixutures/entities/intervew_question';

import useQuestionStore from '@/src/entities/interview_question/useQuestionStore';

describe('useQuestionStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    act(() => useQuestionStore.getState().setUserPlayList(sampleUserPlayList));
  });

  it('유저가 선택한 상황별 질문리스트를 조합한다.', () => {
    const { userPlayList } = useQuestionStore.getState();
    expect(userPlayList).toEqual(sampleUserPlayList);
  });

  it('중복 질문을 추가하면 무시한다.', () => {
    act(() => useQuestionStore.getState().setUserPlayList(sampleUserPlayList));
    const { userPlayList } = useQuestionStore.getState();
    expect(userPlayList.length).toEqual(sampleUserPlayList.length);
  });

  it('유저가 조회한 질문 타입을 설정한다.', () => {
    act(() => useQuestionStore.getState().setSelectedType(sampleType));

    const { selectedType } = useQuestionStore.getState();
    expect(selectedType).toEqual(sampleType);
  });

  it('유저가 선택한 질문을 제거한다.', () => {
    act(() => useQuestionStore.getState().removePlayItem(sampleUserPlayList[2]));
    const copyList = [...sampleUserPlayList];
    copyList.splice(2, 1);

    const { userPlayList } = useQuestionStore.getState();
    expect(userPlayList).toEqual(copyList);
  });

  it('설정을 초기화 한다.', () => {
    act(() => useQuestionStore.getState().initUserPlayList());

    const { userPlayList } = useQuestionStore.getState();
    expect(userPlayList).toEqual([]);
  });
});

import { act } from '@testing-library/react';

import { sampleQuestionPlayList, sampleType, sampleUserPlayList } from '@/fixutures/entities/intervew_question';

import useInterViewStore from '@/src/entities/interview_question/useInterViewStore';

describe('useInterViewStore', () => {
  it('면접 녹화에 사용될 재생리스트를 설정한다.', () => {
    act(() => useInterViewStore.getState().setConfirmQuestions(sampleQuestionPlayList));

    const { confirmQuestions } = useInterViewStore.getState();
    expect(confirmQuestions).toEqual(sampleQuestionPlayList);
  });

  it('유저가 선택한 상황별 질문리스트를 조합한다.', () => {
    act(() => useInterViewStore.getState().setUserPlayList(sampleUserPlayList));

    const { userPlayList } = useInterViewStore.getState();
    expect(userPlayList).toEqual(sampleUserPlayList);
  });

  it('유저가 조회한 질문 타입을 설정한다.', () => {
    act(() => useInterViewStore.getState().setSelectedType(sampleType));

    const { selectedType } = useInterViewStore.getState();
    expect(selectedType).toEqual(sampleType);
  });

  it('설정을 초기화 한다.', () => {
    act(() => useInterViewStore.getState().initUserPlayList());

    const { userPlayList } = useInterViewStore.getState();
    expect(userPlayList).toEqual([]);
  });
});

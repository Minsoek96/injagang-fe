import useFeedStore from '@/src/entities/qnaboard/useFeedStore';
import { act } from '@testing-library/react';

describe('useFeedStore', () => {
  it('유저가 선택한 댓글 번호 저장', () => {
    const targetId = 10001;

    act(() => useFeedStore.getState().setTargetFeed(targetId));
    const { targetFeed } = useFeedStore.getState();
    expect(targetFeed).toEqual(targetId);
  });

  it('유저가 선택한 댓글을 초기화한다.', () => {
    act(() => useFeedStore.getState().initTargetFeed());
    const { targetFeed } = useFeedStore.getState();
    expect(targetFeed).toEqual(0);
  });
});

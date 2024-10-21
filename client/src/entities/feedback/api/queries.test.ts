import { act, renderHook, waitFor } from '@testing-library/react';

import { sampleResponseFeed, sampleTargetId } from '@/fixutures/entities/feed';
import TestProvider from '@/fixutures/TestProvider';

import useFeedStore from '@/src/entities/feedback/model/useFeedStore';

import { getFeedBackList } from './apis';
import { useFetchFeedBackList } from './queries';

jest.mock('./apis');

describe('queries', () => {
  beforeEach(() => {
    (getFeedBackList as jest.Mock).mockResolvedValueOnce({
      data: sampleResponseFeed,
    });
    jest.clearAllMocks();
  });

  it('유저가 선택한 번호의 댓글리스트를 조회한다.', async () => {
    act(() => useFeedStore.getState().setTargetFeed(sampleTargetId));
    const { result } = renderHook(() => useFetchFeedBackList(sampleTargetId), {
      wrapper: TestProvider,
    });
    await waitFor(() => {
      expect(result.current.data).toEqual({ data: sampleResponseFeed });
    });
  });

  it('유저의 선택된 번호가 없으면 조회하지 않는다', async () => {
    const { result } = renderHook(() => useFetchFeedBackList(sampleTargetId), {
      wrapper: TestProvider,
    });
    await waitFor(() => {
      expect(result.current.data).not.toEqual({ data: sampleResponseFeed });
    });
  });
});

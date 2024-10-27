import { act, renderHook, waitFor } from '@testing-library/react';

import {
  responseCoverLetters,
  responseDetailCoverLetter,
} from '@/fixutures/entities/coverLetter';
import TestProvider from '@/fixutures/TestProvider';

// TODO : 룰 위반.. 이거 어디 분류하지
import { useAuthStore } from '@/src/entities/auth';
import {
  getCoverLetter,
  getDetailCoverLetter,
} from '@/src/entities/coverLetter/api/apis';

import {
  useFetchCoverLetter,
  useFetchDetailCoverLetter,
} from './queries';

jest.mock('@/src/entities/coverLetter/api/apis');

describe('queries', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('유저의 자기소개서를 가져온다.', async () => {
    act(() => useAuthStore.getState().setUserInfo('test', 'USER'));

    (getCoverLetter as jest.Mock).mockResolvedValueOnce({
      data: responseCoverLetters,
    });
    const { result } = renderHook(() => useFetchCoverLetter(), {
      wrapper: TestProvider,
    });
    await waitFor(() => {
      expect(result.current.data).toEqual({ data: responseCoverLetters });
    });
  });

  it('선택된 유저 자소서의 상세내용을 가져온다.', async () => {
    const mockTargetId = 10000;
    (getDetailCoverLetter as jest.Mock).mockResolvedValueOnce({
      data: responseDetailCoverLetter,
    });
    const { result } = renderHook(
      () => useFetchDetailCoverLetter(mockTargetId),
      {
        wrapper: TestProvider,
      },
    );
    await waitFor(() => {
      expect(result.current.data).toEqual({ data: responseDetailCoverLetter });
    });
  });
});

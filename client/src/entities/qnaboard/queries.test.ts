import { renderHook, waitFor } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';

import { useFetchBoardDetail, useFetchBoardList } from '@/src/entities/qnaboard/queries';

import { getBoardList, getDetailBoard } from '@/src/entities/qnaboard/apis';
import { sampleBoardList, sampleDetailBoard } from '@/fixutures/entities/board';

jest.mock('./apis');

describe('queries', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('QNA 게시판을 조회한다.', async () => {
    (getBoardList as jest.Mock).mockResolvedValue({
      data: sampleBoardList,
    });
    const { result } = renderHook(() => useFetchBoardList(10001, '', ''), {
      wrapper: TestProvider,
    });

    await waitFor(() => result.current.isSuccess);
    expect(result.current.data).toEqual({ data: sampleBoardList });
  });

  it('QNA 게시판의 선택된 글을 조회한다.', async () => {
    (getDetailBoard as jest.Mock).mockResolvedValue({
      data: sampleDetailBoard,
    });
    const { result } = renderHook(() => useFetchBoardDetail(10001), {
      wrapper: TestProvider,
    });

    await waitFor(() => result.current.isSuccess);
    expect(result.current.data).toEqual({ data: sampleDetailBoard });
  });
});

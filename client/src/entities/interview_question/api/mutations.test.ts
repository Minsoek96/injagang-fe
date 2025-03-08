import { useRouter } from 'next/router';

import { act, renderHook, waitFor } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';
import {
  sampleAddQuestions,
  sampleRandomQuestion,
  sampleResponseRandomQ,
} from '@/fixutures/entities/intervew_question';

import useIntvPlaylistStore from '@/src/entities/interview_question/model/useIntvPlaylistStore';

import { useToast } from '@/src/shared/hooks';

import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  TOAST_MODE,
} from '@/src/shared/const';

import interview from './queryKeys';
import {
  useAddInterViewQ, useDeleteInterViewQ, useFetchRandomQuestion,
} from './mutations';
import {
  addInterViewQuestion, deleteInterViewQuestion, getRandomQuestions,
} from './apis';

/** 목킹 설정 */
jest.mock('./apis');
jest.mock('js-cookie');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
  replace: jest.fn(),
}));
jest.mock('@/src/shared/hooks', () => ({
  useToast: jest.fn(),
}));

const replaceMock = jest.fn();
const showToastMock = jest.fn();
const mockInvalidateQueries = jest.fn();

jest.mock('@tanstack/react-query', () => {
  const actualModule = jest.requireActual('@tanstack/react-query');
  return {
    ...actualModule,
    useQueryClient: jest.fn(() => ({
      invalidateQueries: mockInvalidateQueries,
    })),
  };
});

const context = describe;

const setupMocks = () => {
  (useRouter as jest.Mock).mockReturnValue({ replace: replaceMock });
  (useToast as jest.Mock).mockReturnValue({
    showToast: showToastMock,
  });
};

/** 랜덤 면접 질문리스트 요청 */
describe('useFetchRandomQuestion', () => {
  beforeEach(() => {
    (getRandomQuestions as jest.Mock).mockResolvedValue({
      data: sampleResponseRandomQ,
    });
    setupMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const testFetchRandomQuestion = () => {
    const { result } = renderHook(() => useFetchRandomQuestion(), {
      wrapper: TestProvider,
    });

    act(() => result.current.mutate(sampleRandomQuestion));
    return {
      result,
    };
  };
  context('Mutation이 성공한 경우', () => {
    it('랜덤질문을 가져온다', async () => {
      const { result } = testFetchRandomQuestion();

      await waitFor(() => result.current.isSuccess);
      expect(result.current.data).toEqual(sampleResponseRandomQ);
    });

    it('결과를 재생리스트의 질문만 추출하여 스토어에 저장한다', async () => {
      const { result } = testFetchRandomQuestion();

      await waitFor(() => result.current.isSuccess);
      const { result: store } = renderHook(() => useIntvPlaylistStore());
      const extractionRandomQuestions = sampleResponseRandomQ.map(
        (item) => item.questions,
      );
      expect(store.current.userPlayList).toEqual(extractionRandomQuestions);
    });

    it('랜덤 질문을 가져오면 성공 토스트를 등록한다.', async () => {
      const { result } = testFetchRandomQuestion();

      await waitFor(() => result.current.isSuccess);
      expect(showToastMock).toHaveBeenCalledWith(
        TOAST_MODE.SUCCESS,
        SUCCESS_MESSAGES.GET_RANDOMQUESTION(result.current.data?.length || 0),
      );
    });
  });

  it('랜덤 질문을 가져오는데 실패한 토스트를 등록한다.', async () => {
    (getRandomQuestions as jest.Mock).mockRejectedValueOnce(new Error(''));
    const { result } = testFetchRandomQuestion();

    await waitFor(() => result.current.isError);
    expect(showToastMock).toHaveBeenCalledWith(
      TOAST_MODE.ERROR,
      ERROR_MESSAGES.GET_RANDOMQUESTION,
    );
  });
});

/** 질문 리스트 삭제 */
describe('useDeleteInterViewQ', () => {
  beforeEach(() => {
    setupMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const testDeleteInterViewQ = () => {
    const seletedQuestions = [10001, 10002, 10003, 10004];
    const { result } = renderHook(() => useDeleteInterViewQ(), {
      wrapper: TestProvider,
    });
    act(() => result.current.mutate({ ids: seletedQuestions }));
    return { result };
  };

  context('Mutation 성공한 경우', () => {
    it('키를 초기화 한다', async () => {
      const { result } = testDeleteInterViewQ();
      await waitFor(() => result.current.isSuccess);
      expect(mockInvalidateQueries).toHaveBeenCalledWith({
        queryKey: interview.all,
      });
    });

    it('성공적인 토스트 알림을 등록한다', async () => {
      const { result } = testDeleteInterViewQ();

      await waitFor(() => result.current.isSuccess);
      expect(showToastMock).toHaveBeenCalledWith(
        TOAST_MODE.SUCCESS,
        SUCCESS_MESSAGES.DELETED_INTERVIEW_QUESTION,
      );
    });
  });

  it('실패에 대한 토스트 알림을 등록한다', async () => {
    (deleteInterViewQuestion as jest.Mock).mockRejectedValueOnce(new Error(''));
    const { result } = testDeleteInterViewQ();

    await waitFor(() => result.current.isSuccess);
    expect(showToastMock).toHaveBeenCalledWith(
      TOAST_MODE.ERROR,
      ERROR_MESSAGES.DELETED_INTERVIEW_QUESTION,
    );
  });
});

/** 질문 리스트 추가 */
describe('useAddInterViewQ', () => {
  beforeEach(() => {
    setupMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const testAddinterViewQ = () => {
    const { result } = renderHook(() => useAddInterViewQ(), {
      wrapper: TestProvider,
    });
    act(() => result.current.mutate(sampleAddQuestions));
    return { result };
  };

  context('Mutation 성공한 경우', () => {
    it('새로운 질문 리스트를 등록한다.', async () => {
      (addInterViewQuestion as jest.Mock).mockResolvedValue({
        data: sampleAddQuestions,
      });
      const { result } = testAddinterViewQ();
      await waitFor(() => result.current.isSuccess);
      expect(result.current.data).toEqual({ data: sampleAddQuestions });
    });

    it('성공적인 토스트 알림을 등록한다', async () => {
      (addInterViewQuestion as jest.Mock).mockResolvedValue({
        data: sampleAddQuestions,
      });
      const { result } = testAddinterViewQ();

      await waitFor(() => result.current.isSuccess);
      expect(showToastMock).toHaveBeenCalledWith(
        TOAST_MODE.SUCCESS,
        SUCCESS_MESSAGES.ADDED_INTERVIEW_QUESTION,
      );
    });
  });

  it('실패에 대한 토스트 알림을 등록한다', async () => {
    (addInterViewQuestion as jest.Mock).mockRejectedValueOnce(new Error(''));
    const { result } = testAddinterViewQ();

    await waitFor(() => result.current.isSuccess);
    expect(showToastMock).toHaveBeenCalledWith(
      TOAST_MODE.ERROR,
      ERROR_MESSAGES.ADDED_INTERVIEW_QUESTION,
    );
  });
});

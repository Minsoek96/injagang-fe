import { useRouter } from 'next/router';

import { act, renderHook, waitFor } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';

import {
  sampleReviseFeed,
  sampleTargetId,
  sampleWriteFeed,
} from '@/fixutures/entities/feed';

import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  TOAST_MODE,
} from '@/src/shared/const';
import { useToast } from '@/src/shared/hooks';

import { useDeleteFeed, useReviseFeed, useWriteFeed } from './mutation';
import { deleteFeedBack, reviseFeedBack, writeFeedBack } from './apis';
import feedback from './queryKeys';

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

const successTestCases = [
  {
    title:
      '댓글 작성에 성공하면 해당 피드백키를 초기화하고 토스트 메시지를 등록한다.',
    hook: useWriteFeed,
    mutateArgs: sampleReviseFeed,
    toastMsg: SUCCESS_MESSAGES.ADDED_FEED,
    toastMode: TOAST_MODE.SUCCESS,
    queryKey: feedback.list(sampleTargetId),
    apiMock: writeFeedBack,
  },
  {
    title:
      '댓글 수정에 성공하면 해당 피드백키를 초기화하고 토스트 메시지를 등록한다.',
    hook: useReviseFeed,
    mutateArgs: sampleWriteFeed,
    toastMsg: SUCCESS_MESSAGES.UPDATED_FEED,
    toastMode: TOAST_MODE.SUCCESS,
    queryKey: feedback.list(sampleTargetId),
    apiMock: reviseFeedBack,
  },
  {
    title:
      '댓글 삭제에 성공하면 해당 피드백키를 초기화하고 토스트 메시지를 등록한다.',
    hook: useDeleteFeed,
    mutateArgs: 10001,
    toastMsg: SUCCESS_MESSAGES.DELETE_FEED,
    toastMode: TOAST_MODE.SUCCESS,
    queryKey: feedback.list(sampleTargetId),
    apiMock: deleteFeedBack,
  },
];

const failureTestCases = [
  {
    title: '댓글 작성에 실패하면 실패 토스트를 등록한다',
    hook: useWriteFeed,
    mutateArgs: sampleWriteFeed,
    toastMsg: ERROR_MESSAGES.ADDED_FEED,
    toastMode: TOAST_MODE.ERROR,
    apiMock: writeFeedBack,
  },
  {
    title: '댓글 수정에 실패하면 실패 토스트를 등록한다',
    hook: useReviseFeed,
    mutateArgs: sampleReviseFeed,
    toastMsg: ERROR_MESSAGES.UPDATED_FEED,
    toastMode: TOAST_MODE.ERROR,
    apiMock: reviseFeedBack,
  },
  {
    title: '댓글 삭제에 실패하면 실패 토스트를 등록한다',
    hook: useDeleteFeed,
    mutateArgs: sampleReviseFeed,
    toastMsg: ERROR_MESSAGES.DELETE_FEED,
    toastMode: TOAST_MODE.ERROR,
    apiMock: deleteFeedBack,
  },
];

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const testHook = (hook, mutateArgs) => {
  const { result } = renderHook(() => hook(sampleTargetId), {
    wrapper: TestProvider,
  });
  act(() =>
    (mutateArgs ? result.current.mutate(mutateArgs) : result.current.mutate()));
  return { result };
};

describe('mutations', () => {
  context('뮤테이션 성공한 경우', () => {
    beforeEach(() => {
      setupMocks();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    successTestCases.forEach(
      ({
        title, hook, mutateArgs, toastMode, toastMsg, apiMock, queryKey,
      }) => {
        it(title, async () => {
          (apiMock as jest.Mock).mockResolvedValue({});
          const { result } = testHook(hook, mutateArgs);
          await waitFor(() => result.current.isSuccess);

          expect(mockInvalidateQueries).toHaveBeenCalledWith({
            queryKey,
          });
          expect(showToastMock).toHaveBeenCalledWith(toastMode, toastMsg);
        });
      },
    );
  });

  context('뮤테이션 실패한 경우', () => {
    beforeEach(() => {
      setupMocks();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
    failureTestCases.forEach(
      ({
        title, hook, mutateArgs, toastMode, toastMsg, apiMock,
      }) => {
        it(title, async () => {
          (apiMock as jest.Mock).mockRejectedValueOnce(new Error(''));
          const { result } = testHook(hook, mutateArgs);
          await waitFor(() => result.current.isError);
          expect(showToastMock).toHaveBeenCalledWith(toastMode, toastMsg);
        });
      },
    );
  });
});

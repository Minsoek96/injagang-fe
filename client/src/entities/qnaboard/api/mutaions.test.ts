import { useRouter } from 'next/router';

import { act, renderHook, waitFor } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';

import {
  sampleReviseQnaBoard,
  sampleWriteQnaBoard,
} from '@/fixutures/entities/qnaboard';

import { useToast } from '@/src/shared/hooks';
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  TOAST_MODE,
} from '@/src/shared/const';

import board from './queryKeys';
import {
  useDeleteBoard,
  useReviseBoard,
  useWriteBoard,
} from './mutaions';
import {
  deleteQnaBoard,
  reviseQnaBoard,
  writeQnaBoard,
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

const successTestCases = [
  {
    title:
      'QNA게시판 새로운 게시글 등록에 성공하면 전체 키를 초기화하고 토스트 메시지를 등록한다.',
    hook: useWriteBoard,
    mutateArgs: sampleWriteQnaBoard,
    toastMsg: SUCCESS_MESSAGES.ADDED_QUESTION,
    toastMode: TOAST_MODE.SUCCESS,
    queryKey: board.all,
    apiMock: writeQnaBoard,
  },
  {
    title:
      'QNA게시판 삭제를 성공하면 전체 키를 초기화하고 토스트 메시지를 등록한다.',
    hook: useDeleteBoard,
    mutateArgs: 10001,
    toastMsg: SUCCESS_MESSAGES.DELETED_QUESTION,
    toastMode: TOAST_MODE.SUCCESS,
    queryKey: board.all,
    apiMock: deleteQnaBoard,
  },
  {
    title:
      'QNA게시판 수정을 성공하면 전체 키를 초기화하고 토스트 메시지를 등록한다.',
    hook: useReviseBoard,
    mutateArgs: sampleReviseQnaBoard,
    toastMsg: SUCCESS_MESSAGES.UPDATED_QUESTION,
    toastMode: TOAST_MODE.SUCCESS,
    queryKey: board.all,
    apiMock: reviseQnaBoard,
  },
];

const failureTestCases = [
  {
    title: 'QNA게시판에 새로운 게시글 등록에 실패하면 실패 토스트를 등록한다',
    hook: useWriteBoard,
    mutateArgs: sampleWriteQnaBoard,
    toastMsg: ERROR_MESSAGES.ADDED_QUESTION,
    toastMode: TOAST_MODE.ERROR,
    apiMock: writeQnaBoard,
  },
  {
    title: 'QNA게시판에 수정에 실패하면 실패 토스트를 등록한다',
    hook: useReviseBoard,
    mutateArgs: sampleReviseQnaBoard,
    toastMsg: ERROR_MESSAGES.UPDATED_QUESTION,
    toastMode: TOAST_MODE.ERROR,
    apiMock: reviseQnaBoard,
  },
  {
    title: 'QNA게시판에 삭제에 실패하면 실패 토스트를 등록한다',
    hook: useDeleteBoard,
    mutateArgs: 10001,
    toastMsg: ERROR_MESSAGES.DELETED_QUESTION,
    toastMode: TOAST_MODE.ERROR,
    apiMock: deleteQnaBoard,
  },
];

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const testHook = (hook, mutateArgs) => {
  const { result } = renderHook(() => hook(), { wrapper: TestProvider });
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
        title, hook, mutateArgs, toastMode, toastMsg, apiMock,
      }) => {
        it(title, async () => {
          (apiMock as jest.Mock).mockResolvedValue({});
          const { result } = testHook(hook, mutateArgs);
          await waitFor(() => result.current.isSuccess);
          expect(mockInvalidateQueries).toHaveBeenCalledWith({
            queryKey: board.all,
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
    failureTestCases.forEach(({
      title, hook, mutateArgs, toastMode, toastMsg, apiMock,
    }) => {
      it(title, async () => {
        (apiMock as jest.Mock).mockRejectedValueOnce(new Error(''));
        const { result } = testHook(hook, mutateArgs);
        await waitFor(() => result.current.isError);
        expect(showToastMock).toHaveBeenCalledWith(toastMode, toastMsg);
      });
    });
  });
});

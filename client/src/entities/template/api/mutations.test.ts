import { useRouter } from 'next/router';

import {
  act, renderHook, waitFor,
} from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';

import { useToast } from '@/src/shared/hooks';
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  TOAST_MODE,
} from '@/src/shared/const';
import { sampleAddTemplate } from '@/fixutures/entities/template';

import { useAddTemplate, useDeleteTemplate } from './mutations';
import template from './queryKeys';
import { addTemplate, deleteTemplate } from './apis';

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
      '새로운 템플릿 등록에 성공하면 전체 키를 초기화하고 토스트 메시지를 등록한다.',
    hook: useAddTemplate,
    mutateArgs: sampleAddTemplate,
    toastMsg: SUCCESS_MESSAGES.ADDED_TEMPLATE,
    toastMode: TOAST_MODE.SUCCESS,
    queryKey: template.all,
    apiMock: addTemplate,
  },
  {
    title:
      '선택된 템플릿 삭제에 성공하면 전체 키를 초기화하고 토스트 메시지를 등록한다.',
    hook: useDeleteTemplate,
    mutateArgs: 100000,
    toastMsg: SUCCESS_MESSAGES.DELETED_TEMPLATE,
    toastMode: TOAST_MODE.SUCCESS,
    queryKey: template.all,
    apiMock: deleteTemplate,
  },
];

const failureTestCases = [
  {
    title: '템플릿 등록에 실패하면 실패 토스트를 등록한다',
    hook: useAddTemplate,
    mutateArgs: sampleAddTemplate,
    toastMsg: ERROR_MESSAGES.ADDED_TEMPLATE,
    toastMode: TOAST_MODE.ERROR,
    apiMock: addTemplate,
  },
  {
    title: '템플릿 삭제에 실패하면 실패 토스트를 등록한다',
    hook: useDeleteTemplate,
    mutateArgs: 100000,
    toastMsg: ERROR_MESSAGES.DELETED_TEMPLATE,
    toastMode: TOAST_MODE.ERROR,
    apiMock: deleteTemplate,
  },
];

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const testHook = (hook, mutateArgs) => {
  const { result } = renderHook(() => hook(), { wrapper: TestProvider });
  act(() =>
    (
      mutateArgs
        ? result.current.mutate(mutateArgs)
        : result.current.mutate()));
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

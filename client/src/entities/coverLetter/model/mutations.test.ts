import { useRouter } from 'next/router';

import {
  act, renderHook, waitFor,
} from '@testing-library/react';

import coverLetter from '@/src/entities/coverLetter/lib/querykeys';

import { useToast } from '@/src/shared/hooks';

import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  TOAST_MODE,
} from '@/src/shared/const';

import {
  sampleCoverLetters,
  sampleReviseCoverLetter,
} from '@/fixutures/entities/coverLetter';
import TestProvider from '@/fixutures/TestProvider';
import {
  addCoverLetter,
  deleteCoverLetter,
  reviseCoverLetter,
} from '@/src/entities/coverLetter/api/apis';

import {
  useDeleteCoverLetter,
  useReviseCoverLetter,
  useWriteCoverLetter,
} from './mutations';

/** 목킹 설정 */
jest.mock('@/src/entities/coverLetter/api/apis');
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
      '자기소개서 등록에 성공하면 전체 키를 초기화하고 토스트 메시지를 등록한다.',
    hook: useWriteCoverLetter,
    mutateArgs: sampleCoverLetters,
    toastMsg: SUCCESS_MESSAGES.ADDED_ESSAY,
    toastMode: TOAST_MODE.SUCCESS,
    queryKey: coverLetter.all,
    apiMock: addCoverLetter,
  },
  {
    title:
      '자기소개서 삭제에 성공하면 전체 키를 초기화하고 토스트 메시지를 등록한다.',
    hook: useDeleteCoverLetter,
    mutateArgs: 100000,
    toastMsg: SUCCESS_MESSAGES.DELETED_ESSAY,
    toastMode: TOAST_MODE.SUCCESS,
    queryKey: coverLetter.all,
    apiMock: deleteCoverLetter,
  },
  {
    title:
      '자기소개서 수정에 성공하면 전체 키를 초기화하고 토스트 메시지를 등록한다.',
    hook: useReviseCoverLetter,
    mutateArgs: sampleReviseCoverLetter,
    toastMsg: `${SUCCESS_MESSAGES.UPDATED_ESSAY}`,
    toastMode: TOAST_MODE.SUCCESS,
    queryKey: coverLetter.all,
    apiMock: reviseCoverLetter,
  },
];

const failureTestCases = [
  {
    title: '자기소개서 등록에 실패하면 실패 토스트를 등록한다',
    hook: useWriteCoverLetter,
    mutateArgs: sampleCoverLetters,
    toastMsg: ERROR_MESSAGES.ADDED_ESSAY,
    toastMode: TOAST_MODE.ERROR,
    apiMock: addCoverLetter,
  },
  {
    title: '자기소개서 삭제에 실패하면 실패 토스트를 등록한다',
    hook: useDeleteCoverLetter,
    mutateArgs: 100000,
    toastMsg: ERROR_MESSAGES.DELETED_ESSAY,
    toastMode: TOAST_MODE.ERROR,
    apiMock: deleteCoverLetter,
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
        title, hook, mutateArgs, toastMode, toastMsg, apiMock,
      }) => {
        it(title, async () => {
          (apiMock as jest.Mock).mockResolvedValue({});
          const { result } = testHook(hook, mutateArgs);
          await waitFor(() => result.current.isSuccess);
          expect(mockInvalidateQueries).toHaveBeenCalledWith({
            queryKey: coverLetter.all,
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

// describe('useWriteCoverLetter', () => {
//   beforeEach(() => {
//     (addCoverLetter as jest.Mock).mockResolvedValue({});
//     setupMocks();
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   const testWriteCoverLetter = () => {
//     const { result } = renderHook(() => useWriteCoverLetter(), {
//       wrapper: TestProvider,
//     });
//     act(() => result.current.mutate(sampleCoverLetters));
//     return { result };
//   };

//   context('자기소개서 등록에 성공하는 경우', () => {
//     it('전체 키를 초기화하여 업데이트한다.', async () => {
//       const { result } = testWriteCoverLetter();

//       await waitFor(() => result.current.isSuccess);
//       expect(mockInvalidateQueries).toHaveBeenCalledWith({
//         queryKey: coverLetter.all,
//       });
//     });

//     it('자기소개서 등록 성공 토스트를 등록한다.', async () => {
//       const { result } = testWriteCoverLetter();

//       await waitFor(() => result.current.isSuccess);
//       expect(showToastMock).toHaveBeenCalledWith(
//         TOAST_MODE.SUCCESS,
//         SUCCESS_MESSAGES.ADDED_ESSAY,
//       );
//     });
//   });

//   context('자기소개서 등록에 실패하는 경우', () => {
//     it('자기소개서 실패 토스트를 등록한다.', async () => {
//       (addCoverLetter as jest.Mock).mockRejectedValueOnce(new Error(''));
//       const { result } = renderHook(() => useWriteCoverLetter(), {
//         wrapper: TestProvider,
//       });

//       act(() => result.current.mutate(sampleCoverLetters));

//       await waitFor(() => result.current.isError);
//       expect(showToastMock).toHaveBeenCalledWith(
//         TOAST_MODE.ERROR,
//         ERROR_MESSAGES.ADDED_ESSAY,
//       );
//     });
//   });
// });

// describe('useDeleteCoverLetter', () => {
//   beforeEach(() => {
//     (deleteCoverLetter as jest.Mock).mockResolvedValue({});
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   const testDeleteCoverLetter = () => {
//     const { result } = renderHook(() => useDeleteCoverLetter(), {
//       wrapper: TestProvider,
//     });
//     act(() => result.current.mutate(100000));
//     return { result };
//   };

//   context('자기소개서 삭제에 성공하는 경우', () => {
//     beforeEach(() => {
//       (deleteCoverLetter as jest.Mock).mockResolvedValue({});
//     });

//     it('전체 키를  초기화하여 업데이트한다.', async () => {
//       const { result } = testDeleteCoverLetter();
//       await waitFor(() => result.current.isSuccess);
//       expect(mockInvalidateQueries).toHaveBeenCalledWith({
//         queryKey: coverLetter.all,
//       });
//     });
//   });

//   context('자기소개서 삭제에 실패하는 경우', () => {
//     it('삭제 실패에 대한 토스트를 등록한다.', async () => {
//       (deleteCoverLetter as jest.Mock).mockRejectedValue(new Error(''));
//       const { result } = testDeleteCoverLetter();
//       await waitFor(() => result.current.isSuccess);
//       expect(showToastMock).toHaveBeenCalledWith(
//         TOAST_MODE.ERROR,
//         ERROR_MESSAGES.DELETED_ESSAY,
//       );
//     });
//   });
// });

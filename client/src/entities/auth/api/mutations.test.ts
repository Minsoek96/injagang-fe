import { useRouter } from 'next/router';

import Cookies from 'js-cookie';

import { act, renderHook, waitFor } from '@testing-library/react';
import TestProvider from '@/fixutures/TestProvider';

import {
  changePassword,
  signinData,
  signinResponse,
  signUpDate,
  userinfoResponse,
} from '@/fixutures/entities/auth';

import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  TOAST_MODE,
  TOKEN_KEYS,
} from '@/src/shared/const';

import { useToast } from '@/src/shared/hooks';

import {
  authInfo,
  checkOut,
  login,
  nickChange,
  passwordChange,
  signup,
} from './apis';
import {
  useChangeNick,
  useChangePassWord,
  useFetchCheckOut,
  useFetchSignin,
  useFetchSignup,
  useFetchUserInfo,
} from './mutations';

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
const context = describe;

const setupMocks = () => {
  (useRouter as jest.Mock).mockReturnValue({ replace: replaceMock });
  (useToast as jest.Mock).mockReturnValue({
    showToast: showToastMock,
  });
};

/** 회원가입 */
describe('useFetchSignup', () => {
  beforeEach(() => {
    setupMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const callFetchSignup = () => {
    const { result } = renderHook(() => useFetchSignup(), {
      wrapper: TestProvider,
    });
    act(() => result.current.mutate(signUpDate));
    return { result };
  };

  context('회원가입을 성공적으로 처리한 경우', () => {
    it('유저 등록 메시지를 등록한다.', async () => {
      const { result } = callFetchSignup();
      await waitFor(() => result.current.isSuccess);
      expect(showToastMock).toHaveBeenCalledWith(
        TOAST_MODE.SUCCESS,
        SUCCESS_MESSAGES.ADDED_USER,
      );
    });
    it('로그인 페이지로 이동한다.', async () => {
      const { result } = callFetchSignup();
      await waitFor(() => result.current.isSuccess);
      expect(replaceMock).toHaveBeenCalledWith('login');
    });
  });

  context('회원가입을 실패한 경우', () => {
    it('실패 메시지를 등록한다.', async () => {
      (signup as jest.Mock).mockRejectedValue(new Error('error'));
      const { result } = callFetchSignup();
      await waitFor(() => result.current.isSuccess);
      expect(showToastMock).toHaveBeenCalledWith(
        TOAST_MODE.ERROR,
        ERROR_MESSAGES.ADDED_USER,
      );
    });
  });
});

/** 로그인 */
describe('useFetchSignin', () => {
  beforeEach(() => {
    setupMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const callFetchSignin = () => {
    const { result } = renderHook(() => useFetchSignin(), {
      wrapper: TestProvider,
    });

    act(() => {
      result.current.mutate(signinData);
    });
    return { result };
  };

  context('로그인을 성공적으로 처리한 경우', () => {
    it('유저의 정보를 설정한다.', async () => {
      (login as jest.Mock).mockResolvedValueOnce({ data: signinResponse });
      const { result } = callFetchSignin();
      await waitFor(() => result.current.isSuccess);

      expect(Cookies.set).toHaveBeenCalledWith(
        TOKEN_KEYS.ACCESS_TOKEN,
        signinResponse.access,
        { expires: 1 },
      );
      expect(Cookies.set).toHaveBeenCalledWith(
        'userId',
        signinResponse.userId,
        {
          expires: 1,
        },
      );
    });

    it('메인 페이지로 이동한다.', async () => {
      (login as jest.Mock).mockResolvedValueOnce({ data: signinResponse });
      const { result } = callFetchSignin();
      await waitFor(() => result.current.isSuccess);
      expect(replaceMock).toHaveBeenCalledWith('/');
    });
  });

  context('로그인에 실패한 경우', () => {
    it('ErrorMessage가 등록된다', async () => {
      (login as jest.Mock).mockRejectedValueOnce(new Error('error'));
      const { result } = callFetchSignin();

      await waitFor(() => result.current.isError);
      expect(result.current.errorMsg).toBe(ERROR_MESSAGES.DOESN_T_MATCH);
    });
  });
});

/** 로그아웃 */
describe('useFetchCheckOut', () => {
  beforeEach(() => {
    setupMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const callCheckOut = () => {
    const { result } = renderHook(() => useFetchCheckOut(), {
      wrapper: TestProvider,
    });

    act(() => result.current.mutate());
    return { result };
  };

  context('로그아웃에 성공한 경우', () => {
    it('등록된 유저정보를 삭제한다.', async () => {
      const { result } = callCheckOut();
      await waitFor(() => result.current.isSuccess);
      expect(Cookies.remove).toHaveBeenCalledWith(TOKEN_KEYS.ACCESS_TOKEN);
      expect(Cookies.remove).toHaveBeenCalledWith('userId');
    });
    it('유저에게 성공을 알림', async () => {
      const { result } = callCheckOut();
      await waitFor(() => result.current.isSuccess);
      expect(showToastMock).toHaveBeenCalledWith(
        TOAST_MODE.SUCCESS,
        SUCCESS_MESSAGES.CHECK_OUT('게스트'),
      );
    });
  });

  context('로그아웃에 실패한 경우', () => {
    it('에러 토스트가 설정된다.', async () => {
      (checkOut as jest.Mock).mockRejectedValueOnce(new Error('error'));
      const { result } = callCheckOut();
      await waitFor(() => result.current.isError);
      expect(showToastMock).toHaveBeenCalledWith(
        TOAST_MODE.ERROR,
        ERROR_MESSAGES.CHECK_OUT,
      );
    });
  });
});

/** 유저 정보 조회 */
describe('useFetchUserInfo', () => {
  beforeEach(() => {
    setupMocks();
    (authInfo as jest.Mock).mockResolvedValue(userinfoResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const callFetchUserInfo = () => {
    const { result } = renderHook(() => useFetchUserInfo(), {
      wrapper: TestProvider,
    });
    act(() => result.current.mutate());
    return { result };
  };

  it('유저의 닉네임 정보와 권한을 가져온다', async () => {
    const { result } = callFetchUserInfo();
    await waitFor(() => result.current.isSuccess);
    expect(result.current.data?.nickname).toBe(userinfoResponse.nickname);
    expect(result.current.data?.role).toBe(userinfoResponse.role);
  });

  it('성공시 메시지를 알림', async () => {
    const { result } = callFetchUserInfo();
    await waitFor(() => result.current.isSuccess);
    expect(showToastMock).toHaveBeenCalledWith(
      TOAST_MODE.SUCCESS,
      SUCCESS_MESSAGES.GET_PROFILE(userinfoResponse.nickname),
    );
  });

  it('실패시 메시지를 알림', async () => {
    (authInfo as jest.Mock).mockRejectedValueOnce(new Error('error'));
    const { result } = callFetchUserInfo();
    act(() => result.current.mutate());
    await waitFor(() => result.current.isSuccess);
    expect(showToastMock).toHaveBeenCalledWith(
      TOAST_MODE.ERROR,
      ERROR_MESSAGES.GET_PROFILE,
    );
  });
});

/** 닉네임 변경 */
describe('useChangeNick', () => {
  beforeEach(() => {
    setupMocks();
    (nickChange as jest.Mock).mockResolvedValue({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const callChangeNick = () => {
    const changeNickname = 'tester303';
    const { result } = renderHook(() => useChangeNick(), {
      wrapper: TestProvider,
    });
    act(() => result.current.mutate(changeNickname));
    return { result };
  };

  it('닉네임 변경 성공 메시지를 등록한다.', async () => {
    const { result } = callChangeNick();
    await waitFor(() => result.current.isSuccess);

    expect(showToastMock).toHaveBeenCalledWith(
      TOAST_MODE.SUCCESS,
      SUCCESS_MESSAGES.CHANGE_NICK,
    );
  });
  it('닉네임 변경 실패 메시지를 등록한다.', async () => {
    (nickChange as jest.Mock).mockRejectedValueOnce(new Error('error'));
    const { result } = callChangeNick();

    await waitFor(() => result.current.isSuccess);
    expect(showToastMock).toHaveBeenCalledWith(
      TOAST_MODE.ERROR,
      ERROR_MESSAGES.CHANGE_NICK,
    );
  });
});

/** 패스워드 변경 */
describe('useChangePassWord', () => {
  beforeEach(() => {
    setupMocks();
    (passwordChange as jest.Mock).mockResolvedValue({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const callChangePw = () => {
    const { result } = renderHook(() => useChangePassWord(), {
      wrapper: TestProvider,
    });
    act(() => result.current.mutate(changePassword));
    return { result };
  };

  it('패스워드 변경 성공 메시지를 등록한다.', async () => {
    const { result } = callChangePw();
    await waitFor(() => result.current.isSuccess);
    expect(showToastMock).toHaveBeenCalledWith(
      TOAST_MODE.SUCCESS,
      SUCCESS_MESSAGES.CHANGE_PASSWORD,
    );
  });
  it('패스워드 변경 실패 메시지를 등록한다.', async () => {
    (passwordChange as jest.Mock).mockRejectedValueOnce(new Error('error'));
    const { result } = callChangePw();
    await waitFor(() => result.current.isSuccess);
    expect(showToastMock).toHaveBeenCalledWith(
      TOAST_MODE.ERROR,
      ERROR_MESSAGES.DOESN_T_MATCH_PASSWORD,
    );
  });
});

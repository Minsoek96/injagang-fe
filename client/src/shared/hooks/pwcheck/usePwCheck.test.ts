import { renderHook } from '@testing-library/react';

import { PASSWORD_ERROR_MESSAGE } from '@/src/shared/const';

import usePwCheck from './usePwCheck';

describe('usePwCheck 훅', () => {
  const runTest = (
    password: string,
    expectedIsValid: boolean,
    expectedErrorMessage: string,
  ) => {
    const { result } = renderHook(() => usePwCheck({ password }));
    expect(result.current.isValid).toBe(expectedIsValid);
    expect(result.current.errorMessage).toBe(expectedErrorMessage);
  };

  describe('패스워드 유효성 검사', () => {
    it('패스워드가 10자 미만이면 에러 메시지를 반환해야 한다', () => {
      runTest('short', false, PASSWORD_ERROR_MESSAGE.LENGTH);
    });

    it('패스워드에 대문자가 없으면 에러 메시지를 반환해야 한다', () => {
      runTest('lowercase1!', false, PASSWORD_ERROR_MESSAGE.LOWER);
    });

    it('패스워드에 소문자가 없으면 에러 메시지를 반환해야 한다', () => {
      runTest('UPPERCASE1!', false, PASSWORD_ERROR_MESSAGE.UPPER);
    });

    it('패스워드에 숫자가 없으면 에러 메시지를 반환해야 한다', () => {
      runTest('NoNumbers!', false, PASSWORD_ERROR_MESSAGE.NUMBER);
    });

    it('패스워드에 특수 문자가 없으면 에러 메시지를 반환해야 한다', () => {
      runTest('NoSpecial1', false, PASSWORD_ERROR_MESSAGE.SPECIAL);
    });

    it('유효한 패스워드면 에러 메시지가 없어야 한다', () => {
      runTest('Valid1Password!', true, '');
    });
  });
});

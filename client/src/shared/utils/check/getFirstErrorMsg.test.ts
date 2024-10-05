import { FieldErrors, FieldError } from 'react-hook-form';
import { getFirstErrorMessage } from './getFirstErrorMessage';

interface FormData {
  firstName?: string;
  lastName?: string;
}

describe('getFirstErrorMessage', () => {
  it('errorObj가 undefined일 경우 null을 반환해야 합니다.', () => {
    expect(getFirstErrorMessage(undefined)).toBeNull();
  });

  it('errorObj가 비어있을 경우 null을 반환해야 합니다.', () => {
    const errors: FieldErrors<FormData> = {};
    expect(getFirstErrorMessage(errors)).toBeNull();
  });

  it('첫 번째 에러 메시지를 올바르게 반환해야 합니다.', () => {
    const errors: FieldErrors<FormData> = {
      firstName: { message: '이름을 입력해야 합니다.', type: 'required' } as FieldError,
      lastName: { message: '성씨를 입력해야 합니다.', type: 'required' } as FieldError,
    };
    expect(getFirstErrorMessage(errors)).toBe('이름을 입력해야 합니다.');
  });

  it('중첩된 에러 메시지를 올바르게 반환해야 합니다.', () => {
    const errors: FieldErrors<FormData> = {
      firstName: {
        message: '이름을 입력해야 합니다.',
        type: 'required',
      } as FieldError,
      lastName: {
        message: '성씨를 입력해야 합니다.',
        type: 'required',
      } as FieldError,
    };
    expect(getFirstErrorMessage(errors)).toBe('이름을 입력해야 합니다.');
  });

  it('메시지가 없을 경우 빈문자열을 반환해야 합니다.', () => {
    const errors: FieldErrors<FormData> = {
      firstName: {
        message: '',
        type: 'required',
      } as FieldError,
    };
    expect(getFirstErrorMessage(errors)).toBe('');
  });
});

import { renderHook } from '@testing-library/react';

import usePassword from '@/src/features/myprofile/password/model/usePassword';

import { authMutations } from '@/src/entities/auth';

import { MODAL_MESSAGES } from '@/src/shared/const';
import { useModal } from '@/src/shared/hooks';

jest.mock('@/src/entities/auth', () => ({
  authMutations: {
    useChangePassWord: jest.fn(),
  },
}));

jest.mock('@/src/shared/hooks', () => ({
  useModal: jest.fn(),
}));

describe('usePassword', () => {
  const mockSetModal = jest.fn();
  const mockConfirmPasswordChange = jest.fn();

  const changeNewPassword = {
    nowPassword: 'test',
    changePassword: 'newPassword',
    changePasswordCheck: 'newPassword',
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (authMutations.useChangePassWord as jest.Mock).mockReturnValue({
      mutate: mockConfirmPasswordChange,
    });

    (useModal as jest.Mock).mockReturnValue({
      setModal: mockSetModal,
    });
  });

  it('닉네임 변경 시 setModal이 호출된다.', () => {
    const { result } = renderHook(() => usePassword());
    result.current.confirmChangePassword(changeNewPassword);
    expect(mockSetModal).toHaveBeenCalledWith({
      onAction: expect.any(Function),
      title: MODAL_MESSAGES.MSG,
      message: '비밀번호 : **** 변경하시겠습니까?',
    });
  });

  it('onAction 호출 시 confirmPassword가 호출된다.', () => {
    const { result } = renderHook(() => usePassword());

    result.current.confirmChangePassword(changeNewPassword);
    const { onAction } = mockSetModal.mock.calls[0][0];
    onAction();
    expect(mockConfirmPasswordChange).toHaveBeenCalledWith(changeNewPassword);
  });
});

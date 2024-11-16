import { renderHook } from '@testing-library/react';

import { authMutations } from '@/src/entities/auth';
import { useModal } from '@/src/shared/hooks';
import { MODAL_MESSAGES } from '@/src/shared/const';

import useNick from './useNick';

jest.mock('@/src/entities/auth', () => ({
  authMutations: {
    useChangeNick: jest.fn(),
  },
}));

jest.mock('@/src/shared/hooks', () => ({
  useModal: jest.fn(),
}));

describe('useNick', () => {
  const mockSetModal = jest.fn();
  const mockConfirmNickNameChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (authMutations.useChangeNick as jest.Mock).mockReturnValue({
      mutate: mockConfirmNickNameChange,
    });

    (useModal as jest.Mock).mockReturnValue({
      setModal: mockSetModal,
    });
  });

  it('닉네임 변경 시 setModal이 호출된다.', () => {
    const { result } = renderHook(() => useNick());

    result.current.changeNickname('NewNickName');
    expect(mockSetModal).toHaveBeenCalledWith({
      onAction: expect.any(Function),
      title: MODAL_MESSAGES.MSG,
      message: '닉네임 : NewNickName 변경하시겠습니까?',
    });
  });

  it('onAction 호출 시 confirmNickNameChange가 호출된다.', () => {
    const { result } = renderHook(() => useNick());

    result.current.changeNickname('NewNickName');
    // 모달에서 onAction 콜백을 가져와 실행
    const { onAction } = mockSetModal.mock.calls[0][0];
    onAction();

    expect(mockConfirmNickNameChange).toHaveBeenCalledWith('NewNickName');
  });
});

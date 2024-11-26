import { renderHook } from '@testing-library/react';

import useLogout from '@/src/features/auth/logout/model/useLogout';

import { authMutations } from '@/src/entities/auth';

import { useModal } from '@/src/shared/hooks';

jest.mock('@/src/shared/hooks', () => ({
  useModal: jest.fn(),
}));

jest.mock('@/src/entities/auth', () => ({
  authMutations: {
    useFetchCheckOut: jest.fn(),
  },
}));

const context = describe;
describe('useLogout', () => {
  const mockSetModal = jest.fn();
  const mockCheckOut = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useModal as unknown as jest.Mock).mockReturnValue({
      setModal: mockSetModal,
    });

    (authMutations.useFetchCheckOut as jest.Mock).mockReturnValue({
      mutate: mockCheckOut,
    });
  });

  context('onCheckOut을 호출 하면', () => {
    it('메시지가 전달된다.', () => {
      const { result } = renderHook(() => useLogout());

      result.current.onCheckOut();

      expect(mockSetModal).toHaveBeenCalledWith({
        onAction: expect.any(Function),
        title: 'Message',
        message: '정말 로그아웃을 원하시나요?',
      });
    });

    it('mockCheckOut이 실행된다.', () => {
      const { result } = renderHook(() => useLogout());
      result.current.onCheckOut();
      const modalAction = mockSetModal.mock.calls[0][0].onAction;
      modalAction();
      expect(mockCheckOut).toHaveBeenCalled();
    });
  });
});

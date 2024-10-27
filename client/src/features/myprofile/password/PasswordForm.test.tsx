import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';
import PasswordForm from '@/src/features/myprofile/password/PasswordForm';

const testLabels = {
  nowPassword: '현재 비밀번호',
  changePassword: '변경 비밀번호',
  changePasswordCheck: '비밀번호 확인',
};

const context = describe;
describe('PasswordForm', () => {
  const mockSubmit = jest.fn();

  const renderComponent = () => {
    render(
      <TestProvider>
        <PasswordForm labels={testLabels} onSubmit={mockSubmit} />
      </TestProvider>,
    );
  };

  const fillFormAndSubmit = (
    currentPassword : string,
    newPassword: string,
    confirmPassword: string,
  ) => {
    if (currentPassword) {
      fireEvent.change(screen.getByLabelText(testLabels.nowPassword), {
        target: { value: currentPassword },
      });
    }
    if (newPassword) {
      fireEvent.change(screen.getByLabelText(testLabels.changePassword), {
        target: { value: newPassword },
      });
    }
    if (confirmPassword) {
      fireEvent.change(screen.getByLabelText(testLabels.changePasswordCheck), {
        target: { value: confirmPassword },
      });
    }

    fireEvent.click(screen.getByRole('button', { name: /변경/i }));
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('렌더링 테스트', () => {
    it('인풋 입력창이 렌더링된다.', () => {
      Object.values(testLabels).forEach((label) => {
        renderComponent();
        const searchItem = screen.getByLabelText(label);
        expect(searchItem).toBeInTheDocument();
      });
    });

    it('변경 버튼이 렌더링된다.', () => {
      renderComponent();
      const submitButton = screen.getByRole('button', { name: /변경/i });
      expect(submitButton).toBeInTheDocument();
    });
  });

  context('유효성 검사 테스트', () => {
    it('현재 비밀번호를 입력하지 않고 제출했을 때 에러 메시지를 표시한다.', async () => {
      renderComponent();
      fillFormAndSubmit('', 'NewPassword', 'NewPassword');

      expect(mockSubmit).not.toHaveBeenCalled();
      await waitFor(() => {
        const errorMessage = screen.getByText('현재 비밀번호를 입력해주세요.');
        expect(errorMessage).toBeInTheDocument();
      });
    });

    it('변경 비밀번호를 8자 이하를 입력할 경우 에러 메시지를 표시한다.', async () => {
      renderComponent();
      fillFormAndSubmit('OldPassword', 'test', '');

      await waitFor(() => {
        const errorMessage = screen.getByText(
          '비밀번호는 최소 8자리여야 합니다.',
        );
        expect(errorMessage).toBeInTheDocument();
      });
    });

    it('대문자, 소문자, 숫자를 포함하지 않을 경우 에러 메시지를 표시한다.', async () => {
      renderComponent();
      fillFormAndSubmit('OldPassword', 'NewPassword', '');

      await waitFor(() => {
        const errorMessage = screen.getByText(
          '비밀번호는 대문자, 소문자, 숫자를 포함해야 합니다.',
        );
        expect(errorMessage).toBeInTheDocument();
      });
    });

    it('비밀번호 확인이 틀린 경우 에러 메시지를 표출한다.', async () => {
      renderComponent();
      fillFormAndSubmit('OldPassword', 'P@ssw0rd', 'PP@ssw0rd');

      await waitFor(() => {
        const errorMessage = screen.getByText('비밀번호가 일치하지 않습니다.');
        expect(errorMessage).toBeInTheDocument();
      });
    });
  });

  context('제출 테스트', () => {
    it('모든 필드의 유효성을 통과하면 제출이 된다.', async () => {
      renderComponent();
      fillFormAndSubmit('OldPassword', 'P@ssw0rd', 'P@ssw0rd');

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalled();
      });
    });
  });
});

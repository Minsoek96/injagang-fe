import {
  fireEvent, render, screen,
  waitFor,
} from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';
import LoginForm from '@/src/features/auth/login/LoginForm';

const context = describe;

describe('LoginForm', () => {
  const mockSubmit = jest.fn();
  const mockNavigate = jest.fn();
  const testLabels = [
    { key: 'loginId', label: '아이디', type: 'text' },
    { key: 'password', label: '비밀번호', type: 'password' },
  ];

  const renderComponent = () => {
    render(
      <TestProvider>
        <LoginForm
          onSubmit={mockSubmit}
          labels={testLabels}
          navigateToSignUp={mockNavigate}
        />
      </TestProvider>,
    );
  };

  /** 폼 입력 수행 함수 */
  const fillFormAndSubmit = (formData: Record<string, string>) => {
    testLabels.forEach((item) => {
      const value = formData[item.key];
      if (value) {
        const searchItem = screen.getByLabelText(item.label);
        fireEvent.change(searchItem, { target: { value } });
      }
    });
    fireEvent.click(screen.getByRole('button', { name: /로그인/i }));
  };

  context('렌더링 테스트', () => {
    it('입력창이 렌더링 된다', () => {
      renderComponent();
      testLabels.forEach((item) => {
        const searchItem = screen.getByLabelText(item.label);
        expect(searchItem).toBeInTheDocument();
      });
    });

    it('로그인, 회원가입 버튼이 렌더링 된다.', () => {
      renderComponent();
      const searchLogin = screen.getByRole('button', { name: /로그인/i });
      const searchSignup = screen.getByRole('button', { name: /회원가입/i });
      expect(searchLogin).toBeInTheDocument();
      expect(searchSignup).toBeInTheDocument();
    });
  });

  context('유효성 검사 테스트', () => {
    it('아이디 입력을 하지 않는 경우 오류 메시지를 출력한다.', async () => {
      renderComponent();
      fillFormAndSubmit({ loginId: '', password: 'password' });
      await waitFor(() => {
        const errorMessage = screen.getByText('아이디를 입력해주세요.');
        expect(errorMessage).toBeInTheDocument();
      });
    });

    it('패스워드 입력을 하지 않는 경우 오류 메시지를 출력한다.', async () => {
      renderComponent();
      fillFormAndSubmit({ loginId: 'tester', password: '' });
      await waitFor(() => {
        const errorMessage = screen.getByText('비밀번호를 입력해주세요.');
        expect(errorMessage).toBeInTheDocument();
      });
    });

    it('패스워드 8자리 이하의 경우 오류 메시지를 출력한다.', async () => {
      renderComponent();
      fillFormAndSubmit({ loginId: 'tester', password: 'test' });
      await waitFor(() => {
        const errorMessage = screen.getByText('비밀번호는 최소 8자리여야 합니다.');
        expect(errorMessage).toBeInTheDocument();
      });
    });
  });

  context('모든 유효성을 검사를 통과한 경우', () => {
    it('mockSubmit이 호출된다.', async () => {
      renderComponent();
      fillFormAndSubmit({ loginId: 'tester', password: 'password' });
      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalled();
      });
    });
  });

  context('회원가입 버튼을 클릭하는 경우', () => {
    it('navigate 함수가 호출된다.', async () => {
      renderComponent();
      const searchSignup = screen.getByRole('button', { name: /회원가입/i });
      expect(searchSignup).toBeInTheDocument();
      fireEvent.click(searchSignup);
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalled();
      });
    });
  });
});

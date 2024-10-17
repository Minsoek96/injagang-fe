import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';
import SignUpForm from '@/src/features/auth/signup/SignUpForm';

const context = describe;
describe('SignUpFrom', () => {
  const mockSubmit = jest.fn();
  const testLabels = [
    { key: 'loginId', label: '아이디', type: 'text' },
    { key: 'password', label: '비밀번호', type: 'password' },
    { key: 'passwordCheck', label: '비밀번호 확인', type: 'password' },
    { key: 'email', label: '이메일', type: 'email' },
    { key: 'nickname', label: '닉네임', type: 'text' },
  ];

  const renderComponent = () => {
    render(
      <TestProvider>
        <SignUpForm onSubmit={mockSubmit} labels={testLabels} />
      </TestProvider>,
    );
  };

  const fillFormAndSubmit = <T extends Record<string, unknown>>(
    formData: T,
  ): void => {
    testLabels.forEach((item) => {
      const value = formData[item.key];
      if (value) {
        const searchItem = screen.getByLabelText(item.label);
        fireEvent.change(searchItem, { target: { value } });
      }
    });
    const searchButton = screen.getByRole('button', { name: /회원가입/i });
    fireEvent.click(searchButton);
  };

  context('렌더링 테스트', () => {
    it('입력 필드가 렌더링 된다.', () => {
      renderComponent();
      testLabels.forEach((item) => {
        const searchItem = screen.getByLabelText(item.label);
        expect(searchItem).toBeInTheDocument();
      });
    });

    it('제출 버튼이 렌더링 된다.', () => {
      renderComponent();
      const searchButton = screen.getByRole('button', { name: /회원가입/i });
      expect(searchButton).toBeInTheDocument();
    });
  });

  context('유효성 검사 테스트', () => {
    it('입력창을 비우는 경우 에러메시지가 출력된다.', async () => {
      renderComponent();
      fillFormAndSubmit({
        loginId: '',
        password: '',
        passwordCheck: '',
        email: '',
        nickname: '',
      });
      await waitFor(() => {
        const loginIdEmpty = screen.getByText('아이디를 입력해주세요.');
        const password = screen.getByText('비밀번호를 입력해주세요.');
        const passwordCheck = screen.getByText('비밀번호를 재입력해주세요.');
        const email = screen.getByText('이메일을 입력해주세요.');
        const nickname = screen.getByText('닉네임을 입력해주세요.');
        expect(loginIdEmpty).toBeInTheDocument();
        expect(password).toBeInTheDocument();
        expect(passwordCheck).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        expect(nickname).toBeInTheDocument();
      });
    });

    it('비밀번호 재입력이 일치하지 않는 경우 에러메시지가 출력된다', async () => {
      renderComponent();
      fillFormAndSubmit({
        loginId: 'tester',
        password: 'P@ssword12',
        passwordCheck: 'P@ssword1',
        email: 'test@test.com',
        nickname: 'test',
      });

      await waitFor(() => {
        const checkError = screen.getByText(
          '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
        );
        expect(checkError).toBeInTheDocument();
      });
    });
  });

  context('모든 유효성 검사가 통과한 경우', () => {
    it('mockSubmit이 제출이 된다.', async () => {
      renderComponent();
      fillFormAndSubmit({
        loginId: 'tester',
        password: 'P@ssword12',
        passwordCheck: 'P@ssword12',
        email: 'test@test.com',
        nickname: 'test',
      });

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalled();
      });
    });
  });
});

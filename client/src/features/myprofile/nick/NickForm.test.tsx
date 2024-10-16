import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';

import NickForm from '@/src/features/myprofile/nick/NickForm';

describe('NickForm', () => {
  const mockSubmit = jest.fn();
  const renderComponent = () => {
    render(
      <TestProvider>
        <NickForm onSubmit={mockSubmit} />
      </TestProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('닉네임 입력창이 렌더링된다.', () => {
    renderComponent();
    const searchNick = screen.getByText('닉네임');
    expect(searchNick).toBeInTheDocument();
  });

  it('변경 수락 버튼이 렌더링된다.', () => {
    renderComponent();
    const submitButton = screen.getByRole('button', { name: /변경/i });
    expect(submitButton).toBeInTheDocument();
  });

  it('닉네임을 입력하지 않고 제출했을 때 에러 메시지를 표시한다.', async () => {
    renderComponent();
    const submitButton = screen.getByRole('button', { name: /변경/i });
    fireEvent.click(submitButton);
    expect(mockSubmit).not.toHaveBeenCalled();
    await waitFor(() => {
      const errorMessage = screen.getByText('닉네임을 입력해주세요.');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('닉네임 입력 후 제출하면 mockSubmit이 호출된다', async () => {
    renderComponent();
    const searchNick = screen.getByLabelText('닉네임');
    const submitButton = screen.getByRole('button', { name: /변경/i });
    fireEvent.change(searchNick, { target: { value: 'NewNickName' } });
    expect(mockSubmit).not.toHaveBeenCalled();
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
  });
});

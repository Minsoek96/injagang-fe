import { render, screen } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';

import InterviewRandomSetting from './InterviewRandomSetting';

describe('InterviewRandomSetting', () => {
  const renderComponent = () => {
    render(
      <TestProvider>
        <InterviewRandomSetting />
      </TestProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('모든 입력 필드와 버튼이 렌더링 된다.', () => {
    renderComponent();

    expect(screen.getByLabelText('CS질문')).toBeInTheDocument();
    expect(screen.getByLabelText('상황 판단 질문')).toBeInTheDocument();
    expect(screen.getByLabelText('직무 적합성 질문')).toBeInTheDocument();
    expect(screen.getByLabelText('성격 질문')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '질문 불러오기' }),
    ).toBeInTheDocument();
  });

  it('필드 메시지가 출력된다.', () => {
    renderComponent();

    expect(screen.getByText(/최소 하나 이상/)).toBeInTheDocument();
  });
});

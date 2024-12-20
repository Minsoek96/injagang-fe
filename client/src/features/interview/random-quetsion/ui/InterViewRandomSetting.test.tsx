import { render, screen } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';

import InterViewRandomSetting from './InterViewRandomSetting';

describe('InterViewRandomSetting', () => {
  const renderComponent = () => {
    render(
      <TestProvider>
        <InterViewRandomSetting />
      </TestProvider>,
    );
  };

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
});

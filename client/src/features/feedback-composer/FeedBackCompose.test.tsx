import { render, screen } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';
import FeedBackComposer from '@/src/features/feedback-composer/FeedBackComposer';

describe('FeedBackComposer', () => {
  const renderComponent = () => {
    render(
      <TestProvider>
        <FeedBackComposer />
      </TestProvider>,
    );
  };

  it('첨삭 내용이 렌더링 된다.', () => {
    renderComponent();
    const searchCorrection = screen.getByText(/현재 선택된 문장/);
    expect(searchCorrection).toBeInTheDocument();
  });

  it('피드백 작성이 인풋이 렌더링 된다.', () => {
    renderComponent();
    const searchInput = screen.getByPlaceholderText(/피드백을 작성해주세요/);
    expect(searchInput).toBeInTheDocument();
  });

  it('비우기와 작성 버튼이 렌더링된다.', () => {
    renderComponent();
    const searchClear = screen.getByRole('button', { name: '비우기' });
    const searchSubmit = screen.getByRole('button', { name: '작성' });
    expect(searchClear).toBeInTheDocument();
    expect(searchSubmit).toBeInTheDocument();
  });
});

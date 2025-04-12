import { render, screen } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';

import FeedbackFooter from './FeedbackFooter';

describe('FeedbackFooter', () => {
  const mockQnaList = Array.from({ length: 5 }, (_, idx) => 10001 + idx);
  const mockClear = jest.fn();
  const mockSubmit = jest.fn();

  const renderComponents = () => {
    render(
      <TestProvider>
        <FeedbackFooter
          qnaIdList={mockQnaList}
          handleClear={mockClear}
          handleSubmit={mockSubmit}
        />
      </TestProvider>,
    );
  };

  it('폼 버튼이 렌더링된다.', () => {
    renderComponents();
    const searchClear = screen.getByRole('button', { name: '비우기' });
    const searchSubmit = screen.getByRole('button', { name: '작성' });
    expect(searchClear).toBeInTheDocument();
    expect(searchSubmit).toBeInTheDocument();
  });

  it('피드백 버튼이 렌더링 된다.', () => {
    renderComponents();
    mockQnaList.forEach((_, index) => {
      const searchButton = screen.getByRole('button', { name: String(index + 1) });
      expect(searchButton).toBeInTheDocument();
    });
  });
});

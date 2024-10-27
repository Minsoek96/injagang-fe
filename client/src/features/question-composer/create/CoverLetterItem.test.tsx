import { render, screen } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';

import CoverLetterItem from './CoverLetterItem';

describe('CoverLetterItem', () => {
  const mockQuestion = 'Test-Question';
  const mockAnswer = 'Test-Answer';
  const renderComponent = () => {
    render(
      <TestProvider>
        <CoverLetterItem question={mockQuestion} answer={mockAnswer} />
      </TestProvider>,
    );
  };
  it('질문와 답변이 렌더링 된다.', () => {
    renderComponent();
    const searchQuestion = screen.getByText(mockQuestion);
    const searchAnswer = screen.getByText(mockAnswer);
    expect(searchQuestion).toBeInTheDocument();
    expect(searchAnswer).toBeInTheDocument();
  });
});

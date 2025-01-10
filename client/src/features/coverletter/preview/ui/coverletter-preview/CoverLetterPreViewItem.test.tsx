import { render, screen } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';

import CoverLetterPreViewItem from './CoverLetterPreViewItem';

describe('CoverLetterPreviewItem', () => {
  const renderCoverLetterPreviewItem = (idx: number, question: string) => {
    render(
      <TestProvider>
        <CoverLetterPreViewItem idx={idx} question={question} />
      </TestProvider>,
    );
  };

  it('선택된 자소서 질문 아이템을 출력한다.', () => {
    const questionId = 10001;
    const questionItem = '테스트질문';
    renderCoverLetterPreviewItem(questionId, questionItem);
    const searchNum = screen.getByText(RegExp((questionId + 1).toString()));
    const searchItem = screen.getByText(RegExp(questionItem));
    expect(searchItem).toBeInTheDocument();
    expect(searchNum).toBeInTheDocument();
  });
});

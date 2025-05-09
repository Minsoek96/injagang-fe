import { render, screen } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';
import PlayListItem from './PlayListItem';

describe('UserQuestionPlayListItem', () => {
  const mockHandleRemoveText = jest.fn();

  const renderComponent = () => {
    render(
      <TestProvider>
        <PlayListItem
          item="테스트 질문"
          handleRemoveText={mockHandleRemoveText}
        />
      </TestProvider>,
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('질문 항목을 렌더링한다', () => {
    renderComponent();
    const questionItem = screen.getByText('테스트 질문');
    expect(questionItem).toBeInTheDocument();
  });
});

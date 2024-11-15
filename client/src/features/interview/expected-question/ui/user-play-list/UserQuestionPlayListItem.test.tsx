import { render, screen, fireEvent } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';
import UserQuestionPlayListItem from './UserQuestionPlayListItem';

describe('UserQuestionPlayListItem', () => {
  const mockHandleRemoveText = jest.fn();

  const renderComponent = () => {
    render(
      <TestProvider>
        <UserQuestionPlayListItem
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

  it('삭제 버튼 클릭 시 애니메이션 후 handleRemoveText가 호출된다', () => {
    jest.useFakeTimers();

    renderComponent();

    const deleteButton = screen.getByText('삭제');
    fireEvent.click(deleteButton);

    // 애니메이션 상태가 변경되었는지 확인
    expect(screen.getByText('테스트 질문')).toHaveStyle('opacity: 0');
    jest.runAllTimers();
  });
});

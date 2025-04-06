import {
  render, screen, fireEvent, act,
} from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';
import UserQuestionPlayList from './UserQuestionPlayList';
import useExpetedPlayList from '../../model/useExpectedPlayList';

jest.mock('../../model/useExpectedPlayList');

describe('UserQuestionPlayList', () => {
  const mockHandleAddText = jest.fn();
  const mockHandleRemoveText = jest.fn();
  const mockRoleAction = jest.fn();

  const renderComponent = () => {
    render(
      <TestProvider>
        <UserQuestionPlayList />
      </TestProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useExpetedPlayList as jest.Mock).mockReturnValue({
      userPlayList: ['Question 1', 'Question 2'],
      addQuestion: mockHandleAddText,
      removeQuestion: mockHandleRemoveText,
      roleAction: mockRoleAction,
    });
  });

  it('초기 Play List가 올바르게 렌더링되어야 한다', () => {
    renderComponent();

    expect(screen.getByText('Play List')).toBeInTheDocument();
    expect(screen.getByText('Question 1')).toBeInTheDocument();
    expect(screen.getByText('Question 2')).toBeInTheDocument();
  });

  it('새로운 질문을 추가하면 handleAddText가 호출되어야 한다', () => {
    renderComponent();

    const input = screen.getByPlaceholderText('커스텀 질문을 등록해주세요.');
    const addButton = screen.getByRole('button', { name: '추가' });

    act(() => {
      fireEvent.change(input, { target: { value: 'New Question' } });
      fireEvent.click(addButton);
    });

    expect(mockHandleAddText).toHaveBeenCalledWith('New Question');
  });

  it('질문을 삭제하면 handleRemoveText가 호출되어야 한다', () => {
    renderComponent();

    const deleteButton = screen.getAllByText('삭제')[0];
    fireEvent.click(deleteButton);
  });

  it('비우기 버튼 클릭 시 roleAction이 호출되어야 한다', () => {
    renderComponent();

    const confirmButton = screen.getByRole('button', { name: '비우기' });

    act(() => {
      fireEvent.click(confirmButton);
    });

    expect(mockRoleAction).toHaveBeenCalled();
  });
});

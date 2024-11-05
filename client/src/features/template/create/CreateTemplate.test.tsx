import { render, screen, fireEvent } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';
import CreateTemplate from './CreateTemplate';

describe('CreateTemplate', () => {
  const onClose = jest.fn();

  const renderComponent = () => {
    render(
      <TestProvider>
        <CreateTemplate onClose={onClose} />
      </TestProvider>,
    );
  };

  it('제목 입력 필드와 닫기 버튼이 렌더링된다.', () => {
    renderComponent();

    const titleInput = screen.getByPlaceholderText('제목을 입력해주세요');
    const closeButton = screen.getByText('닫기');

    expect(titleInput).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
  });

  it('질문 추가 버튼 클릭 시 새로운 질문 필드가 추가된다.', () => {
    renderComponent();

    const addButton = screen.getByText('질문추가');
    const titleInput = screen.getByPlaceholderText('제목을 입력해주세요');
    fireEvent.click(addButton);

    expect(titleInput).toBeInTheDocument();

    fireEvent.click(addButton);
    const questionFields = screen.getAllByPlaceholderText('질문을 입력해주세요');
    expect(questionFields.length).toBe(2);
  });

  it('질문 삭제 버튼 클릭 시 질문 필드가 제거된다.', () => {
    renderComponent();

    const addButton = screen.getByText('질문추가');
    fireEvent.click(addButton);
    fireEvent.click(addButton);

    const deleteButton = screen.getByText('되돌리기');
    fireEvent.click(deleteButton);

    const questionFields = screen.getAllByPlaceholderText('질문을 입력해주세요');
    expect(questionFields.length).toBe(1);
  });

  it('질문 추가가 최대 5개로 제한된다.', () => {
    renderComponent();

    const addButton = screen.getByText('질문추가');
    Array.from({ length: 10 }).forEach(() => fireEvent.click(addButton));

    const questionFields = screen.getAllByPlaceholderText('질문을 입력해주세요');
    expect(questionFields.length).toBe(5);
  });

  it('질문 삭제가 최소 1개로 제한된다.', () => {
    renderComponent();

    const addButton = screen.getByText('질문추가');
    fireEvent.click(addButton);

    const deleteButton = screen.getByText('되돌리기');
    fireEvent.click(deleteButton);

    const questionFields = screen.getAllByPlaceholderText('질문을 입력해주세요');
    expect(questionFields.length).toBe(1);
  });

  it('닫기 버튼 클릭 시 onClose가 호출된다.', () => {
    renderComponent();

    const closeButton = screen.getByText('닫기');
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledWith(false);
  });
});

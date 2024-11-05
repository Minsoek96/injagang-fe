import TestProvider from '@/fixutures/TestProvider';

import { render, screen, fireEvent } from '@testing-library/react';

import FormHandler from './FormHandler';

describe('FormHandler', () => {
  const onAddQuestion = jest.fn();
  const onDeleteQuestion = jest.fn();
  const handleSubmit = jest.fn();

  const renderComponent = () => {
    render(
      <TestProvider>
        <FormHandler
          onAddQuestion={onAddQuestion}
          onDeleteQuestion={onDeleteQuestion}
          handleSubmit={handleSubmit}
        />
      </TestProvider>,
    );
  };

  it('각각의 버튼이 렌더링 된다.', () => {
    renderComponent();
    const searchAddQuestion = screen.getByText('질문추가');
    const searchDeleteQuestion = screen.getByText('되돌리기');
    const searchSubmit = screen.getByText('확정하기');

    expect(searchAddQuestion).toBeInTheDocument();
    expect(searchDeleteQuestion).toBeInTheDocument();
    expect(searchSubmit).toBeInTheDocument();
  });

  it('질문 추가 버튼을 클릭하면 onAddQuestion 액션이 호출된다.', () => {
    renderComponent();
    const addButton = screen.getByText('질문추가');
    fireEvent.click(addButton);
    expect(onAddQuestion).toHaveBeenCalled();
  });

  it('되돌리기 버튼을 클릭하면 onDeleteQuestion 액션이 호출된다.', () => {
    renderComponent();
    const deleteButton = screen.getByText('되돌리기');
    fireEvent.click(deleteButton);
    expect(onDeleteQuestion).toHaveBeenCalled();
  });

  it('확정하기 버튼을 클릭하면 handleSubmit 액션이 호출된다.', () => {
    renderComponent();
    const submitButton = screen.getByText('확정하기');
    fireEvent.click(submitButton);
    expect(handleSubmit).toHaveBeenCalled();
  });
});

import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';

import QuestionEditForm from '@/src/features/question-composer/edit/QuestionEditForm';

const context = describe;
describe('QuestionEditForm', () => {
  const mockSubmit = jest.fn();
  const mockValues = {
    changeTitle: '테스트 제목',
    changeContent: '테스트 내용',
    boardId: 10001,
  };

  beforeAll(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    render(
      <TestProvider>
        <QuestionEditForm onSubmit={mockSubmit} defaultValues={mockValues} />
      </TestProvider>,
    );
  };

  it('동적 로드 이전에 스피너가 동작을 한다.', () => {
    renderComponent();
    const searchSpinner = screen.getByText('편집기를 불러오는 중입니다.');
    expect(searchSpinner).toBeInTheDocument();
  });

  it('제목, 내용, 버튼이 렌더링 된다.', async () => {
    renderComponent();
    await waitFor(() => {
      const searchTitle = screen.getByPlaceholderText('제목을 작성해주세요.');
      const searchContent = screen.getByPlaceholderText('질문을 작성해주세요.');
      const searchSubmit = screen.getByRole('button', { name: '수정완료' });
      expect(searchTitle).toBeInTheDocument();
      expect(searchContent).toBeInTheDocument();
      expect(searchSubmit).toBeInTheDocument();
    });
  });

  it('제목과 내용 필드가 기본값으로 초기화된다.', () => {
    renderComponent();
    const searchTitle = screen.getByPlaceholderText('제목을 작성해주세요.');
    const searchContent = screen.getByPlaceholderText('질문을 작성해주세요.');
    expect(searchTitle).toHaveValue(mockValues.changeTitle);
    expect(searchContent).toHaveValue(mockValues.changeContent);
  });

  context('사용자 입력 테스트', () => {
    it('제목 필드가 업데이트 된다.', () => {
      renderComponent();
      const searchTitle = screen.getByPlaceholderText('제목을 작성해주세요.');
      fireEvent.change(searchTitle, { target: { value: '새로운 제목' } });

      expect(searchTitle).toHaveValue('새로운 제목');
    });

    it('내용 필드가 업데이트 된다.', async () => {
      renderComponent();

      const searchContent = screen.getByPlaceholderText('질문을 작성해주세요.');
      fireEvent.change(searchContent, { target: { value: '새로운 질문' } });

      await waitFor(() => {
        expect(searchContent).toHaveValue('새로운 질문');
      });
    });
  });

  context('필드가 비어 있는 경우', () => {
    it('제출이 불가능하다.', async () => {
      renderComponent();
      const searchTitle = screen.getByPlaceholderText('제목을 작성해주세요.');
      const searchSubmit = screen.getByRole('button', { name: '수정완료' });
      fireEvent.change(searchTitle, { target: { value: '테스트 제목' } });

      expect(searchTitle).toHaveValue('테스트 제목');
      fireEvent.click(searchSubmit);
      await waitFor(() => {
        expect(mockSubmit).not.toHaveBeenCalled();
      });
    });
  });

  context('필드가 채워져 있는 경우', () => {
    it('제출이 가능하다.', async () => {
      renderComponent();
      const searchTitle = screen.getByPlaceholderText('제목을 작성해주세요.');
      const searchContent = screen.getByPlaceholderText('질문을 작성해주세요.');

      fireEvent.change(searchTitle, { target: { value: '새로운 제목' } });
      fireEvent.change(searchContent, { target: { value: '새로운 질문' } });

      await waitFor(() => {
        expect(searchTitle).toHaveValue('새로운 제목');
        expect(searchContent).toHaveValue('새로운 질문');
      });

      const searchSubmit = screen.getByRole('button', { name: '수정완료' });
      fireEvent.click(searchSubmit);
      expect(mockSubmit).toHaveBeenCalled();
    });
  });
});

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import preloadAll from 'jest-next-dynamic-ts';

import TestProvider from '@/fixutures/TestProvider';
import QuestionCreateForm from '@/src/features/question-composer/QuestionCreateForm';

const context = describe;

// TODO : 테스트 코드 수정 방안
describe('QuestionComposer', () => {
  const mockSubmit = jest.fn();

  beforeAll(async () => {
    jest.clearAllMocks();
    await preloadAll();
  });

  const renderComponent = () => {
    render(
      <TestProvider>
        <QuestionCreateForm onSubmit={mockSubmit} />
      </TestProvider>,
    );
  };

  context('submit 테스트', () => {
    it('전체 필드의 값을 채우지 않으면 submit이 호출되지 않는다.', async () => {
      renderComponent();

      const titleInput = screen.getByPlaceholderText(/제목을 작성/);
      const submitButton = screen.getByText(/작성완료/);

      userEvent.type(titleInput, '테스트 제목');

      await waitFor(() => expect(titleInput).toHaveValue('테스트 제목'));

      userEvent.click(submitButton);
      // 제목만 입력했으므로 submit이 호출되지 않아야 함
      expect(mockSubmit).not.toHaveBeenCalled();
    });

    it('모든 필드를 채우면 submit이 호출된다.', async () => {
      renderComponent();

      const titleInput = screen.getByPlaceholderText(/제목을 작성/);
      const contentInput = screen.getByPlaceholderText(/질문을 작성/);
      const submitButton = screen.getByText(/작성완료/);

      userEvent.type(titleInput, '테스트 제목');
      await waitFor(() => expect(titleInput).toHaveValue('테스트 제목'));

      userEvent.type(contentInput, '테스트 질문');
      await waitFor(() => expect(contentInput).toHaveValue('테스트 질문'));

      userEvent.click(submitButton); // 제출 버튼 클릭
      await waitFor(() => {
        expect(mockSubmit).not.toHaveBeenCalledTimes(1); // 필드가 모두 채워졌으므로 submit이 호출되어야 함
      });
    });
  });
});

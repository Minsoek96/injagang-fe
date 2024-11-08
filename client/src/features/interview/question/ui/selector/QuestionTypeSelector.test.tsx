import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';

import QuestionTypeSelector from '@/src/features/interview-question/expected-question/QuestionTypeSelector';

describe('QuestionTypeSelector', () => {
  const mockReset = jest.fn();
  const renderComponent = () => {
    render(
      <TestProvider>
        <QuestionTypeSelector onReset={mockReset} />
      </TestProvider>,
    );
  };

  it('질문 타입을 변경하면 mockReset이 호출된다.', async () => {
    renderComponent();
    const comboBox = screen.getByLabelText(/질문타입선택/);
    expect(comboBox).toBeInTheDocument();

    fireEvent.change(comboBox, { target: { value: 'JOB' } });

    await waitFor(() => {
      expect(mockReset).toHaveBeenCalled();
    });
  });
});

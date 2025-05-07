import TestProvider from '@/fixutures/TestProvider';

import {
  fireEvent, render, screen,
  waitFor,
} from '@testing-library/react';

import RandomQuestionForm from './RandomQuestionForm';

const context = describe;

describe('RandomQuestionForm', () => {
  const mockLabels = [
    { key: 'CS', label: 'Mock Text 1', type: 'text' },
    { key: 'JOB', label: 'Mock Text 2', type: 'text' },
    { key: 'SITUATION', label: 'Mock Text 3', type: 'text' },
    { key: 'PERSONALITY', label: 'Mock Text 4', type: 'text' },
  ];

  const mockSubmit = jest.fn();

  const renderComponent = () => {
    render(
      <TestProvider>
        <RandomQuestionForm labels={mockLabels} onSubmit={mockSubmit} />
      </TestProvider>,
    );
  };
  context('렌더링 테스트', () => {
    it('라벨이 렌더링이 된다.', () => {
      renderComponent();

      mockLabels.forEach((item) => {
        expect(screen.getByText(item.label)).toBeInTheDocument();
      });
    });

    it('제출 버튼이 렌더링 된다', () => {
      renderComponent();
      expect(screen.getByRole('button', { name: '랜덤 질문 추가' })).toBeInTheDocument();
    });
  });

  context('입력 값이 존재하면', () => {
    it('onSubmit 함수가 호출된다.', async () => {
      renderComponent();

      const csInput = screen.getByLabelText('Mock Text 1');
      fireEvent.change(csInput, { target: { value: '2' } });

      await waitFor(() => {
        const submitButton = screen.getByRole('button', { name: '랜덤 질문 추가' });
        fireEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalled();
      });

      expect(mockSubmit).toHaveBeenCalledWith(expect.objectContaining({
        CS: '2', JOB: 0, PERSONALITY: 0, SITUATION: 0,
      }));
    });
  });
});

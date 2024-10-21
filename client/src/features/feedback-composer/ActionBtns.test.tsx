import TestProvider from '@/fixutures/TestProvider';
import ActionBtns from '@/src/features/feedback-composer/ActionBtns';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

describe('ActionBtns', () => {
  const firstActionMock = jest.fn();
  const secondActionMock = jest.fn();
  const btnInfos = [
    { id: 'btn-01', text: '비우기', onClick: firstActionMock },
    { id: 'btn-02', text: '작성', onClick: secondActionMock },
  ];
  const renderComponent = () => {
    render(
      <TestProvider>
        <ActionBtns btnInfos={btnInfos} />
      </TestProvider>,
    );
  };

  it('각각의 버튼이 렌더링된다.', () => {
    renderComponent();
    btnInfos.forEach((btn) => {
      const searchBtn = screen.getByRole('button', { name: new RegExp(btn.text) });
      expect(searchBtn).toBeInTheDocument();
    });
  });

  it('각각의 액션을 수행한다.', () => {
    renderComponent();
    btnInfos.forEach(async (btn) => {
      const searchBtn = screen.getByRole('button', { name: new RegExp(btn.text) });
      expect(searchBtn).toBeInTheDocument();
      fireEvent.click(searchBtn);
      await waitFor(() => {
        expect(btn.onClick).toHaveBeenCalled();
      });
    });
  });
});

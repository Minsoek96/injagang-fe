import { render, screen } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';

import CorrectionView from './CorrectionView';

describe('CorrectionView', () => {
  const renderComponent = (answer: string) => {
    render(
      <TestProvider>
        <CorrectionView targetAnswer={answer} />
      </TestProvider>,
    );
  };
  it('유저가 첨삭한 내용을 렌더링한다.', () => {
    const mockAnswer = '첨삭된 내용';
    renderComponent(mockAnswer);
    const searchAnswer = screen.getByText(mockAnswer);
    expect(searchAnswer).toBeInTheDocument();
  });

  it('첨삭된 내용이 없는 경우 메시지를 전달한다.', () => {
    renderComponent('');
    const searchAnswer = screen.queryByText(/첨삭된 내용이 없습니다/);
    expect(searchAnswer).toBeInTheDocument();
    expect(searchAnswer).toHaveStyle({ color: '#ff0000ae', fontWeight: 'bold' });
  });
});

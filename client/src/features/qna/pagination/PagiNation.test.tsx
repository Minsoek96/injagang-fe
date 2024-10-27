import { render, screen } from '@testing-library/react';
import TestProvider from '@/fixutures/TestProvider';

import PagiNation from '@/src/features/qna/pagination/PagiNation';

describe('PageNation', () => {
  const renderComponent = () => {
    render(
      <TestProvider>
        <PagiNation maxButtonNum={1} />
      </TestProvider>,
    );
  };
  it('페이지 네비게이션 버튼을 렌더링한다.', () => {
    renderComponent();
    const prevButton = screen.getByText('<');
    const nextButton = screen.getByText('>');
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });
});

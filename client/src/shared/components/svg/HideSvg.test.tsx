import { render, screen, fireEvent } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';
import HideSvg from './HideSvg';

const mockOnClick = jest.fn();

describe('HideSvg', () => {
  const hideText = '숨겨진 텍스트';
  const svgId = 'test-logo';
  function Logo() {
    return <svg data-testid={svgId} />;
  }

  const renderComponent = () => {
    render(
      <TestProvider>
        <HideSvg
          Logo={<Logo />}
          label={hideText}
          onClick={mockOnClick}
        />
      </TestProvider>,
    );
  };

  it('Span이 보이지 않는다.', () => {
    renderComponent();
    const spanElement = screen.getByText(hideText);
    expect(spanElement).toBeInTheDocument();
    expect(spanElement).not.toBeVisible();
  });

  it('svg를 클릭하면 마우스 이벤트가 동작한다.', () => {
    renderComponent();
    const svgIcon = screen.getByTestId(svgId);
    fireEvent.click(svgIcon);
    expect(mockOnClick).toHaveBeenCalled();
  });
});

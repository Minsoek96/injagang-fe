import TestProvider from '@/fixutures/TestProvider';

import { fireEvent, render, screen } from '@testing-library/react';
import { CSSProperties } from 'styled-components';
import MainButton from './MainButton';

describe('MainButton', () => {
  const label = 'Label';
  const mockAction = jest.fn();
  const sx: CSSProperties = { fontSize: '50rem' };
  const renderButton = () => {
    render(
      <TestProvider>
        <MainButton
          label={label}
          onAction={mockAction}
          sx={sx}
        />
      </TestProvider>,
    );
  };

  it('버튼이 렌더링된다.', () => {
    renderButton();
    const getLabel = screen.getByText(label);
    expect(getLabel).toBeInTheDocument();
  });

  it('버튼을 클릭하면 액션이 발생한다', () => {
    renderButton();
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(mockAction).toHaveBeenCalled();
  });
});

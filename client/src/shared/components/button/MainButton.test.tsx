import TestProvider from '@/fixutures/TestProvider';
import 'jest-styled-components';

import { fireEvent, render, screen } from '@testing-library/react';
import { CSSProperties } from 'styled-components';
import { defaultTheme } from '@/src/app/styles';

import MainButton from './MainButton';

describe('MainButton', () => {
  const label = 'Label';
  const mockAction = jest.fn();
  const sx: CSSProperties = { fontSize: '50rem' };
  const renderButton = (isActive = false) => {
    render(
      <TestProvider>
        <MainButton
          label={label}
          onClick={mockAction}
          isActive={isActive}
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

  describe('isActive', () => {
    it('isActive 상태가 false이면 기본색상을 렌더링한다.', () => {
      renderButton();
      const afterButton = screen.getByRole('button');
      expect(afterButton).toHaveStyleRule(
        'background-color',
        defaultTheme.colors.button,
      );
    });

    it('isActive 상태가 true이면 색상이 변한다.', () => {
      renderButton(true);
      const afterButton = screen.getByRole('button');
      expect(afterButton).toHaveStyleRule(
        'background-color',
        defaultTheme.colors.brandColor,
      );
    });
  });
});

import 'jest-styled-components';
import { CSSProperties } from 'styled-components';

import { fireEvent, render, screen } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';
import CheckBox from './CheckBox';

const context = describe;
describe('CheckBox', () => {
  const label = '약관에 동의합니다';
  const mockOnChange = jest.fn();
  const sx: CSSProperties = { width: '24px' };

  const renderCheckbox = (checked = false) => {
    render(
      <TestProvider>
        <CheckBox
          label={label}
          onChange={mockOnChange}
          checked={checked}
          sx={sx}
        />
      </TestProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('체크박스가 렌더링된다.', () => {
    renderCheckbox();
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('체크박스를 클릭하면 onChange 이벤트가 발생한다', () => {
    renderCheckbox();
    fireEvent.click(screen.getByRole('checkbox'));
    expect(mockOnChange).toHaveBeenCalled();
  });

  context('checked 상태', () => {
    it('checked 상태가 false이면 체크되지 않은 상태로 렌더링된다.', () => {
      renderCheckbox(false);
      expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('checked 상태가 true이면 체크된 상태로 렌더링된다.', () => {
      renderCheckbox(true);
      expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('checked 상태가 true일 때 스타일이 변경된다.', () => {
      renderCheckbox(true);
      expect(screen.getByRole('checkbox')).toHaveStyleRule(
        'background-color',
        '#0F766E',
        { modifier: ':checked' },
      );
    });
  });

  it('disabled 속성이 전달되면 비활성화된다.', () => {
    render(
      <TestProvider>
        <CheckBox label={label} onChange={mockOnChange} disabled />
      </TestProvider>,
    );

    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('sx prop으로 전달한 스타일이 적용된다.', () => {
    renderCheckbox();
    expect(screen.getByRole('checkbox')).toHaveStyle('width: 24px');
  });
});

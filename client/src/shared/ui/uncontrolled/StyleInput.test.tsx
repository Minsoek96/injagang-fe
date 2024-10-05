import TestProvider from '@/fixutures/TestProvider';
import { StlyeInput } from '@/src/shared/ui/uncontrolled';
import { fireEvent, render, screen } from '@testing-library/react';

const mockRegister = {
  name: 'test-input',
  onChange: jest.fn(),
  onBlur: jest.fn(),
  ref: jest.fn(),
};

describe('StyleInput', () => {
  const renderComponent = () => {
    render(
      <TestProvider>
        <StlyeInput register={mockRegister} placeholder="test" />
      </TestProvider>,
    );
  };

  it('register값이 잘 전달된다.', () => {
    renderComponent();
    const searchInput = screen.getByPlaceholderText('test');
    expect(searchInput).toHaveAttribute('name', 'test-input');
  });

  it('값을 입력하면 값이 변한다', () => {
    renderComponent();
    const searchInput = screen.getByPlaceholderText('test');
    expect(searchInput).toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: 'new value' } });
    expect(searchInput).toHaveValue('new value');
  });
});

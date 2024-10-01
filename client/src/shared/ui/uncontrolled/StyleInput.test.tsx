import TestProvider from '@/fixutures/TestProvider';
import { StlyeInput } from '@/src/shared/ui/uncontrolled';
import { render, screen } from '@testing-library/react';

const mockRegister = {
  name: 'test-input',
  onChange: jest.fn(),
  onBlur: jest.fn(),
  ref: jest.fn(),
};

describe('StyleInput', () => {
  it('값을 입력하면 값이 변한다', () => {
    render(
      <TestProvider>
        <StlyeInput register={mockRegister} placeholder="test" />
      </TestProvider>,
    );
    const searchInput = screen.getByPlaceholderText('test');
    expect(searchInput).toBeInTheDocument();
  });
});

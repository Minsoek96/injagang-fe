import { render, screen, fireEvent } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';

import { sampleOptionList } from '@/fixutures/shared';

import ComboBox from './ComboBox';

describe('ComboBox 컴포넌트', () => {
  const context = describe;

  const mockOnChange = jest.fn();

  context('컴포넌트가 기본 상태로 렌더링될 때', () => {
    beforeEach(() => {
      render(
        <TestProvider>
          <ComboBox
            value=""
            onChange={mockOnChange}
            optionList={sampleOptionList}
            Size={{ width: '200px', height: '40px' }}
          />
        </TestProvider>,
      );
    });

    it('기본 옵션이 렌더링되어야 한다', () => {
      const selectElement = screen.getByLabelText('옵션 선택 :');
      expect(selectElement).toBeInTheDocument();
      expect(selectElement).toHaveValue('');

      const defaultOption = screen.getByText('Please select');
      expect(defaultOption).toBeInTheDocument();
    });

    it('옵션들이 렌더링되어야 한다', () => {
      sampleOptionList.forEach((option) => {
        expect(screen.getByText(option.title)).toBeInTheDocument();
      });
    });

    it('옵션을 선택할 수 있어야 한다', () => {
      const selectElement = screen.getByLabelText('옵션 선택 :');
      fireEvent.change(selectElement, { target: { value: 'Option 1' } });
      expect(mockOnChange).toHaveBeenCalledWith('Option 1');
    });
  });

  context('기본값이 설정된 상태에서 렌더링될 때', () => {
    beforeEach(() => {
      render(
        <TestProvider>
          <ComboBox
            value="Option 2"
            onChange={mockOnChange}
            optionList={sampleOptionList}
            Size={{ width: '200px', height: '40px' }}
          />
        </TestProvider>,
      );
    });

    it('기본값이 설정된 상태로 렌더링되어야 한다', () => {
      const selectElement = screen.getByLabelText('옵션 선택 :');
      expect(selectElement).toHaveValue('Option 2');
    });
  });
});

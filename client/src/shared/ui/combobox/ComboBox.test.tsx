import { render, screen, fireEvent } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';

import { sampleOptionList } from '@/fixutures/shared';

import ComboBox from './ComboBox';

describe('ComboBox 컴포넌트', () => {
  const context = describe;

  const mockOnChange = jest.fn((text:string) => text);
  const testLabel = '테스트라벨';

  const renderComboBox = () => {
    render(
      <TestProvider>
        <ComboBox
          label={testLabel}
          onChange={(value) => value && mockOnChange(value.title)}
          items={sampleOptionList}
          selectedItem={sampleOptionList[0]}
          itemToId={(item) => item.id || ''}
          itemToText={(item) => item.title || ''}
          Size={{ width: '200px', height: '40px' }}
        />
      </TestProvider>,
    );
  };

  context('컴포넌트가 기본 상태로 렌더링될 때', () => {
    it('기본 옵션이 렌더링되어야 한다', () => {
      renderComboBox();
      const selectElement = screen.getByLabelText(testLabel);
      expect(selectElement).toBeInTheDocument();
      expect(selectElement).toHaveValue('test 1');

      const defaultOption = screen.getByText('Please select');
      expect(defaultOption).toBeInTheDocument();
    });

    it('옵션들이 렌더링되어야 한다', () => {
      renderComboBox();
      sampleOptionList.forEach((option) => {
        expect(screen.getByText(option.title)).toBeInTheDocument();
      });
    });

    it('옵션을 선택할 수 있어야 한다', () => {
      renderComboBox();
      const selectElement = screen.getByLabelText(testLabel);
      fireEvent.change(selectElement, {
        target: { value: sampleOptionList[1].id },
      });
      expect(mockOnChange).toHaveBeenCalledWith(sampleOptionList[1].title);
    });
  });
});

import TestProvider from '@/fixutures/TestProvider';
import RadioGroup from '@/src/shared/ui/radio/RadioGroup';
import { fireEvent, render, screen } from '@testing-library/react';

const context = describe;
describe('RadioGroup', () => {
  const mockOnChange = jest.fn();
  const mockName = 'test-radio-group';
  const mockOptions = ['mock_1', 'mock_2', 'mock_3'];
  const mockLabels = ['첫 번째', '두 번째', '세번 째'];

  const renderComponent = (mockValue = mockOptions[0]) => {
    render(
      <TestProvider>
        <RadioGroup onChange={mockOnChange} name={mockName} value={mockValue}>
          {mockOptions.map((option, idx) => (
            <RadioGroup.Option key={option} value={option}>
              {mockLabels[idx]}
            </RadioGroup.Option>
          ))}
        </RadioGroup>
      </TestProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('RadioGroup이 렌더링될 때', () => {
    it('모든 옵션이 화면에 표신된다', () => {
      renderComponent();
      mockLabels.forEach((label) => {
        expect(screen.getByText(label)).toBeInTheDocument();
      });
    });

    it('선택값에 해당하는 라디오가 체크된다', () => {
      renderComponent(mockOptions[2]);
      const radioinputs = screen.getAllByRole('radio');
      expect(radioinputs[0]).not.toBeChecked();
      expect(radioinputs[1]).not.toBeChecked();
      expect(radioinputs[2]).toBeChecked();
    });
  });

  context('사용자가 상호작용할 떄', () => {
    it('다른 옵션을 클릭하면 onChange가 호출된다.', () => {
      renderComponent(mockOptions[1]);
      const radioinputs = screen.getAllByRole('radio');
      fireEvent.click(radioinputs[0]);
      expect(mockOnChange).toHaveBeenCalledWith(mockOptions[0]);
    });

    it('동일한 옵션을 클릭하면 onChange가 호출되지 않는다.', () => {
      renderComponent(mockOptions[1]);
      const radioinputs = screen.getAllByRole('radio');
      fireEvent.click(radioinputs[1]);
      expect(mockOnChange).not.toHaveBeenCalled();
    });
  });

  context('라디오 옵션이 그룹을 벗어난 경우', () => {
    it('오류가 발생한다.', () => {
      expect(() => {
        render(
          <TestProvider>
            <RadioGroup.Option value="error">에러옵션</RadioGroup.Option>
          </TestProvider>,
        );
      }).toThrow('Radio.Option must be used within a Radio component');
    });
  });
});

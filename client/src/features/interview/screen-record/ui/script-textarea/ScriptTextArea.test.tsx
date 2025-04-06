import {
  screen, render, fireEvent, waitFor,
} from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';

import { useIntvContentStore } from '@/src/entities/interview_question';

import ScriptTextArea from './ScriptTextArea';

jest.mock('@/src/entities/interview_question', () => ({
  useIntvContentStore: jest.fn(),
}));

const renderComponent = () =>
  render(
    <TestProvider>
      <ScriptTextArea />
    </TestProvider>,
  );

describe('ScriptTextArea', () => {
  const mockSetCurScript = jest.fn();

  beforeEach(() => {
    (useIntvContentStore as unknown as jest.Mock).mockImplementation((selector) => selector({
      setCurScript: mockSetCurScript,
    }));
  });

  it('대본 작성 텍스트가 렌더링 된다.', () => {
    renderComponent();
    expect(screen.getByPlaceholderText(/대본을 작성해주세요/)).toBeInTheDocument();
  });

  it('텍스트를 입력하면 상태가 업데이트 된다.', () => {
    renderComponent();
    const textarea = screen.getByPlaceholderText(/대본을 작성해주세요/);
    fireEvent.change(textarea, { target: { value: 'Mock Change' } });
    expect(screen.getByText('Mock Change')).toBeInTheDocument();
  });

  it('텍스트 입력 후 debounce가 작동하여 setCurScript를 호출한다.', async () => {
    renderComponent();
    const textarea = screen.getByPlaceholderText('대본을 작성해주세요.');

    fireEvent.change(textarea, { target: { value: 'Debounce' } });

    await waitFor(() => {
      expect(mockSetCurScript).toHaveBeenCalledWith('Debounce');
    });
  });
});

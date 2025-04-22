import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';
import { responseCoverLetters } from '@/fixutures/entities/coverLetter';

import { useFetchCoverLetter } from '@/src/entities/coverLetter/api/queries';

import CoverLetterSelector from './CoverLetterSelector';

jest.mock('@/src/entities/coverLetter/api/queries', () => ({
  useFetchCoverLetter: jest.fn(),
}));

describe('CoverLetterSelector', () => {
  const mockChange = jest.fn();

  const renderComponent = () => {
    render(
      <TestProvider>
        <CoverLetterSelector handleChange={mockChange} />
      </TestProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useFetchCoverLetter as jest.Mock).mockReturnValue({
      data: responseCoverLetters,
    });
  });

  it('나의자소서 선택(필수사항)이 렌더링된다.', () => {
    renderComponent();
    const searchComboBox = screen.getByText(/나의자소서 선택/);
    expect(searchComboBox).toBeInTheDocument();
  });

  it('자소서 변경하면 mockChange에 대표자소서 아이디가 전달된다.', async () => {
    renderComponent();
    const searchComboBox = screen.getByLabelText(/대표자소서/);
    fireEvent.change(searchComboBox, { target: { value: responseCoverLetters[1].title } });

    await waitFor(() => {
      expect(mockChange).toHaveBeenCalledWith(responseCoverLetters[1].essayId);
    });
  });
});

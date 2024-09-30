import { render, screen } from '@testing-library/react';
import { useFetchCoverLetter } from '@/src/entities/coverLetter/queries';

import TestProvider from '@/fixutures/TestProvider';
import { responseCoverLetters } from '@/fixutures/entities/coverLetter';

import CoverLetterList from '../CoverLetterList';

jest.mock('@/src/entities/coverLetter/queries', () => ({
  useFetchCoverLetter: jest.fn(),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

describe('CoverLetterList', () => {
  const renderComponent = () => {
    render(
      <TestProvider>
        <CoverLetterList />
      </TestProvider>,
    );
  };

  beforeEach(() => {
    (useFetchCoverLetter as jest.Mock).mockReturnValue({
      data: responseCoverLetters,
    });
  });

  it('각 자소서에 대한 CoverLetterItems이 렌더링된다', () => {
    renderComponent();

    responseCoverLetters.forEach((item) => {
      const searchTitle = screen.getByText(item.title);
      expect(searchTitle).toBeInTheDocument();
    });
  });

  it('자소서리스트가 없을 때 안내메시지가 렌더링된다.', () => {
    (useFetchCoverLetter as jest.Mock).mockReturnValue({
      data: [],
    });

    renderComponent();
    const emptyText = screen.getByText(/작성된 자소서가 없습니다./);
    expect(emptyText).toBeInTheDocument();
  });
});

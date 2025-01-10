import { render, screen, act } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';

import { useCoverLetterStore } from '@/src/entities/coverLetter';
import { sampleCoverLetter } from '@/fixutures/entities/coverLetter';

import CoverLetterPreView from './CoverLetterPreView';

const context = describe;

describe('CoverLetterPreview', () => {
  const renderCoverLetterPreview = () => {
    render(
      <TestProvider>
        <CoverLetterPreView />
      </TestProvider>,
    );
  };

  context('선택된 자소서 리스트가 없는 경우', () => {
    it('안내 메시지를 렌더링한다.', () => {
      renderCoverLetterPreview();
      const emptyText = screen.getByText(/선택된 자소서가 없습니다./);
      const emptysubText = screen.getByText(/자소서를 선택해주세요/);
      expect(emptyText).toBeInTheDocument();
      expect(emptysubText).toBeInTheDocument();
    });
  });

  context('선택된 자소서 리스트가 있는 경우', () => {
    it('선택된 자소서 질문 리스트를 출력한다.', () => {
      renderCoverLetterPreview();
      act(() => {
        useCoverLetterStore.getState().setCoverLetter(sampleCoverLetter);
      });

      const selectedList = screen.getAllByRole('listitem');
      expect(selectedList).toHaveLength(sampleCoverLetter.questions.length);
    });
  });
});

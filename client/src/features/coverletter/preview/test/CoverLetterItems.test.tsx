import { useRouter } from 'next/router';

import {
  fireEvent, render, screen,
} from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';
import { responseCoverLetters } from '@/fixutures/entities/coverLetter';

import { coverLetterType, useCoverLetterStore } from '@/src/entities/coverLetter';

import CoverLetterItems from '../CoverLetterItems';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

const context = describe;

describe('CoverLetterItems', () => {
  const coverLetterItem = responseCoverLetters[0];
  const diffCoveLetterItem = responseCoverLetters[1];

  const renderComponent = (
    item: coverLetterType.ICoverLetters,
    selectedItem: coverLetterType.ICoverLetters,
  ) => {
    render(
      <TestProvider>
        <CoverLetterItems item={item} selectedCoverLetter={selectedItem} />
      </TestProvider>,
    );
  };

  context('유저가 선택한 자소서 아이템이 렌더링 되는 경우', () => {
    it('fontSize가 확대가 된다', () => {
      renderComponent(coverLetterItem, coverLetterItem);
      const searchItem = screen.getByText(coverLetterItem.title);

      expect(searchItem).toBeInTheDocument();
      expect(searchItem.parentElement).toHaveStyle('transform: scale(1.5)');
    });
  });

  context('선택되지 않은 자소서 아이템이 렌더링 되는 경우', () => {
    it('fontSize가 확대가 된다', () => {
      renderComponent(coverLetterItem, diffCoveLetterItem);
      const searchItem = screen.getByText(coverLetterItem.title);

      expect(searchItem).toBeInTheDocument();
      expect(searchItem.parentElement).toHaveStyle('transform: scale(1)');
    });
  });

  context('해당 아이템을 클릭하는 경우', () => {
    it('선택 자소서 제목이 변경된다.', () => {
      renderComponent(coverLetterItem, diffCoveLetterItem);
      const searchItem = screen.getByText(coverLetterItem.title);

      // 클릭 이벤트 발생
      fireEvent.click(searchItem);
      const { selectedCoverLetter } = useCoverLetterStore.getState();
      expect(selectedCoverLetter).toEqual(coverLetterItem);
    });
  });

  context('상세보기를 클릭하는 경우', () => {
    it('편집 페이지로 이동한다..', () => {
      const { push } = useRouter();
      renderComponent(coverLetterItem, diffCoveLetterItem);
      const editItem = screen.getByRole('button');
      fireEvent.click(editItem);
      expect(push).toHaveBeenCalledWith({ pathname: '/coverLetter/10000/edit' });
    });
  });
});

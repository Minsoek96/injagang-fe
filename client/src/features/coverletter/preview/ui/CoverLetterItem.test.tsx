import { useRouter } from 'next/router';

import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';
import { responseCoverLetters } from '@/fixutures/entities/coverLetter';

import {
  coverLetterType,
  useCoverLetterStore,
} from '@/src/entities/coverLetter';

import CoverLetterItem from './CoverLetterItem';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

const context = describe;

describe('CoverLetterItem', () => {
  const coverLetterItem = responseCoverLetters[0];
  const diffCoveLetterItem = responseCoverLetters[1];
  const mockDelete = jest.fn();

  const renderComponent = (
    item: coverLetterType.ICoverLetters,
    selectedItem: coverLetterType.ICoverLetters,
  ) => {
    render(
      <TestProvider>
        <CoverLetterItem item={item} selectedCoverLetter={selectedItem} onDelete={mockDelete} />
      </TestProvider>,
    );
  };

  context('유저가 선택한 자소서 아이템이 렌더링 되는 경우', () => {
    it('하이라이트 효과가 발생한다.', async () => {
      renderComponent(coverLetterItem, coverLetterItem);
      const searchItem = screen.getByText(coverLetterItem.title);
      fireEvent.click(searchItem);
      const container = searchItem.closest('li');
      await waitFor(() => {
        expect(container).toHaveStyle('background-color: rgba(15, 118, 110, 0.165)');
      });
      expect(searchItem).toBeInTheDocument();
    });

    it('자소서 편집 버튼이 렌더링된다.', () => {
      renderComponent(coverLetterItem, coverLetterItem);
      const editButton = screen.getByRole('button', { name: /편집/ });
      const removeButton = screen.getByRole('button', { name: /삭제/ });

      expect(editButton).toBeInTheDocument();
      expect(removeButton).toBeInTheDocument();
    });
  });

  context('선택되지 않은 자소서 아이템이 렌더링 되는 경우', () => {
    it('버튼그룹이 보이지 않는다.', () => {
      renderComponent(coverLetterItem, diffCoveLetterItem);
      const editButton = screen.queryByRole('button', { name: /편집/ });
      const removeButton = screen.queryByRole('button', { name: /삭제/ });

      expect(editButton).not.toBeInTheDocument();
      expect(removeButton).not.toBeInTheDocument();
    });

    it('폰트 컬러가 그레이 계열의 색상으로 렌더링 된다.', () => {
      renderComponent(coverLetterItem, diffCoveLetterItem);
      const searchItem = screen.getByText(coverLetterItem.title);
      const container = searchItem.closest('li');
      expect(searchItem).toBeInTheDocument();
      expect(container).toHaveStyle('color:#666666');
    });
  });

  context('해당 아이템을 클릭하는 경우', () => {
    it('선택 자소서 제목이 변경된다.', async () => {
      renderComponent(coverLetterItem, diffCoveLetterItem);
      const searchItem = screen.getByText(coverLetterItem.title);
      const container = searchItem.closest('div')!;

      fireEvent.click(container);
      await waitFor(() => {
        const { selectedCoverLetter } = useCoverLetterStore.getState();
        expect(selectedCoverLetter).toEqual(coverLetterItem);
      });
    });
  });

  context('편집 버튼을 클릭하는 경우', () => {
    it('편집 페이지로 이동한다..', () => {
      const { push } = useRouter();
      renderComponent(coverLetterItem, coverLetterItem);
      const editButton = screen.getByRole('button', { name: /편집/ });
      fireEvent.click(editButton);
      expect(push).toHaveBeenCalledWith({
        pathname: '/coverLetter/10000/edit',
      });
    });
  });
});

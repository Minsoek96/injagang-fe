import { render, screen } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';

import { useFetchDetailCoverLetter } from '@/src/entities/coverLetter/api/queries';
import { responseDetailCoverLetter } from '@/fixutures/entities/coverLetter';
import CoverLetterDetail from './CoverLetterDetail';

const context = describe;

jest.mock('@/src/entities/coverLetter/api/queries');

describe('CoverLetterDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useFetchDetailCoverLetter as jest.Mock).mockReturnValue({
      data: responseDetailCoverLetter,
    });
  });

  const renderComponent = (id: number) => {
    render(
      <TestProvider>
        <CoverLetterDetail essayId={id} />
      </TestProvider>,
    );
  };
  context('전달된 아이디에 내용이 존재하는 경우', () => {
    it('해당 아이디의 자소서 상세내용을 렌더링 한다.', () => {
      renderComponent(responseDetailCoverLetter.essayId);
      responseDetailCoverLetter.qnaList.forEach((item) => {
        const getQuestion = screen.getByText(item.question);
        const getAnswer = screen.getByText(item.answer);
        expect(getQuestion).toBeInTheDocument();
        expect(getAnswer).toBeInTheDocument();
      });
    });
  });

  context('전달된 아이디에 내용이 존재하지 않는 경우', () => {
    it('값이 없는 메시지를 전달한다.', () => {
      renderComponent(0);
      const emptyMsg = '선택된 값이 없습니다.';
      const plzMsg = '새로운 자소서를 첨부';
      const searchEmpty = screen.getByText(emptyMsg);
      const searchPlz = screen.getByText(new RegExp(plzMsg));
      expect(searchEmpty).toBeInTheDocument();
      expect(searchPlz).toBeInTheDocument();
    });
  });
});

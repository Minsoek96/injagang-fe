import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import { responseDetailCoverLetter } from '@/fixutures/entities/coverLetter';
import TestProvider from '@/fixutures/TestProvider';

import EditForm from './EditForm';

const context = describe;
// TODO : 테스트코드 수정하기
describe('EditForm', () => {
  const mockSubmit = jest.fn();
  const mockDelete = jest.fn();
  const mockMove = jest.fn();

  const renderCompoent = () => {
    render(
      <TestProvider>
        <EditForm
          onSubmit={mockSubmit}
          onDelete={mockDelete}
          movePage={mockMove}
          coverLetters={responseDetailCoverLetter}
        />
      </TestProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('렌더링 테스트', () => {
    it('대표 자소서 입력란이 렌더링된다.', () => {
      renderCompoent();
      expect(screen.getByPlaceholderText('자소서제목')).toBeInTheDocument();
    });

    it('coverLetters길이 만큼 폼 리스트 아이템이 렌더링된다.', () => {
      renderCompoent();
      const getFields = screen.getAllByRole('textbox');
      const answerLength = responseDetailCoverLetter.qnaList.length;
      const questionLength = responseDetailCoverLetter.qnaList.length;
      const titleLength = 1;
      expect(getFields).toHaveLength(answerLength + questionLength + titleLength);
    });

    it('각 버튼이 렌더링된다.', () => {
      renderCompoent();
      const deleteButton = screen.getByText('삭제하기');
      const backButton = screen.getByText('뒤로가기');
      const reviseButton = screen.getByText('수정완료');
      const addButton = screen.getByText('리스트 추가');
      expect(deleteButton).toBeInTheDocument();
      expect(backButton).toBeInTheDocument();
      expect(reviseButton).toBeInTheDocument();
      expect(addButton).toBeInTheDocument();
    });
  });

  context('submit 테스트', () => {
    it('답변 문항의 길이가 30이하 이면 submit이 호출되지않는다.', async () => {
      renderCompoent();
      const submit = screen.getByText('수정완료');
      fireEvent.click(submit);

      await waitFor(() => {
        expect(mockSubmit).not.toHaveBeenCalled();
      });
    });
    it('답변 문항의 길이가 30 이상이면 submit이 호출된다.', async () => {
      renderCompoent();
      const answerTextAreas = screen.getAllByPlaceholderText(/답변을 작성해주세요/);
      const repeatedString = 'a'.repeat(31);

      answerTextAreas.forEach((answerTextArea) => {
        fireEvent.change(answerTextArea, { target: { value: repeatedString } });
      });

      const submit = screen.getByText('수정완료');
      fireEvent.click(submit);

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalled();
      });
    });
  });

  context('버튼 테스트', () => {
    it('삭제완료 버튼을 클릭하면 mockDelete가 호출된다.', () => {
      renderCompoent();
      const deleteButton = screen.getByText('삭제하기');
      fireEvent.click(deleteButton);
      expect(mockDelete).toHaveBeenCalled();
    });

    it('뒤로가기 버튼을 클릭하면 mockMove가 호출된다.', () => {
      renderCompoent();
      const moveButton = screen.getByText('뒤로가기');
      fireEvent.click(moveButton);
      expect(mockMove).toHaveBeenCalled();
    });
  });
});

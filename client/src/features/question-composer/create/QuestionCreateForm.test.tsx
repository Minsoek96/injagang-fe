import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import preloadAll from 'jest-next-dynamic-ts';

import { coverLetterQueries } from '@/src/entities/coverLetter';

import TestProvider from '@/fixutures/TestProvider';
import { responseCoverLetters, sampleCoverLetter } from '@/fixutures/entities/coverLetter';
import QuestionCreateForm from './QuestionCreateForm';

const context = describe;

jest.mock('@/src/entities/coverLetter', () => {
  const actualHooks = jest.requireActual('@/src/entities/coverLetter');
  return {
    ...actualHooks,
    coverLetterQueries: {
      useFetchDetailCoverLetter: jest.fn(),
      useFetchCoverLetter: jest.fn(),
    },
  };
});

// TODO : 테스트 코드 수정 방안
describe('QuestionCreateForm', () => {
  const mockSubmit = jest.fn();

  beforeAll(async () => {
    jest.clearAllMocks();
    (coverLetterQueries.useFetchDetailCoverLetter as jest.Mock).mockReturnValue({
      data: sampleCoverLetter,
    });
    (coverLetterQueries.useFetchCoverLetter as jest.Mock).mockReturnValue({
      data: responseCoverLetters,
    });
    await preloadAll();
  });

  const renderComponent = () => {
    render(
      <TestProvider>
        <QuestionCreateForm onSubmit={mockSubmit} />
      </TestProvider>,
    );
  };

  it('제목, 내용, 버튼이 렌더링 된다.', () => {
    renderComponent();
    const searchTitle = screen.getByPlaceholderText('제목을 작성해주세요.');
    const searchContent = screen.getByPlaceholderText('질문을 작성해주세요.');
    const searchSubmit = screen.getByRole('button', { name: '작성완료' });
    expect(searchTitle).toBeInTheDocument();
    expect(searchContent).toBeInTheDocument();
    expect(searchSubmit).toBeInTheDocument();
  });

  context('사용자 입력 테스트', () => {
    it('제목 필드가 업데이트 된다.', () => {
      renderComponent();
      const searchTitle = screen.getByPlaceholderText('제목을 작성해주세요.');
      fireEvent.change(searchTitle, { target: { value: '테스트 제목' } });

      expect(searchTitle).toHaveValue('테스트 제목');
    });

    it('내용 필드가 업데이트 된다.', async () => {
      renderComponent();

      const searchContent = screen.getByPlaceholderText('질문을 작성해주세요.');
      fireEvent.change(searchContent, { target: { value: '테스트 질문' } });

      await waitFor(() => {
        expect(searchContent).toHaveValue('테스트 질문');
      });
    });
  });

  context('필드가 비어 있는 경우', () => {
    it('제출이 불가능하다.', async () => {
      renderComponent();
      const searchTitle = screen.getByPlaceholderText('제목을 작성해주세요.');
      const searchSubmit = screen.getByRole('button', { name: '작성완료' });
      fireEvent.change(searchTitle, { target: { value: '테스트 제목' } });

      expect(searchTitle).toHaveValue('테스트 제목');
      fireEvent.click(searchSubmit);
      await waitFor(() => {
        expect(mockSubmit).not.toHaveBeenCalled();
      });
    });
  });

  context('필드가 채워져 있는 경우', () => {
    it('제출이 가능하다.', async () => {
      renderComponent();
      const searchTitle = screen.getByPlaceholderText('제목을 작성해주세요.');
      const searchContent = screen.getByPlaceholderText('질문을 작성해주세요.');

      fireEvent.change(searchTitle, { target: { value: '테스트 제목' } });
      expect(searchTitle).toHaveValue('테스트 제목');
      fireEvent.change(searchContent, { target: { value: '테스트 질문' } });

      await waitFor(() => {
        expect(searchContent).toHaveValue('테스트 질문');
      });

      const searchSubmit = screen.getByRole('button', { name: '작성완료' });
      fireEvent.click(searchSubmit);
    });
  });
});

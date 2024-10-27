import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';

import { templateQueries } from '@/src/entities/template';
import CreateForm from './CreateForm';

const context = describe;
// TODO : 테스트코드 수정하기

jest.mock('@/src/entities/template', () => {
  const actualHooks = jest.requireActual('@/src/entities/template');
  return {
    ...actualHooks,
    templateQueries: {
      useFetchTemplate: jest.fn(),
    },
  };
});

const templateList = [
  { title: 'Template 1', questions: ['Question 1', 'Question 2'] },
  { title: 'Template 2', questions: ['Question A', 'Question B'] },
  { title: 'Template 2', questions: ['Question C', 'Question C'] },
];

describe('CreateForm', () => {
  const mockSubmit = jest.fn();
  const mockMove = jest.fn();

  const renderCompoent = () => {
    render(
      <TestProvider>
        <CreateForm
          onSubmit={mockSubmit}
          movePage={mockMove}
        />
      </TestProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (templateQueries.useFetchTemplate as jest.Mock).mockReturnValue({
      data: templateList,
    });
    jest.clearAllMocks();
  });

  context('렌더링 테스트', () => {
    it('대표 자소서 입력란이 렌더링된다.', () => {
      renderCompoent();
      expect(screen.getByPlaceholderText('자소서제목')).toBeInTheDocument();
    });

    it('각 버튼이 렌더링된다.', () => {
      renderCompoent();
      const backButton = screen.getByText('뒤로가기');
      const reviseButton = screen.getByText('작성완료');
      const addButton = screen.getByText('리스트 추가');
      expect(backButton).toBeInTheDocument();
      expect(reviseButton).toBeInTheDocument();
      expect(addButton).toBeInTheDocument();
    });
  });

  context('submit 테스트', () => {
    it('답변 문항의 길이가 30이하 이면 submit이 호출되지않는다.', async () => {
      renderCompoent();
      const submit = screen.getByText('작성완료');
      fireEvent.click(submit);

      await waitFor(() => {
        expect(mockSubmit).not.toHaveBeenCalled();
      });
    });
  });

  context('버튼 테스트', () => {
    it('뒤로가기 버튼을 클릭하면 mockMove가 호출된다.', () => {
      renderCompoent();
      const moveButton = screen.getByText('뒤로가기');
      fireEvent.click(moveButton);
      expect(mockMove).toHaveBeenCalled();
    });
  });
});

import { render, screen, fireEvent } from '@testing-library/react';

import { useTemplateStore, templateMutations } from '@/src/entities/template';

import TestProvider from '@/fixutures/TestProvider';

import TemplateDetail from './TemplateDetail';

jest.mock('@/src/entities/template', () => ({
  useTemplateStore: jest.fn(),
  templateMutations: {
    useDeleteTemplate: jest.fn(() => ({
      mutate: jest.fn(),
    })),
  },
}));

describe('TemplateDetail', () => {
  const mockClearCurTemplate = jest.fn();
  const mockMutate = jest.fn();

  const renderComponent = () => {
    render(
      <TestProvider>
        <TemplateDetail />
      </TestProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('선택된 템플릿이 없는 경우 경고 메시지를 렌더링한다.', () => {
    (useTemplateStore as unknown as jest.Mock).mockReturnValue({
      clearCurTemplate: mockClearCurTemplate,
      selectedTemplate: { questions: [] },
    });

    renderComponent();
    const warringMsg = screen.getByText('현재 선택된 리스트가 없습니다.');
    expect(warringMsg).toBeInTheDocument();
  });

  it('선택된 템플릿이 있을 경우 질문 목록과 삭제 아이콘을 렌더링한다.', () => {
    const mockQuestions = ['테스트 질문1', '테스트 질문2'];
    (useTemplateStore as unknown as jest.Mock).mockReturnValue({
      clearCurTemplate: mockClearCurTemplate,
      selectedTemplate: {
        title: '테스트 제목',
        questions: mockQuestions,
        templateId: 123,
      },
    });

    renderComponent();
    mockQuestions.forEach((question) => {
      expect(screen.getByText(new RegExp(question))).toBeInTheDocument();
    });
  });

  it('삭제 아이콘 클릭 시 removeTemplateItem 함수가 호출된다.', () => {
    (useTemplateStore as unknown as jest.Mock).mockReturnValue({
      clearCurTemplate: mockClearCurTemplate,
      selectedTemplate: {
        title: '테스트 제목',
        questions: ['테스트 질문1', '테스트 질문2'],
        templateId: 123,
      },
    });

    (templateMutations.useDeleteTemplate as jest.Mock).mockReturnValue({
      mutate: mockMutate,
    });

    renderComponent();
    const trashIcon = screen.getByLabelText('delete-Template');
    fireEvent.click(trashIcon);

    expect(mockMutate).toHaveBeenCalledWith(123);
    expect(mockClearCurTemplate).toHaveBeenCalled();
  });
});

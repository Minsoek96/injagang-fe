import { render, screen, fireEvent } from '@testing-library/react';
import { useTemplateStore, templateType } from '@/src/entities/template';

import TestProvider from '@/fixutures/TestProvider';
import TemplateTitleItem from './TemplateTitleItem';

jest.mock('@/src/entities/template', () => ({
  useTemplateStore: jest.fn(),
}));

describe('TemplateItem', () => {
  const mockSetSelectedTemplate = jest.fn();

  const sampleTemplate: templateType.IGetTemplate = {
    templateId: 1,
    title: 'Sample Template',
    questions: [],
  };

  const renderComponent = (selectedTemplate: templateType.IGetTemplate) => {
    (useTemplateStore as unknown as jest.Mock).mockReturnValue({
      setSelectedTemplate: mockSetSelectedTemplate,
      selectedTemplate,
    });

    render(
      <TestProvider>
        <TemplateTitleItem list={sampleTemplate} />
      </TestProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('템플릿이 선택되지 않은 경우 스타일이 적용된다.', () => {
    renderComponent({ templateId: 2, title: '다른 템플릿', questions: [] });

    const templateTitle = screen.getByText(sampleTemplate.title);
    expect(templateTitle).toHaveStyle('opacity: 0.2');
    expect(templateTitle).toHaveStyle('transform: scale(1)');
  });

  it('템플릿이 선택된 경우 스타일이 적용된다.', () => {
    renderComponent(sampleTemplate);

    const templateTitle = screen.getByText(sampleTemplate.title);
    expect(templateTitle).toHaveStyle('opacity: 1');
    expect(templateTitle).toHaveStyle('transform: scale(1.2)');
  });

  it('템플릿을 클릭하면 setSelectedTemplate 함수가 호출된다.', () => {
    renderComponent({ templateId: 2, title: 'Other Template', questions: [] });

    const templateTitle = screen.getByText(sampleTemplate.title);
    fireEvent.click(templateTitle);

    expect(mockSetSelectedTemplate).toHaveBeenCalledWith(sampleTemplate);
  });
});

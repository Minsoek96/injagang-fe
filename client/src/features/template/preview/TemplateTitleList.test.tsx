import { render, screen } from '@testing-library/react';

import { templateQueries, useTemplateStore } from '@/src/entities/template';

import TestProvider from '@/fixutures/TestProvider';
import { sampleGetTemplate } from '@/fixutures/entities/template';

import TemplateTitleList from './TemplateTitleList';

jest.mock('@/src/entities/template', () => ({
  templateQueries: {
    useFetchTemplate: jest.fn(),
  },
  useTemplateStore: jest.fn(),
}));

describe('TemplateTitleList', () => {
  const mockSetAddTemplateToggle = jest.fn();

  const renderComponent = () => {
    render(
      <TestProvider>
        <TemplateTitleList />
      </TestProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('템플릿 리스트가 있을 때 TemplateItem을 렌더링한다.', () => {
    (templateQueries.useFetchTemplate as jest.Mock).mockReturnValue({
      data: sampleGetTemplate,
    });
    (useTemplateStore as unknown as jest.Mock).mockReturnValue({
      isAddTemplate: false,
      selectedTemplate: sampleGetTemplate[2],
      setAddTemplateToggle: mockSetAddTemplateToggle,
    });

    renderComponent();

    sampleGetTemplate.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  it('isAddTemplate이 true일 때 "템플릿 추가" 버튼이 렌더링되지 않는다.', () => {
    (templateQueries.useFetchTemplate as jest.Mock).mockReturnValue({
      data: [],
    });
    (useTemplateStore as unknown as jest.Mock).mockReturnValue({
      isAddTemplate: true,
      setAddTemplateToggle: mockSetAddTemplateToggle,
    });

    renderComponent();

    expect(screen.queryByText('템플릿 추가')).not.toBeInTheDocument();
  });

  it('isAddTemplate이 false일 때 "템플릿 추가" 버튼이 렌더링 된다.', () => {
    (templateQueries.useFetchTemplate as jest.Mock).mockReturnValue({
      data: [],
    });
    (useTemplateStore as unknown as jest.Mock).mockReturnValue({
      isAddTemplate: false,
      setAddTemplateToggle: mockSetAddTemplateToggle,
    });

    renderComponent();

    expect(screen.queryByText('템플릿 추가')).toBeInTheDocument();
  });
});

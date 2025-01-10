import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';

import { templateQueries } from '@/src/entities/template';

import TemplateSelector from './TemplateSelector';

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
describe('TemplateSelector', () => {
  const mockAppend = jest.fn();
  const mockReset = jest.fn();

  const renderComponent = () => {
    render(
      <TestProvider>
        <TemplateSelector append={mockAppend} reset={mockReset} />
      </TestProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (templateQueries.useFetchTemplate as jest.Mock).mockReturnValue({
      data: templateList,
    });
  });

  it('템플릿 선택(선택사항)이 렌더링된다.', () => {
    renderComponent();
    const searchComboBox = screen.getByText(/템플릿 선택/);
    expect(searchComboBox).toBeInTheDocument();
  });

  it('템플릿을 변경하면 mockReset,mockAppend가 호출된다.', async () => {
    renderComponent();
    const searchComboBox = screen.getByLabelText(/자소서 선택/);
    expect(searchComboBox).toBeInTheDocument();

    fireEvent.change(searchComboBox, { target: { value: templateList[1].title } });

    await waitFor(() => {
      expect(mockReset).toHaveBeenCalled();
      expect(mockAppend).toHaveBeenCalled();
    });
  });
});

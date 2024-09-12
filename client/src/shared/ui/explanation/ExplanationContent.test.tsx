import { render, screen } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';
import 'jest-styled-components';

import ExplanationContent from '@/src/shared/ui/explanation/ExplanationContent';

describe('ExplanationContent', () => {
  const sampleList = ['test1', 'test2', 'test3'];
  const renderComponent = () =>
    render(
      <TestProvider>
        <ExplanationContent explanationList={sampleList} />
      </TestProvider>,
    );
  describe('리스트를 렌더링한다.', () => {
    it('첫번째 리스트의 경우 제목이다.', () => {
      renderComponent();
      sampleList.forEach((content, index) => {
        const isTitle = index === 0;
        if (isTitle) {
          const getTitle = screen.getByText(`[${content}]`);
          expect(getTitle).toBeInTheDocument();
          expect(getTitle.tagName).toBe('H1');
          return;
        }
        const getText = screen.getByText(content);
        expect(getText).toBeInTheDocument();
        expect(getText.tagName).toBe('P');
      });
    });
  });
});

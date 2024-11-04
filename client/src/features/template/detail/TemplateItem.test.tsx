import { render, screen } from '@testing-library/react';

import TemplateItem from './TemplateItem';

describe('TemplateItem', () => {
  const renderComponent = (index: number, question: string) => {
    render(<TemplateItem index={index} question={question} />);
  };

  it('인덱스와 질문 내용을 렌더링한다.', () => {
    const index = 0;
    const question = '이것은 테스트 질문입니다.';

    renderComponent(index, question);

    expect(screen.getByText(`${index + 1}. ${question}`)).toBeInTheDocument();
  });

  it('인덱스가 1일 때 질문', () => {
    const index = 1;
    const question = '다른 질문 내용입니다.';

    renderComponent(index, question);

    expect(screen.getByText(`${index + 1}. ${question}`)).toBeInTheDocument();
  });
});

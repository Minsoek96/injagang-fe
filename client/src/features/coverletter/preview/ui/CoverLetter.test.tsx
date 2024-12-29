import { useRouter } from 'next/router';

import { fireEvent, render, screen } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';

import CoverLetter from './CoverLetter';

const context = describe;

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

describe('CoverLetter', () => {
  context('컴포넌트가 렌더링 될 때', () => {
    it('자소서 목록 제목이 화면에 나타난다.', () => {
      render(
        <TestProvider>
          <CoverLetter />
        </TestProvider>,
      );
      const searchTitle = screen.getByText(/나의 자기소개서 목록/);
      expect(searchTitle).toBeInTheDocument();
    });
    it('자소서 작성 버튼이 렌더링 된다.', () => {
      render(
        <TestProvider>
          <CoverLetter />
        </TestProvider>,
      );
      const searchBtn = screen.getByText(/새로 작성하기/);
      expect(searchBtn).toBeInTheDocument();
    });
  });

  context('자소서 작성 버튼을 클릭하면', () => {
    it('페이지를 이동한다.', () => {
      const { push } = useRouter();
      render(
        <TestProvider>
          <CoverLetter />
        </TestProvider>,
      );
      const searchBtn = screen.getByText(/새로 작성하기/);
      fireEvent.click(searchBtn);
      expect(push).toHaveBeenCalledWith('/coverLetter/new');
    });
  });
});

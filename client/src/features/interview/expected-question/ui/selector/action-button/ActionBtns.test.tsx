import { render, screen, fireEvent } from '@testing-library/react';

import { useAuthStore } from '@/src/entities/auth';

import TestProvider from '@/fixutures/TestProvider';

import ActionButtons from './ActionButtons';

jest.mock('@/src/entities/auth', () => ({
  useAuthStore: jest.fn(),
}));

const context = describe;
describe('ActionButtons 컴포넌트', () => {
  const mockOnRemove = jest.fn();
  const mockOnChecked = jest.fn();
  const mockOnAdd = jest.fn();

  const renderComponent = (role: string, isAllChecked = false) => {
    (useAuthStore as unknown as jest.Mock).mockImplementation((selector) => selector({
      role,
    }));

    render(
      <TestProvider>
        <ActionButtons
          onRemove={mockOnRemove}
          onChecked={mockOnChecked}
          isAllChecked={isAllChecked}
          onAdd={mockOnAdd}
        />
      </TestProvider>,
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  context('공통적인 권한', () => {
    it('isAllChecked가 false일 때 "전체선택" 버튼을 렌더링한다', () => {
      renderComponent('USER', false);
      expect(screen.getByText('전체선택')).toBeInTheDocument();
    });

    it('isAllChecked가 true일 때 "전체해제" 버튼을 렌더링한다', () => {
      renderComponent('ADMIN', true);
      expect(screen.getByText('전체해제')).toBeInTheDocument();
    });

    it('"전체선택" 또는 "전체해제" 버튼을 클릭하면 onChecked 핸들러를 호출한다', () => {
      renderComponent('USER');
      const checkButton = screen.getByText('전체선택');
      fireEvent.click(checkButton);
      expect(mockOnChecked).toHaveBeenCalled();
    });
  });

  context('USER 권한을 가지고 있는 상황이라면', () => {
    it('항목추가 버튼을 렌더링한다', () => {
      renderComponent('USER');
      expect(screen.getByText('항목추가')).toBeInTheDocument();
    });

    it('버튼을 클릭하면 onAdd 핸들러를 호출한다', () => {
      renderComponent('USER');
      const addButton = screen.getByText('항목추가');
      fireEvent.click(addButton);
      expect(mockOnAdd).toHaveBeenCalled();
    });
  });

  context('ADMIN 권한을 가지고 있는 상황이라면', () => {
    it('삭제하기 버튼을 렌더링한다', () => {
      renderComponent('ADMIN');
      expect(screen.getByText('삭제하기')).toBeInTheDocument();
    });

    it('  버튼을 클릭하면 onRemove 핸들러를 호출한다', () => {
      renderComponent('ADMIN');
      const removeButton = screen.getByText('삭제하기');
      fireEvent.click(removeButton);
      expect(mockOnRemove).toHaveBeenCalled();
    });
  });
});

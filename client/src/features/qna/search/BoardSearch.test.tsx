import { render, screen, fireEvent } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';

import { useBoardStore } from '@/src/entities/qnaboard';
import BoardSearch from './BoardSearch';

jest.mock('@/src/entities/qnaboard', () => ({
  useBoardStore: jest.fn(),
}));

jest.mock('@/src/shared/hooks', () => ({
  useDebounce: jest.fn((value) => value),
}));

describe('BoardSearch Component', () => {
  const mockSetBoardType = jest.fn();
  const mockSetBoardSearch = jest.fn();

  const renderComponent = () => {
    render(
      <TestProvider>
        <BoardSearch />
      </TestProvider>,
    );
  };

  beforeEach(() => {
    (useBoardStore as unknown as jest.Mock).mockReturnValue({
      setBoardType: mockSetBoardType,
      setBoardSearch: mockSetBoardSearch,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('ComboBox와 MainInput이 렌더링된다', () => {
    renderComponent();
    const searchComboBox = screen.getByLabelText('검색');
    const searchInput = screen.getByPlaceholderText(/Search/);
    expect(searchComboBox).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
  });

  it('검색 타입이 변경되면 setBoardType이 호출된다', () => {
    renderComponent();
    const searchComboBox = screen.getByLabelText('검색');

    fireEvent.change(searchComboBox, { target: { value: '제목' } });
    expect(mockSetBoardType).toHaveBeenCalledWith('title');
    expect(mockSetBoardSearch).toHaveBeenCalledWith('');
  });

  it('검색어 입력 시 setBoardSearch가 디바운스 후 호출된다', () => {
    renderComponent();
    const searchInput = screen.getByPlaceholderText('Search..');

    fireEvent.change(searchInput, { target: { value: '테스트 검색어' } });
    expect(mockSetBoardSearch).toHaveBeenCalledWith('테스트 검색어');
  });

  it('검색어 입력 시 ComboBox와 검색어가 초기화된다', () => {
    renderComponent();
    const searchComboBox = screen.getByLabelText('검색');
    const searchInput = screen.getByPlaceholderText('Search..') as HTMLInputElement;

    fireEvent.change(searchComboBox, { target: { value: '제목' } });
    fireEvent.change(searchInput, { target: { value: '테스트 검색어' } });

    expect(searchInput.value).toBe('테스트 검색어');
  });
});

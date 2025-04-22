import { act, renderHook } from '@testing-library/react';
import { ERROR_MESSAGES, MODAL_MESSAGES } from '@/src/shared/const';
import { useModal } from '@/src/shared/hooks';
import { useCorrectionStore } from '@/src/entities/qnaboard';
import useDragCorrection from './useDragCorrection';

jest.mock('@/src/shared/hooks', () => ({
  useModal: jest.fn(),
}));

jest.mock('@/src/entities/qnaboard', () => ({
  useCorrectionStore: jest.fn(),
}));

const context = describe;

describe('useDragCorrection', () => {
  const mockSetModal = jest.fn();
  const initCorrectionMock = jest.fn();
  const setCorrectionMock = jest.fn();
  let getSelectionMock: jest.SpyInstance<Selection | null>;

  /** getSelector 목킹 함수
   *
   * @param selectedText - 첨삭 텍스트
   * @param startOffset - 원본 텍스트 시작 지점
   * @param endOffset - 원복 텍스트 끝 지점
   */
  const setupSelectionMock = (selectionText: string, startOffset = 1, endOffset = 2) => {
    getSelectionMock.mockReturnValue({
      toString: () => selectionText,
      getRangeAt: jest.fn().mockReturnValue({
        startOffset,
        endOffset,
      }),
    } as unknown as Selection);
  };

  const setupHook = () => renderHook(() => useDragCorrection());

  beforeEach(() => {
    jest.clearAllMocks();
    getSelectionMock = jest.spyOn(window, 'getSelection');

    (useModal as jest.Mock).mockReturnValue({
      setModal: mockSetModal,
    });

    (useCorrectionStore as unknown as jest.Mock).mockImplementation((selector) => selector({
      initCorrection: initCorrectionMock,
      setCorrection: setCorrectionMock,
    }));
  });

  context('선택된 텍스트가 원본에 포함되는 경우', () => {
    it('첨삭 내용을 업데이트 한다.', () => {
      const selectionText = '선택된 텍스트';
      setupSelectionMock(selectionText);

      const { result } = setupHook();

      const originText = '이 텍스트는 선택된 텍스트를 포함한다.';
      act(() => {
        result.current.handleCorrection(1, originText);
      });

      expect(result.current.selectedText.selectedText).toBe(selectionText);
    });

    it('정규화 필터링을 통과하고 첨삭내용을 업데이트 한다.', () => {
      const selectionText = '선택된 텍스트';
      setupSelectionMock(selectionText);

      const { result } = setupHook();

      const originText = '이 텍스트는\n선택된   텍스트를\n포함한다.';
      act(() => {
        result.current.handleCorrection(1, originText);
      });

      expect(result.current.selectedText.selectedText).toBe(selectionText);
    });

    it('이미 첨삭 내용이 존재하면 경고 메시지를 전달한다.', () => {
      const selectionText = '선택된 텍스트';
      setupSelectionMock(selectionText);

      const { result } = setupHook();

      const originText = '이 텍스트는 선택된 텍스트를 포함한다.';
      act(() => {
        result.current.selectedText.added = true;
        result.current.handleCorrection(1, originText);
      });

      expect(mockSetModal).toHaveBeenCalledWith({
        title: MODAL_MESSAGES.WARNING,
        message: ERROR_MESSAGES.DUPLICATION_TEXT,
      });
    });
  });

  context('첨삭된 내용이 원본에 존재하지 않는 경우', () => {
    it('첨삭 내용이 업데이트되지 않는다.', () => {
      const selectionText = '잘못된 영역의 텍스트 드래그';
      setupSelectionMock(selectionText);

      const { result } = setupHook();

      const originText = '이 텍스트는 선택된 텍스트를 포함하지 않는다.';
      act(() => {
        result.current.handleCorrection(1, originText);
      });

      expect(result.current.selectedText.selectedText).toBe('');
    });
  });

  it('삭제를 요청하면 initCorrection이 호출된다.', () => {
    const { result } = setupHook();
    act(() => {
      result.current.removeCorrection();
    });
    expect(initCorrectionMock).toHaveBeenCalled();
  });
});

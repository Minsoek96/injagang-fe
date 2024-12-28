import { renderHook } from '@testing-library/react';

import useProgressCoverLetter from '@/src/features/coverletter/new/useProgressCoverLetter';
import { useTempStore } from '@/src/entities/coverLetter';
import { useAutoSave } from '@/src/shared/hooks';

const context = describe;

jest.mock('@/src/entities/coverLetter', () => ({
  useTempStore: jest.fn(),
}));

jest.mock('@/src/shared/hooks/', () => ({
  useAutoSave: jest.fn(),
}));

describe('useProgressCoveLetter', () => {
  const mockReset = jest.fn();
  const getValues = jest.fn();
  const mockSetDraft = jest.fn();

  /** 임시 저장 스토어 목킹 */
  const mockTempStore = (beforeCoveLetter = {}) => {
    (useTempStore as unknown as jest.Mock).mockReturnValue({
      setDraft: mockSetDraft,
      draftCoverLetter: beforeCoveLetter,
    });
  };

  /** 자동 저장 훅 목킹 */
  const mockAutoSave = (shouldRestoreDraft: boolean = false) => {
    (useAutoSave as jest.Mock).mockReturnValue({
      shouldRestoreDraft,
      setShouldRestoreDraft: jest.fn(),
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockAutoSave(true);
  });

  context('자동 저장', () => {
    it('현재 작성중인 폼 데이터를 저장한다.', () => {
      mockTempStore();
      const formData = {
        title: '제목',
        qnaList: [{ id: 1, question: 'Q1', answer: 'A1' }],
      };
      getValues.mockReturnValue(formData);
      renderHook(() => useProgressCoverLetter(mockReset, getValues));
      const mockHandleSave = (useAutoSave as jest.Mock).mock.calls[0][1];
      mockHandleSave();
      expect(mockSetDraft).toHaveBeenCalledWith(formData);
    });
  });

  context('복구 옵션에 동의 하면', () => {
    it('이전 내용을 복구 한다.', () => {
      const beforeData = {
        title: '이전 내용',
        qnaList: [{ id: 1, question: 'Q1', answer: 'A1' }],
      };
      mockTempStore(beforeData);
      renderHook(() => useProgressCoverLetter(mockReset, getValues));
      expect(mockReset).toHaveBeenCalledWith(beforeData);
    });
  });

  context('복구 옵션에 동의 하지 않으면', () => {
    it('이전 내용을 복구 하지 않는다.', () => {
      const beforeData = {
        title: '이전 내용',
        qnaList: [{ id: 1, question: 'Q1', answer: 'A1' }],
      };
      mockTempStore(beforeData);
      mockAutoSave(false);
      renderHook(() => useProgressCoverLetter(mockReset, getValues));
      expect(mockReset).not.toHaveBeenCalledWith(beforeData);
    });
  });
});

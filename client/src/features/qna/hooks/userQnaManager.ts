import { useCallback } from 'react';

import { useBoardStore, useCorrectionStore, useFeedStore } from '@/src/entities/qnaboard';
import { feedbackType } from '@/src/entities/feedback';

// TODO 지우기 복잡한 관계를 만듬
const useQnaManagerStore = () => {
  const { correction, setCorrection, initCorrection } = useCorrectionStore();
  const {
    boardSearch, boardType, setBoardSearch, setBoardType, totalPage,
  } = useBoardStore();
  const { targetFeed, setTargetFeed, initTargetFeed } = useFeedStore();

  const dispatchChangeCorrection = useCallback(
    (newCorrection: feedbackType.CorrectionItem) => {
      setCorrection(newCorrection);
    },
    [],
  );

  const dispatchInitCorrection = useCallback(() => {
    initCorrection();
  }, []);

  const dispatchChangeFeed = useCallback((feed: number) => {
    setTargetFeed(feed);
  }, []);

  const dispatchClearTargetFeed = useCallback(() => {
    initTargetFeed();
  }, []);

  const dispatchChangeSearch = useCallback((newSearch: string) => {
    setBoardSearch(newSearch);
  }, []);

  const dispatchChangeType = useCallback((type: string) => {
    setBoardType(type);
  }, []);

  return {
    dispatchChangeCorrection,
    selectedCorrection: correction,
    dispatchInitCorrection,
    targetFeed,
    dispatchChangeFeed,
    dispatchClearTargetFeed,
    dispatchChangeType,
    dispatchChangeSearch,
    boardSearch,
    boardType,
    totalPage,
  };
};

export default useQnaManagerStore;
// userQnaManager;

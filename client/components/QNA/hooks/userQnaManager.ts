import { useCallback } from 'react';

import { useBoardStore, useCorrectionStore, useFeedStore } from '@/store/qna';
import { CorrectionItem } from '@/types/feedback/FeedBackType';

const useQnaManagerStore = () => {
  const { correction, setCorrection, initCorrection } = useCorrectionStore();
  const {
    boardSearch, boardType, setBoardSearch, setBoardType, totalPage,
  } = useBoardStore();
  const { targetFeed, setTargetFeed, initTargetFeed } = useFeedStore();

  const dispatchChangeCorrection = useCallback(
    (newCorrection: CorrectionItem) => {
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

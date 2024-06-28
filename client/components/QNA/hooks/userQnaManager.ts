import { useCallback } from "react";

import { CorrectionItem } from "../Answer/AnswerLayout";

import { useBoardStore, useCorrectionStore, useFeedStore } from "@/store/qna";

const userQnaManager = () => {
  const { correction, setCorrection, initCorrection } = useCorrectionStore();
  const { boardSearch, boardType, setBoardSearch, setBoardType, totalPage } =
    useBoardStore();
  const { targetFeed, setTargetFeed, initTargetFeed } = useFeedStore();

  const dispatchChangeCorrection = useCallback((correction: CorrectionItem) => {
    setCorrection(correction);
  }, []);

  const dispatchInitCorrection = useCallback(() => {
    initCorrection();
  }, []);

  const dispatchChangeFeed = useCallback((targetFeed: number) => {
    setTargetFeed(targetFeed);
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

export default userQnaManager;

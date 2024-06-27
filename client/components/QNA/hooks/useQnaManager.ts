import { useCallback } from "react";

import { useSelector, useDispatch } from "react-redux";

import { getBoardList } from "@/components/redux/QnA/actions";
import { RootReducerType } from "@/components/redux/store";
import { useDeleteBoard } from "@/api/QnABoard/mutaions";

const useQnaManager = () => {
  const dispatch = useDispatch();
  const {mutate: deleteBoard} = useDeleteBoard();
  const { qnaIdList, boardList, boardInFoList, isUpdated } = useSelector(
    (state: RootReducerType) => state.board,
  );

  //AnswerDetail
  const dispatchRemoveBoard = useCallback((targetId: number) => {
    deleteBoard(targetId)
  }, []);

  const dispatchGetBoardList = useCallback(
    (targetId: number, title?: string, content?: string) => {
      dispatch(getBoardList(targetId, title, content));
    },
    [],
  );

  return {
    dispatchRemoveBoard,
    dispatchGetBoardList,
    qnaIdList,
    boardList,
    boardInFoList,
    isUpdated,
  };
};

export default useQnaManager;

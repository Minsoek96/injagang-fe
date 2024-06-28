import React, { useEffect } from "react";

import AnswerDragView from "./AnswerDragView";
import BoardItem from "./BoardItem";
import EditMenuBar from "./EditMenuBar";

import { Card, ColBox, ScrollBar } from "@/styles/GlobalStyle";
import styled from "styled-components";
import { useFetchBoardDetail } from "@/api/QnABoard/queries";
import { useRouter } from "next/router";
import { useBoardStore } from "@/store/qna";

const AnswerDetailView = () => {
  const router = useRouter();
  const { setQuestions } = useBoardStore();
  const boardId = router.query;
  const {
    data: boardList,
    isLoading,
    isError,
  } = useFetchBoardDetail(Number(boardId.id));

  useEffect(() => {
    console.log("et", boardList);
    if (boardList) {
      const questions = boardList.qnaList.map(item => item.qnaId);
      setQuestions(questions);
    }
  }, [boardList]);

  if (isLoading) return <p>유저의 질문을 받아오는중입니다.</p>;

  if (isError || !boardList) return <p>오류가 발생했습니다.</p>;
  return (
    <Card size={{ width: "80%", height: "45vh", flex: "row" }}>
      <SwitchContainer>
        <LeftContainer>
          <BoardItem {...boardList} />
        </LeftContainer>
        <RigthContainer>
          <AnswerDragView boardId={Number(boardId.id)} />
        </RigthContainer>
      </SwitchContainer>
      {boardList?.owner && <EditMenuBar boardID={boardList.boardId} />}
    </Card>
  );
};

export default AnswerDetailView;
const LeftContainer = styled.div`
  ${ColBox}
  ${ScrollBar}
  overflow-x: hidden;
  width: 50%;
  height: 100%;
  word-break: break-all;
  @media screen and (max-width: 1200px) {
    width: 100%;
    height: 45%;
  }
`;

const RigthContainer = styled.div`
  ${ColBox}
  height: 100%;
  width: 50%;
  @media screen and (max-width: 1200px) {
    width: 100%;
    height: 45%;
  }
`;

const SwitchContainer = styled.div`
  display: flex;
  width: 100%;
  height: 95%;
  gap: 30px;
  padding: 8px;

  @media screen and (max-width: 1200px) {
    flex-direction: column;
  }
`;

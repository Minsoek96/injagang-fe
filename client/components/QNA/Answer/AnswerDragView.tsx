import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootReducerType } from "../../redux/store";

import { CorrectionItem } from "./AnswerWirte";
import { ScrollBar } from "@/styles/GlobalStyle";
import useDragCorrection from "../hooks/useDragCorrection";
import AnswerDragItem from "./AnswerDragItem";

interface AnswerDragProps {
  onChange: React.Dispatch<React.SetStateAction<CorrectionItem>>;
}

/**드래그 첨삭 기능을 가진 자소서 View */
const AnswerDragView = ({ onChange }: AnswerDragProps) => {
  const { handleCorrection, selectedText, removeCorrection, Modal } =
    useDragCorrection();

  const { boardList } = useSelector((state: RootReducerType) => state.board);

  useEffect(() => {
    handleApply();
  }, [selectedText]);

  /**드래그 첨삭 적용 */
  const handleApply = () => {
    onChange({
      targetQuestion: selectedText.dragTitleId,
      targetAnswer: selectedText.selectedText,
      targetQuestionIndex: selectedText.targetId,
    });
  };



  return (
    <AnswerDragStyle>
      <h2 className="essay_title">{boardList?.essayTitle}</h2>
      {boardList?.qnaList &&
        boardList.qnaList.map((list, idx) => (
          <AnswerDragItem
            key={list.qnaId}
            onSelect={handleCorrection}
            onRemove={removeCorrection}
            index={idx}
            selectedText={selectedText}
            list={list}
          />
        ))}
      <Modal />
    </AnswerDragStyle>
  );
};

export default AnswerDragView;

const AnswerDragStyle = styled.div`
  ${ScrollBar}
  background-color: #191919;
  color: #dad6d1;
  padding: 15px;
  height: 100vh;
  width: 100%;
  word-break: break-all;
  overflow-x: hidden;
  .essay_title {
    text-align: center;
  }
`;

import React from "react";

import { StyleButton } from "@/styles/GlobalStyle";
import { IQuestion } from "@/types/InterViewQuestion/InterViewQuestionType";
import useAuthStore from "@/store/auth/useAuthStore";


interface ActionBtnProps {
  checkList: number[];
  selectedType: string;
  onRemove: (checkList: number[], selectedType: string) => void;
  onToggleAll: () => void;
  isAllChecked: boolean;
  onAdd: (questions: IQuestion[], checkList: number[]) => void;
  questions: IQuestion[];
}

const ActionBtns = ({
  onToggleAll,
  onRemove,
  checkList,
  selectedType,
  isAllChecked,
  onAdd,
  questions,
}: ActionBtnProps) => {
  const { role } = useAuthStore();
  const isAdmin = role === "ADMIN" ? "ADMIN" : "USER";

  const handleRemove = () => {
    onToggleAll();
    onRemove(checkList, selectedType);
  };

  const btnConfig = {
    ADMIN: {
      onClick: handleRemove,
      text: "삭제하기",
    },
    USER: {
      onClick: () => onAdd(questions, checkList),
      text: "항목추가",
    },
  };

  return (
    <div>
      <StyleButton
        onClick={onToggleAll}
        Size={{ width: "100px", font: "15px" }}
      >
        {isAllChecked ? "전체해제" : "전체선택"}
      </StyleButton>
      <StyleButton
        onClick={btnConfig[isAdmin].onClick}
        Size={{ width: "100px", font: "15px" }}
      >
        {btnConfig[isAdmin].text}
      </StyleButton>
    </div>
  );
};

export default ActionBtns;

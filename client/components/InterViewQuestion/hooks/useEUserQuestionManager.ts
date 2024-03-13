import { useCallback, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedQuestionsAction,
  setTypeAction,
} from "@/components/redux/InterViewQuestion/user/action";
import { RootReducerType } from "@/components/redux/store";

import useExpectedQuestionManager from "./useExpectedQuestionManager";

import { QuestionType } from "@/types/InterViewQuestion/InterViewQuestionType";
import { InterviewQuestionList } from "@/components/redux/InterViewQuestion/types";

const useEUserQuestionManager = () => {
  const dispatch = useDispatch();
  const { selectedQuestions, selectedType } = useSelector(
    (state: RootReducerType) => state.userInterViewQuestions,
  );
  const { dispatchGetInterViewQnaList } = useExpectedQuestionManager();

  useEffect(() => {
    dispatchGetInterViewQnaList(selectedType);
  }, [selectedType]);

  const dispatchSelectedType = useCallback((type: QuestionType | string) => {
    dispatch(setTypeAction(type));
  }, []);

  const dispatchSelectedQuestions = useCallback(
    (questions: InterviewQuestionList[], checkList: number[]) => {
      const filterItem = questions.filter((question, i) =>
        checkList.includes(question.id),
      );
      const questionList = filterItem.map((item, i) => item.questions);
      dispatch(setSelectedQuestionsAction(questionList));
    },
    [],
  );

  return {
    selectedQuestions,
    selectedType,
    dispatchSelectedType,
    dispatchSelectedQuestions,
  };
};

export default useEUserQuestionManager;

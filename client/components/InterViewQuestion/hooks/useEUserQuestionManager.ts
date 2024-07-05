import { useCallback } from 'react';

import {
  IQuestion,
  QuestionType,
} from '@/types/InterViewQuestion/InterViewQuestionType';

import { useInterViewStore } from '@/store/interview';

type ManagerProps = {
  typeCheckCallback: () => void; // 타입 선택시 전체 체크 상태 해제
};
const useEUserQuestionManager = ({
  typeCheckCallback = () => {},
}: ManagerProps) => {
  const {
    selectedType,
    setSelectedType,
    setUserPlayList,
    initUserPlayList,
    userPlayList,
  } = useInterViewStore();

  const dispatchSelectedType = useCallback(
    (type: QuestionType | string) => {
      setSelectedType(type);

      if (typeCheckCallback) {
        typeCheckCallback();
      }
    },
    [typeCheckCallback],
  );

  const dispatchSelectedQuestions = useCallback(
    (questions: IQuestion[], checkList: number[]) => {
      const filterItem = questions.filter((question) =>
        checkList.includes(question.id));
      const questionList = filterItem.map((item) => item.questions);
      setUserPlayList(questionList);
    },
    [],
  );

  const dispatchClearSelectedQuestions = useCallback(() => {
    initUserPlayList();
  }, []);

  return {
    selectedQuestions: userPlayList,
    selectedType,
    dispatchSelectedType,
    dispatchSelectedQuestions,
    dispatchClearSelectedQuestions,
  };
};

export default useEUserQuestionManager;

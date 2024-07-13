import { useCallback } from 'react';

import {
  interviewType,
  useInterViewStore,
} from '@/src/entities/interview_question';

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
    (type: interviewType.QuestionType | string) => {
      setSelectedType(type);

      if (typeCheckCallback) {
        typeCheckCallback();
      }
    },
    [typeCheckCallback],
  );

  const dispatchSelectedQuestions = useCallback(
    (questions: interviewType.IQuestion[], checkList: number[]) => {
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

import { useCallback } from 'react';

import {
  interviewType,
  useQuestionStore,
} from '@/src/entities/interview_question';

type ManagerProps = {
  typeCheckCallback: () => void; // 타입 선택시 전체 체크 상태 해제
};
const useSelectorLogic = ({
  typeCheckCallback = () => {},
}: ManagerProps) => {
  const {
    selectedType,
    setSelectedType,
    setUserPlayList,
  } = useQuestionStore();

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

  return {
    selectedType,
    dispatchSelectedType,
    dispatchSelectedQuestions,
  };
};

export default useSelectorLogic;

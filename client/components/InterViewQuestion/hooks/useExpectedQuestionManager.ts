import {
  IAddQuestions,
} from '@/types/InterViewQuestion/InterViewQuestionType';
import { useInterViewStore } from '@/store/interview';
import { useFetchQuestions } from '@/apis/interview_question/queries';
import {
  useAddInterViewQ,
  useDeleteInterViewQ,
} from '@/apis/interview_question/mutations';

const useExpectedQuestionManager = () => {
  const { selectedType } = useInterViewStore();
  const { data: interViewQuestionList = [] } = useFetchQuestions(selectedType);
  const { mutate: deleteQuestions } = useDeleteInterViewQ();
  const { mutate: addQuestions } = useAddInterViewQ();

  const { setConfirmQuestions } = useInterViewStore();

  const dispatchRemoveQuestions = (targetIds: number[]) => {
    const formmatData = {
      ids: targetIds,
    };
    deleteQuestions(formmatData);
  };

  const dispatchAddQuestions = (newList: IAddQuestions) => {
    addQuestions(newList);
  };

  // TODO : 추후에 InterView관련 작업 할때 옮기기를 고려
  const dispatchAddInterViewList = (confirmedData: string[]) => {
    setConfirmQuestions(confirmedData);
  };

  return {
    interViewQuestionList,
    dispatchRemoveQuestions,
    dispatchAddQuestions,
    dispatchAddInterViewList,
  };
};

export default useExpectedQuestionManager;

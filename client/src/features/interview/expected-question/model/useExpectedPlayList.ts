import { useCallback } from 'react';

import { useAuthStore } from '@/src/entities/auth';
import {
  useIntvPlaylistStore, interviewMutation, interviewType, getQuestionTypeByLabel,
} from '@/src/entities/interview_question';

import { useModal } from '@/src/shared/hooks';
import { ERROR_MESSAGES, MODAL_MESSAGES } from '@/src/shared/const';

// TODO : 어드민 기능 분리하기 쓸데없는 리렌더링 유발
const useExpetedPlayList = () => {
  const selectedType = useIntvPlaylistStore((state) => state.selectedType);
  const userPlayList = useIntvPlaylistStore((state) => state.userPlayList);
  const initUserPlayList = useIntvPlaylistStore((state) => state.initUserPlayList);
  const removePlayItem = useIntvPlaylistStore((state) => state.removePlayItem);
  const setUserPlayList = useIntvPlaylistStore((state) => state.setUserPlayList);

  const role = useAuthStore((state) => state.role);

  const { mutate: dispatchAddQuestions } = interviewMutation.useAddInterViewQ();

  const { setModal } = useModal();

  /** 입력한 텍스트 리스트에 추가 */
  const addQuestion = useCallback(
    (text: string) => {
      if (text === '') {
        setModal({
          title: MODAL_MESSAGES.WARNING,
          message: ERROR_MESSAGES.FILL_BLANKS,
        });
        return;
      }
      setUserPlayList([text]);
    },
    [],
  );

  /** 현재 리스트에서 삭제 */
  const removeQuestion = useCallback((item: string) => {
    removePlayItem(item);
  }, []);

  /** ADMIN 인터뷰리스트 추가 */
  const submitQuestions = useCallback(() => {
    if (selectedType === 'ALL') {
      setModal({
        title: MODAL_MESSAGES.WARNING,
        message: ERROR_MESSAGES.DOESN_T_TYPE,
      });
      return;
    }
    const addList = {
      questions: userPlayList,
      questionType: getQuestionTypeByLabel(selectedType as interviewType.QuestionTypeKrValue),
    };
    dispatchAddQuestions(addList);
    initUserPlayList();
  }, [userPlayList, selectedType]);

  const roleAction = role === 'ADMIN' ? submitQuestions : initUserPlayList;

  return {
    userPlayList,
    removeQuestion,
    addQuestion,
    roleAction,
  };
};

export default useExpetedPlayList;

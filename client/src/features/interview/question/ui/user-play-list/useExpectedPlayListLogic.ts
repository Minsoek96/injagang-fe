import { useCallback } from 'react';

import { useAuthStore } from '@/src/entities/auth';
import { useQuestionStore, interviewMutation } from '@/src/entities/interview_question';

import { useModal } from '@/src/shared/hooks';
import { ERROR_MESSAGES, MODAL_MESSAGES } from '@/src/shared/const';

const useExpetedPlayListLogic = () => {
  const {
    selectedType,
    userPlayList,
    initUserPlayList,
    removePlayItem,
    setUserPlayList,
  } = useQuestionStore();

  const { mutate: dispatchAddQuestions } = interviewMutation.useAddInterViewQ();

  const { role } = useAuthStore();
  const { setModal } = useModal();

  /** 입력한 텍스트 리스트에 추가 */
  const handleAddText = useCallback(
    (text: string) => {
      if (text === '') {
        setModal({
          contents: {
            title: MODAL_MESSAGES.WARNING,
            message: ERROR_MESSAGES.FILL_BLANKS,
          },
        });
        return;
      }
      setUserPlayList([text]);
    },
    [],
  );

  /** 현재 리스트에서 삭제 */
  const handleRemoveText = useCallback((item: string) => {
    removePlayItem(item);
  }, []);

  /** ADMIN 인터뷰리스트 추가 */
  const handleSubmit = useCallback(() => {
    if (selectedType === 'ALL') {
      setModal({
        contents: {
          title: MODAL_MESSAGES.WARNING,
          message: ERROR_MESSAGES.DOESN_T_TYPE,
        },
      });
      return;
    }
    const addList = {
      questions: userPlayList,
      questionType: selectedType,
    };
    dispatchAddQuestions(addList);
    initUserPlayList();
  }, [userPlayList, selectedType]);

  const roleAction = role === 'ADMIN' ? handleSubmit : initUserPlayList;

  return {
    userPlayList,
    handleRemoveText,
    handleAddText,
    roleAction,
  };
};

export default useExpetedPlayListLogic;

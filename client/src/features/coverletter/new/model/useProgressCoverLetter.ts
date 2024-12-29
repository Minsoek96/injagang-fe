import { useEffect } from 'react';

import { UseFormGetValues, UseFormReset } from 'react-hook-form';

import { coverLetterType, useTempStore } from '@/src/entities/coverLetter';
import { useAutoSave } from '@/src/shared/hooks';

/**
* 자기소개서 작성 중인 데이터를 자동 저장하고 복구하는 훅
* - 5초 간격으로 현재 작성 중인 내용을 임시 저장
* - 저장된 데이터가 있을 경우 복구 옵션 제공
*
* @param reset - react-hook-form의 폼 초기화 함수
* @param getValues - react-hook-form의 현재 폼 값 조회 함수
*/
const useProgressCoverLetter = (
  reset: UseFormReset<coverLetterType.IWriteCoverLetter>,
  getValues: UseFormGetValues<coverLetterType.IWriteCoverLetter>,
) => {
  const { setDraft, draftCoverLetter } = useTempStore();

  const handleSave = () => {
    const { qnaList, title } = getValues();
    setDraft({ title, qnaList });
  };

  // 자동 저장
  const { shouldRestoreDraft, setShouldRestoreDraft } = useAutoSave(
    Boolean(draftCoverLetter?.qnaList?.length),
    handleSave,
  );

  // 복구
  const handleRestore = () => {
    const { qnaList = [], title = '' } = draftCoverLetter ?? {};
    reset({ title, qnaList });
    setShouldRestoreDraft(false);
  };

  useEffect(() => {
    if (shouldRestoreDraft && draftCoverLetter) {
      handleRestore();
    }
  }, [draftCoverLetter, shouldRestoreDraft]);
};

export default useProgressCoverLetter;

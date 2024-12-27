import {
  useEffect, useState,
} from 'react';

import { useInterval, useModal } from '@/src/shared/hooks';

const useAutoSave = (hasDraft: boolean, onSave: () => void) => {
  const [shouldRestoreDraft, setShouldRestoreDraft] = useState(false);
  const { setModal } = useModal();

  useEffect(() => {
    if (hasDraft) {
      setModal({
        title: '내용 복구',
        message: '저장되지 않은 이전 작성 내용이 있습니다.\n복구하시겠습니까?',
        onAction: () => {
          setShouldRestoreDraft(true);
        },
      });
    }
  }, []);

  useInterval(onSave, 5000);

  return {
    shouldRestoreDraft,
    setShouldRestoreDraft,
  };
};

export default useAutoSave;

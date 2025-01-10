import { useEffect, useState } from 'react';

import useInterval from '@/src/shared/hooks/interval/useInterval';
import useModal from '@/src/shared/hooks/modal/useModal';

/**
 * 폼 데이터의 자동 저장 및 복구를 관리하는 훅
 * - 5초 간격으로 자동 저장
 * - 이전 작성 내용이 있을 경우 복구 옵션 제공
 *
 * @param hasDraft - 저장된 임시 데이터 존재 여부
 * @param onSave - 저장 실행 함수
 *
 * @returns sholudRestoreDraft - 복구 실행 여부 상태
 * @returns setShouldRestoreDraft - 복구 상태 설정 함수
 */
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

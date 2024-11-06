import { useState, useCallback, useMemo } from 'react';

type ItemWithID<T> = T & {
  id: number;
};

const useCheckList = <T extends { id: number }>(
  targetList: ItemWithID<T>[],
) => {
  const [checkList, setCheckList] = useState<number[]>([]);

  const isAllCheck = useMemo(() => {
    const allChecked = checkList.length === targetList.length;
    const hasItems = targetList.length > 0; // 리스트에 항목이 있는지 확인
    return hasItems && allChecked;
  }, [targetList, checkList]);

  const handleAllCheck = useCallback(() => {
    const shouldUncheckAll = checkList.length === targetList.length;
    if (shouldUncheckAll) {
      setCheckList([]);
    } else {
      setCheckList(targetList.map((item) => item.id));
    }
  }, [targetList, checkList]);

  const handleCheckList = useCallback((id: number) => {
    setCheckList((prev) => {
      const isChecked = prev.includes(id);
      const removeChecked = prev.filter((itemId) => itemId !== id);
      const addChecked = [...prev, id];
      return isChecked ? removeChecked : addChecked;
    });
  }, []);

  return {
    handleAllCheck,
    handleCheckList,
    checkList,
    isAllCheck,
  };
};

export default useCheckList;

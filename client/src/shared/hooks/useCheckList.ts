import { useEffect, useState, useCallback } from 'react';

type ItemWithID<T> = T & {
  id: number;
};

const useCheckList = <T extends { id: number }>(
  targetList: ItemWithID<T>[],
) => {
  const [checkList, setCheckList] = useState<number[]>([]);
  const [isAllCheck, setIsAllCheck] = useState<boolean>(false);

  useEffect(() => {
    if (isAllCheck) {
      checkAllItems(targetList);
    } else {
      unCheckAllItems();
    }
  }, [isAllCheck, targetList]);

  const handleAllCheck = useCallback(() => {
    setIsAllCheck((prev) => !prev);
  }, []);

  const checkAllItems = useCallback(
    <V extends { id: number }>(targets: ItemWithID<V>[]) => {
      const allItems = targets.map((item) => item.id);
      setCheckList(allItems);
    },
    [targetList],
  );

  const unCheckAllItems = useCallback(() => {
    setCheckList([]);
  }, []);

  const handleCheckList = useCallback(
    (id: number, isCheck: boolean) => {
      if (isCheck) {
        removeCheckItem(id);
      } else {
        addCheckItem(id);
      }
    },
    [checkList],
  );

  const addCheckItem = useCallback(
    (id: number) => {
      setCheckList((prev) => [...prev, id]);
    },
    [checkList],
  );

  const removeCheckItem = useCallback(
    (targetId: number) => {
      const removeItem = checkList.filter((id) => id !== targetId);
      setCheckList(removeItem);
    },
    [checkList],
  );

  return {
    handleCheckList,
    handleAllCheck,
    checkList,
    isAllCheck,
  };
};

export default useCheckList;

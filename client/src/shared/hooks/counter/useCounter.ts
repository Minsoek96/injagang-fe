import { useCallback, useState } from 'react';

type Props = {
  maxCounter: number;
  minCounter?: number;
  initCounter?: number;
};

const useCounter = ({ maxCounter, minCounter = 0, initCounter = 0 }: Props) => {
  const [counter, setCounter] = useState<number>(initCounter);

  const handleIncrease = useCallback(() => {
    if (counter < maxCounter) {
      setCounter((prevCounter) => prevCounter + 1);
    }
  }, [counter, maxCounter]);

  const handleDecrease = useCallback(() => {
    if (counter > minCounter) {
      setCounter((prevCounter) => prevCounter - 1);
    }
  }, [counter, minCounter]);

  return {
    counter,
    handleIncrease,
    handleDecrease,
  };
};

export default useCounter;

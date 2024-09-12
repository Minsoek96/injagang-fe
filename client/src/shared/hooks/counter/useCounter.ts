import { useState } from 'react';

type Props = {
  maxCounter: number;
  minCounter?: number;
  initCounter?: number;
};

const useCounter = ({ maxCounter, minCounter = 0, initCounter = 0 }: Props) => {
  const [counter, setCounter] = useState<number>(initCounter);

  const handleIncrease = () => {
    if (counter < maxCounter) {
      setCounter((prevCounter) => prevCounter + 1);
    }
  };

  const handleDecrease = () => {
    if (counter > minCounter) {
      setCounter((prevCounter) => prevCounter - 1);
    }
  };

  return {
    counter,
    handleIncrease,
    handleDecrease,
  };
};

export default useCounter;

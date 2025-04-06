import { useEffect, useLayoutEffect, useRef } from 'react';

const useCompatLayoutEffect = typeof window !== 'undefined'
  ? useLayoutEffect
  : useEffect;

const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef(callback);

  useCompatLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) {
      return () => {};
    }

    const id = setInterval(() => {
      savedCallback.current();
    }, delay);

    return () => {
      clearInterval(id);
    };
  }, [delay]);
};

export default useInterval;

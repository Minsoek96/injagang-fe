import { useEffect, useState } from 'react';
import { API } from '@/src/shared/apis';

type ErrorType =
  | 'network'
  | 'timeout'
  | 'auth'
  | 'forbidden'
  | 'badRequest'

interface ThrowErrorProps {
  type: ErrorType;
}

export default function ThrowError({ type }: ThrowErrorProps) {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const errorMap: Record<ErrorType, string> = {
          network: 'network-error',
          timeout: 'timeout',
          auth: '401',
          forbidden: '403',
          badRequest: '400',
        };

        await API.get(`/test-errors/${errorMap[type]}`);
      } catch (e) {
        if (e instanceof Error) {
          setError(e);
        }
      }
    };

    fetchData();
  }, [type]);

  if (error) {
    throw error;
  }

  return null;
}
// const ThrowError = () => {
//   throw new Error('일반 에러 발생!');
// };

// export default ThrowError;

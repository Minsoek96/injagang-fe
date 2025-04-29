import { useState, useEffect } from 'react';

type Props = {
 delay?: number;
 message?: string;
};

/**
* 지정된 시간 후에 에러를 발생시키는 컴포넌트
*
* ErrorBoundary 테스트 용
*/
export default function ErrorBoundaryTest({
  delay = 3000,
  message = '지연된 에러 발생!',
}: Props) {
  const [shouldError, setShouldError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldError(true);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  if (shouldError) {
    throw new Error(message);
  }

  return (
    <div>
      에러 발생 대기 중...
      {delay / 1000}
      초 후 에러 발생 예정
    </div>
  );
}

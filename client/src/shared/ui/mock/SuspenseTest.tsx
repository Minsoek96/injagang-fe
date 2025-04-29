let isLoaded = false;
let promise: Promise<void> | null = null;

type Props = {
  delay?: number;
  message?: string;
};

/**
 * 지정된 시간 동안 지연을 발생시키는 컴포넌트
 *
 * Suspense 테스트 용
 */
export default function SuspenseTest({ delay = 3000, message = '로딩 완료!' }: Props) {
  if (isLoaded) {
    return <div>{message}</div>;
  }

  if (promise === null) {
    promise = new Promise<void>((resolve) => {
      setTimeout(() => {
        isLoaded = true;
        resolve();
      }, delay);
    });
  }

  throw promise;
}

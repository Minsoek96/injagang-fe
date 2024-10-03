import { FieldErrors } from 'react-hook-form';

// 에러 객체 순회 함수 (재귀적 탐색)
export const getFirstErrorMessage = (
  errorObj: FieldErrors<FormData> | undefined,
): string | null => {
  if (!errorObj) return null;

  return Object.values(errorObj).reduce<string | null>((acc, value) => {
    if (acc) return acc;

    if (value && typeof value === 'object' && 'message' in value) {
      return (value as { message: string }).message;
    }

    if (typeof value === 'object' && value !== null) {
      return getFirstErrorMessage(value as FieldErrors<FormData>);
    }

    return null;
  }, null);
};

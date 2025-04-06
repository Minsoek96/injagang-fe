/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';

/**
 * 컴포넌트 리렌더링 원인 감지 훅
 *
 * @param componentName - 컴포넌트 이름
 * @param state - 추적할 state (선택적)
 * @param action - 추적할 action (선택적)
 */
const useWhyDidYouRender = (
  componentName: string,
  state: Record<string, unknown> = {},
  action: Record<string, unknown> = {},
) => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isFirstRender = useRef(true);
  const prevStateRef = useRef<Record<string, any>>({});
  const prevActionRef = useRef<Record<string, any>>({});

  useEffect(() => {
    if (!isDevelopment) {
      return;
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevStateRef.current = { ...state };
      prevActionRef.current = { ...action };
      return;
    }

    // 변경된 state 찾기
    const changedState: Record<string, any> = {};
    let hasStateChanged = false;

    if (state && typeof state === 'object') {
      Object.keys(state).forEach((key) => {
        if (state[key] !== prevStateRef.current[key]) {
          changedState[key] = {
            이전: prevStateRef.current[key],
            현재: state[key],
          };
          hasStateChanged = true;
        }
      });
    }

    // 변경된 action 찾기
    const changedAction: Record<string, any> = {};
    let hasActionChanged = false;

    if (action && typeof action === 'object') {
      Object.keys(action).forEach((key) => {
        if (action[key] !== prevActionRef.current[key]) {
          changedAction[key] = {
            이전: prevActionRef.current[key],
            현재: action[key],
          };
          hasActionChanged = true;
        }
      });
    }

    // 변경사항 출력
    if (hasStateChanged || hasActionChanged) {
      console.group(`[렌더] ${componentName}`);

      if (hasStateChanged) {
        console.log('변경된 state:', changedState);
      }

      if (hasActionChanged) {
        console.log('변경된 action:', changedAction);
      }

      console.groupEnd();
    } else {
      console.log(
        `[렌더] ${componentName} - state/action 변경 없음 (부모 리렌더링)`,
      );
    }

    prevStateRef.current = state ? { ...state } : {};
    prevActionRef.current = action ? { ...action } : {};
  });
};

export default useWhyDidYouRender;

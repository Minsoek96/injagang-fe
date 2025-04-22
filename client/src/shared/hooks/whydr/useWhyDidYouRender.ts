/* eslint-disable no-console */
import { useEffect, useRef } from 'react';

/**
 * 컴포넌트 리렌더링 원인 감지 훅
 *
 * @param componentName - 컴포넌트 이름
 * @param state - 추적할 state (선택적)
 * @param action - 추적할 action (선택적)
 */
const useWhyDidYouRender = <
S extends Record<string, unknown> = Record<string, unknown>,
A extends Record<string, unknown> = Record<string, unknown>
>(
    componentName: string,
    state: S = {} as S,
    action: A = {} as A,
  ) => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isFirstRender = useRef(true);
  const prevStateRef = useRef<S>({} as S);
  const prevActionRef = useRef<A>({} as A);

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
    const changedState: Record<string, { 이전: unknown; 현재: unknown }> = {};
    let hasStateChanged = false;

    if (state && typeof state === 'object') {
      Object.keys(state).forEach((key) => {
        if (!Object.is(state[key], prevStateRef.current[key])) {
          changedState[key] = {
            이전: prevStateRef.current[key],
            현재: state[key],
          };
          hasStateChanged = true;
        }
      });
    }

    // 변경된 action 찾기
    const changedAction: Record<string, { 이전: unknown; 현재: unknown }> = {};
    let hasActionChanged = false;

    if (action && typeof action === 'object') {
      Object.keys(action).forEach((key) => {
        if (!Object.is(action[key], prevActionRef.current[key])) {
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
      console.group(`%c[렌더] ${componentName}`, 'color: #e91e63; font-weight: bold; font-size: 16px;');

      if (hasStateChanged) {
        console.log(
          '%c변경된 state:',
          'color: #8321f3ff; font-weight: bold; font-size: 14px',
        );

        console.table(changedState);
      }

      if (hasActionChanged) {
        console.log(
          '%c변경된 action:',
          'color: #ff9800; font-weight: bold; font-size: 14px',
        );

        console.table(changedAction);
      }

      console.groupEnd();
    } else {
      console.log(
        `%c[렌더] ${componentName} - state/action 변경 없음 (부모 리렌더링)`,
        'color: #4e4e4e; font-weight: bold; font-size: 16px;',
      );
    }

    prevStateRef.current = { ...state };
    prevActionRef.current = { ...action };
  });
};

export default useWhyDidYouRender;

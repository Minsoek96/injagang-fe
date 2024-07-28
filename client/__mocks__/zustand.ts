/* eslint-disable import/no-extraneous-dependencies */
import * as zustand from 'zustand';
import { act } from '@testing-library/react';

// 실제 zustand의 create 함수를 가져오기.
const { create: actualCreate } = jest.requireActual<typeof zustand>('zustand');

// 초기 상태를 리셋하기 위한 함수들을 저장할 Set
export const storeResetFns = new Set<() => void>();

const createUncurried = <T>(stateCreator: zustand.StateCreator<T>) => {
  const store = actualCreate(stateCreator);
  const initialState = store.getState();
  storeResetFns.add(() => {
    store.setState(initialState, true);
  });
  return store;
};

// create 함수를 선언하고 초기화
const create = <T>(stateCreator: zustand.StateCreator<T>) => (typeof stateCreator === 'function'
  ? createUncurried(stateCreator)
  : createUncurried);

export { create };

// 각 테스트 후 모든 저장소의 상태를 리셋
afterEach(() => {
  act(() => {
    storeResetFns.forEach((resetFn) => {
      resetFn();
    });
  });
});

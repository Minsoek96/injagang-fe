import { useReducer } from 'react';

import { renderHook, act } from '@testing-library/react';

import qnaReducer from './reducer';

import {
  initialState,
  SET_TITLE,
  SET_QNA_LIST,
  ADD_QNA,
  DELETE_QNA,
  CHANGE_QNA,
  QnaItem,
} from './reducerType';

describe('qnaReducer', () => {
  const context = describe;

  const callReducer = (state?: typeof initialState) => {
    const initState = state || initialState;
    const { result } = renderHook(() => useReducer(qnaReducer, initState));
    const [, dispatch] = result.current;
    return { result, dispatch };
  };

  context('SET_TITLE 액션', () => {
    it('coverLetterTitle을 설정해야 한다.', () => {
      const { result, dispatch } = callReducer();

      act(() => {
        dispatch({ type: SET_TITLE, payload: 'New Title' });
      });

      const [state] = result.current;
      expect(state.coverLetterTitle).toBe('New Title');
    });
  });

  context('SET_QNA_LIST 액션', () => {
    it('qnaList를 설정해야 한다.', () => {
      const { result, dispatch } = callReducer();

      const qnaList: QnaItem[] = [{ qnaId: 1, question: 'Q1', answer: 'A1' }];

      act(() => {
        dispatch({ type: SET_QNA_LIST, payload: qnaList });
      });

      const [state] = result.current;
      expect(state.qnaList).toEqual(qnaList);
    });
  });

  context('ADD_QNA 액션', () => {
    it('새 QnA 항목을 목록에 추가해야 한다.', () => {
      const { result, dispatch } = callReducer();

      const qnaItem: QnaItem = { qnaId: 2, question: 'Q2', answer: 'A2' };

      act(() => {
        dispatch({ type: ADD_QNA, payload: qnaItem });
      });

      const [state] = result.current;
      expect(state.qnaList).toContainEqual(qnaItem);
    });
  });

  context('DELETE_QNA 액션', () => {
    it('QnA 항목을 목록에서 삭제해야 한다.', () => {
      const initialWithItems = {
        ...initialState,
        qnaList: [
          { qnaId: 1, question: 'Q1', answer: 'A1' },
          { qnaId: 2, question: 'Q2', answer: 'A2' },
        ],
      };
      const { result } = renderHook(() => useReducer(qnaReducer, initialWithItems));
      const [, dispatch] = result.current;

      act(() => {
        dispatch({ type: DELETE_QNA, payload: 1 });
      });

      const [state] = result.current;
      expect(state.qnaList).toHaveLength(1);
      expect(state.qnaList).not.toContainEqual({
        qnaId: 1,
        question: 'Q1',
        answer: 'A1',
      });
    });
  });

  context('CHANGE_QNA 액션', () => {
    it('QnA 항목을 목록에서 변경해야 한다.', () => {
      const initialWithItems = {
        ...initialState,
        qnaList: [{ qnaId: 1, question: 'Q1', answer: 'A1' }],
      };
      const { result } = renderHook(() =>
        useReducer(qnaReducer, initialWithItems));
      const [, dispatch] = result.current;

      const updatedQna: QnaItem = {
        qnaId: 1,
        question: 'Q1 updated',
        answer: 'A1 updated',
      };

      act(() => {
        dispatch({ type: CHANGE_QNA, payload: updatedQna });
      });

      const [state] = result.current;
      expect(state.qnaList).toContainEqual(updatedQna);
    });
  });
});

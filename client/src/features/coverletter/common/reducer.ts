import {
  initialState,
  SET_QNA_LIST,
  SET_TITLE,
  ADD_QNA,
  DELETE_QNA,
  CHANGE_QNA,
  QnaItem,
} from './reducerType';

interface State {
    coverLetterTitle: string;
    qnaList: QnaItem[];
  }

  type Action =
    | { type: typeof SET_TITLE; payload: string }
    | { type: typeof SET_QNA_LIST; payload: QnaItem[] }
    | { type: typeof ADD_QNA; payload: QnaItem }
    | { type: typeof DELETE_QNA; payload: string | number }
    | { type: typeof CHANGE_QNA; payload: QnaItem };

export default function qnaReducer(
  // eslint-disable-next-line default-param-last
  state: State = initialState,
  action: Action,
): State {
  switch (action.type) {
  case SET_TITLE:
    return {
      ...state,
      coverLetterTitle: action.payload,
    };
  case SET_QNA_LIST:
    return {
      ...state,
      qnaList: action.payload,
    };
  case ADD_QNA:
    return {
      ...state,
      qnaList: [...state.qnaList, action.payload],
    };
  case DELETE_QNA: {
    const filterItem = state.qnaList.filter(
      (item) => item.qnaId !== action.payload,
    );
    return {
      ...state,
      qnaList: filterItem,
    };
  }
  case CHANGE_QNA: {
    const changeItem = state.qnaList.map((item) =>
      (item.qnaId === action.payload.qnaId ? action.payload : item));
    return {
      ...state,
      qnaList: changeItem,
    };
  }
  default:
    return state;
  }
}

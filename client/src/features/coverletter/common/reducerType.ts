const SET_TITLE = 'SET_TITLE';
const SET_QNA_LIST = 'SET_QNA_LIST';
const ADD_QNA = 'ADD_QNA';
const DELETE_QNA = 'DELETE_QNA';
const CHANGE_QNA = 'CHANGE_QNA';

type QnaItem = {
  question: string;
  answer: string;
  qnaId: string | number;
};

const initialState = {
  coverLetterTitle: '',
  qnaList: [],
};

export {
  type QnaItem,
  initialState,
  SET_TITLE,
  SET_QNA_LIST,
  ADD_QNA,
  DELETE_QNA,
  CHANGE_QNA,
};

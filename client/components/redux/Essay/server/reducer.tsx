import { AxiosError } from "axios";

import {
  IEssayList,
  IGetEssayList,
} from "@/types/essay/EssayType";
import {
  ESSAY_REQUEST,
  ESSAY_SUCCESS,
  ESSAY_FAILURE,
  ESSAY_READ_SUCCESS,
  essayDispatchType,
  ESSAY_UPDATED,
  CLEAR_READ_ESSAY,
} from "./types";

export interface InitiaState {
  loading: boolean;
  error: AxiosError | null;
  readEssayList: IEssayList[];
  essayList: IGetEssayList[];
  isUpdated: boolean;
}

const initialState: InitiaState = {
  loading: false,
  error: null,
  isUpdated: false,
  essayList: [],
  readEssayList: [
    {
      essayId: 0,
      title: "",
      owner: false,
      qnaList: [],
    },
  ],
};

const essayReducer = (state = initialState, action: essayDispatchType) => {
  switch (action.type) {
    case ESSAY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ESSAY_SUCCESS:
      return {
        ...state,
        essayList: action.payload.essayList,
        isUpdated: false,
        loading: false,
      };
    case ESSAY_READ_SUCCESS:
      return {
        ...state,
        readEssayList: action.payload.readList,
        isUpdated: false,
        loading: false,
      };
    case ESSAY_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    case ESSAY_UPDATED:
      return {
        ...state,
        isUpdated: true,
      };
    case CLEAR_READ_ESSAY:
      return {
        ...state,
        readEssayList: initialState.readEssayList,
      }
    default:
      return state;
  }
};

export default essayReducer;

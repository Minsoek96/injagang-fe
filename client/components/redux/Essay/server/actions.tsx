import { Dispatch } from "redux";

import Cookies from "js-cookie";

import {
  ESSAY_REQUEST,
  ESSAY_FAILURE,
  ESSAY_SUCCESS,
  ESSAY_READ_SUCCESS,
  essayDispatchType,
  ESSAY_UPDATED,
  CLEAR_READ_ESSAY,
} from "./types";
import { IReviseEssayList, IWriteEssayList } from "@/types/essay/EssayType";
import { SET_ERROR, errorDispatchType } from "../../Error/types";

import {
  addEssayAPI,
  deleteEssayAPI,
  getEssayListAPI,
  reviseEssayAPI,
  readEssayListAPI,
} from "@/api/ESSAY/essayAPI";
import { showToastAction } from "../../Toast/actions";

import { ERROR_MESSAGES, SUCCESS_MESSAGES, TOAST_MODE } from "@/constants";

/**자소서 추가 요청후 반영된 자소서 요청API */
export const addEssay =
  (essayData: IWriteEssayList) =>
  async (dispatch: Dispatch<essayDispatchType>): Promise<void> => {
    try {
      dispatch({ type: ESSAY_REQUEST });
      const request = await addEssayAPI(essayData);
      if (request.status === 200) {
        dispatch({ type: ESSAY_UPDATED });
        dispatch(
          showToastAction(TOAST_MODE.SUCCESS, SUCCESS_MESSAGES.ADDED_ESSAY),
        );
      }
      dispatch(getEssayList());
    } catch (error: any) {
      dispatch({
        type: ESSAY_FAILURE,
        payload: {
          error,
        },
      });
      showToastAction(TOAST_MODE.ERROR, ERROR_MESSAGES.ADDED_ESSAY);
    }
  };

/**자소서리스트 요청API*/
export const getEssayList =
  () =>
  async (
    dispatch: Dispatch<essayDispatchType | errorDispatchType>,
  ): Promise<void> => {
    try {
      dispatch({ type: ESSAY_REQUEST });
      const response = await getEssayListAPI(Number(Cookies.get("userId")));
      if (response) {
        dispatch({
          type: ESSAY_SUCCESS,
          payload: {
            essayList: response.data,
          },
        });
      }
    } catch (error: any) {
      dispatch({
        type: ESSAY_FAILURE,
        payload: {
          error,
        },
      });
      dispatch({
        type: SET_ERROR,
        payload: {
          error,
        },
      });
    }
  };

/**자소서 세부내용 읽기요청 API */
export const getDetailEssay =
  (essayId: number) =>
  async (
    dispatch: Dispatch<essayDispatchType | errorDispatchType>,
  ): Promise<void> => {
    try {
      dispatch({ type: ESSAY_REQUEST });
      const response = await readEssayListAPI(essayId);
      if (response) {
        dispatch({
          type: ESSAY_READ_SUCCESS,
          payload: {
            readList: [response.data],
          },
        });
      }
    } catch (error: any) {
      dispatch({
        type: ESSAY_FAILURE,
        payload: {
          error,
        },
      });
      dispatch({
        type: SET_ERROR,
        payload: {
          error,
        },
      });
    }
  };

export const updateEssay =
  (essayId: number, modifiedEssayData: IReviseEssayList) =>
  async (dispatch: Dispatch<essayDispatchType>): Promise<void> => {
    try {
      const request = await reviseEssayAPI(essayId, modifiedEssayData);
      if (request.status === 200) {
        dispatch({ type: ESSAY_UPDATED });
        dispatch(
          showToastAction(TOAST_MODE.SUCCESS, SUCCESS_MESSAGES.UPDATED_ESSAY),
        );
        dispatch(getEssayList());
      }
    } catch (error: any) {
      dispatch({
        type: ESSAY_FAILURE,
        payload: {
          error,
        },
      });
      dispatch(showToastAction(TOAST_MODE.ERROR, ERROR_MESSAGES.UPDATED_ESSAY));
    }
  };

/**자소서 삭제 */
export const deleteEssayList =
  (essayId: number) =>
  async (dispatch: Dispatch<essayDispatchType>): Promise<void> => {
    try {
      const request = await deleteEssayAPI(essayId);
      if (request.status === 200) {
        dispatch({ type: ESSAY_UPDATED });
        dispatch(
          showToastAction(TOAST_MODE.SUCCESS, SUCCESS_MESSAGES.DELETED_ESSAY),
        );
        dispatch(getEssayList());
      }
    } catch (error: any) {
      dispatch({
        type: ESSAY_FAILURE,
        payload: {
          error,
        },
      });
      dispatch(showToastAction(TOAST_MODE.ERROR, ERROR_MESSAGES.DELETED_ESSAY));
    }
  };

export const setClearReadEssay = () => ({
  type: CLEAR_READ_ESSAY
})
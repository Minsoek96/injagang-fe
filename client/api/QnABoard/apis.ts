import { BOARD_APIS } from "../config";
import { fetcher, METHOD } from "../client";

import {
  IGetDetailQnaBoard,
  IGetQnaBoardList,
  IReviseQnaBoard,
  IWriteQnaBoard,
} from "@/types/qnaBoard/QnaBoardType";

const getBoardList = async (
  queryString?: number,
  type?: string,
  search?: string,
): Promise<IGetQnaBoardList> => {
  return fetcher(
    METHOD.GET,
    `${BOARD_APIS.GET_API}?page=${queryString}&type=${type}&content=${search}`,
  )
    .then(res => res.data)
    .catch(error => console.error(error));
};

const getDetailBoard = async (
  targetId: number,
): Promise<IGetDetailQnaBoard> => {
  return fetcher(METHOD.GET, `${BOARD_APIS.READ_API}${targetId}`)
    .then(res => res.data)
    .catch(error => console.error(error));
};

const deleteQnaBoard = async (targetId: number) => {
  return fetcher(METHOD.DELETE, `${BOARD_APIS.DELETE_API}${targetId}`);
};

const reviseQnaBoard = async (boardPayload: IReviseQnaBoard) => {
  return fetcher(METHOD.PATCH, BOARD_APIS.REVISE_API, boardPayload);
};

const writeQnaBoard = async (boardPayload: IWriteQnaBoard) => {
  return fetcher(METHOD.POST, BOARD_APIS.WRITE_API, boardPayload);
};

export {
  getBoardList,
  getDetailBoard,
  deleteQnaBoard,
  reviseQnaBoard,
  writeQnaBoard,
};

import { AxiosRequestConfig } from 'axios';
import { fetcher, METHOD } from '@/src/shared/utils';
import { BOARD_APIS } from '@/src/shared/config/apis';
import {
  IGetDetailQnaBoard,
  IGetQnaBoardList,
  IReviseQnaBoard,
  IWriteQnaBoard,
} from '@/src/entities/qnaboard/type';

const getBoardList = async (
  queryString?: number,
  type?: string,
  search?: string,
): Promise<IGetQnaBoardList> =>
  fetcher(
    METHOD.GET,
    `${BOARD_APIS.GET_API}?page=${queryString}&type=${type}&content=${search}`,
  )
    .then((res) => res.data);

const getDetailBoard = async (
  targetId: number,
  authToken?: string,
): Promise<IGetDetailQnaBoard> => {
  const config: AxiosRequestConfig = authToken
    ? {
      headers: {
        Authorization: `${authToken}`,
      },
    }
    : {};

  return fetcher(METHOD.GET, `${BOARD_APIS.READ_API}${targetId}`, config)
    .then((res) => res.data);
};

const deleteQnaBoard = async (targetId: number) =>
  fetcher(METHOD.DELETE, `${BOARD_APIS.DELETE_API}${targetId}`);

const reviseQnaBoard = async (boardPayload: IReviseQnaBoard) =>
  fetcher(METHOD.PATCH, BOARD_APIS.REVISE_API, boardPayload);

const writeQnaBoard = async (boardPayload: IWriteQnaBoard) =>
  fetcher(METHOD.POST, BOARD_APIS.WRITE_API, boardPayload);

export {
  getBoardList,
  getDetailBoard,
  deleteQnaBoard,
  reviseQnaBoard,
  writeQnaBoard,
};

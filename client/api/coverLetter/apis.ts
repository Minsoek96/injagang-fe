import { ESSAY_APIS } from "../config";
import { fetcher, METHOD } from "../client";

import {
  ICoverLetters,
  ICoverLetterDetail,
  IReviseCoverLetter,
  IWriteCoverLetter,
} from "@/types/coverLetter/CoverLetterType";

const getCoverLetter = async (targetId: number): Promise<ICoverLetters[]> => {
  return fetcher(METHOD.GET, `${ESSAY_APIS.GET_API}${targetId}`)
    .then(res => res.data)
    .catch(error => console.error(error));
};

const getDetailCoverLetter = async (
  targetId: number,
): Promise<ICoverLetterDetail> => {
  return fetcher(METHOD.GET, `${ESSAY_APIS.READ_API}${targetId}`)
    .then(res => res.data)
    .catch(error => console.error(error));
};

const addCoverLetter = async (essayPayload: IWriteCoverLetter) => {
  return fetcher(METHOD.POST, ESSAY_APIS.WRITE_API, essayPayload);
};

const reviseCoverLetter = async (
  targetId: number,
  essayPayload: IReviseCoverLetter,
) => {
  return fetcher(
    METHOD.PATCH,
    `${ESSAY_APIS.REVISE_API}${targetId}`,
    essayPayload,
  );
};

const deleteCoverLetter = async (targetId: number) => {
  return fetcher(METHOD.DELETE, `${ESSAY_APIS.DELETE_API}${targetId}`);
};

export {
  getCoverLetter,
  getDetailCoverLetter,
  deleteCoverLetter,
  addCoverLetter,
  reviseCoverLetter,
};

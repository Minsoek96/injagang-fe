import { fetcher, METHOD } from '@/src/shared/utils';

import { ESSAY_APIS } from '@/src/shared/config/apis';

import {
  ICoverLetters,
  ICoverLetterDetail,
  IReviseCoverLetter,
  IWriteCoverLetter,
} from '@/src/entities/coverLetter/type';

const getCoverLetter = async (targetId: number): Promise<ICoverLetters[]> =>
  fetcher(METHOD.GET, `${ESSAY_APIS.GET_API}${targetId}`).then(
    (res) => res.data,
  );

const getDetailCoverLetter = async (
  targetId: number,
): Promise<ICoverLetterDetail> =>
  fetcher(METHOD.GET, `${ESSAY_APIS.READ_API}${targetId}`).then(
    (res) => res.data,
  );

const addCoverLetter = async (essayPayload: IWriteCoverLetter) =>
  fetcher(METHOD.POST, ESSAY_APIS.WRITE_API, essayPayload);

const reviseCoverLetter = async (
  targetId: number,
  essayPayload: IReviseCoverLetter,
) => fetcher(METHOD.PATCH, `${ESSAY_APIS.REVISE_API}${targetId}`, essayPayload);

const deleteCoverLetter = async (targetId: number) =>
  fetcher(METHOD.DELETE, `${ESSAY_APIS.DELETE_API}${targetId}`);

export {
  getCoverLetter,
  getDetailCoverLetter,
  deleteCoverLetter,
  addCoverLetter,
  reviseCoverLetter,
};

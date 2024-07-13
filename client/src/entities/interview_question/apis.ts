import {
  IAddQuestions,
  IDeleteQuestions,
  IQuestion,
  IRandomQuestions,
  QuestionType,
} from '@/src/entities/interview_question/type';

import { fetcher, METHOD } from '@/src/shared/utils';

import { QUESTIONS_APIS } from '@/src/shared/config/apis';

// FIXME : 잘못된 예외처리 사용중 수정해야함
const getInterViewQuestionList = async (
  queryString: QuestionType | string,
): Promise<IQuestion[]> =>
  fetcher(METHOD.GET, `${QUESTIONS_APIS.GET_API}?questionType=${queryString}`)
    .then((res) => res.data)
    .catch((error) => console.error(error));

const addInterViewQuestion = async (questionPayload: IAddQuestions) =>
  fetcher(METHOD.POST, QUESTIONS_APIS.ADD_API, questionPayload);

const deleteInterViewQuestion = async (questionPayload: IDeleteQuestions) =>
  fetcher(METHOD.DELETE, QUESTIONS_APIS.DELETE_API, {
    data: questionPayload,
  });

const getRandomQuestions = async (randomPayload: IRandomQuestions[]) =>
  fetcher(METHOD.POST, QUESTIONS_APIS.RANDOM_API, randomPayload);

export {
  getInterViewQuestionList,
  addInterViewQuestion,
  deleteInterViewQuestion,
  getRandomQuestions,
};

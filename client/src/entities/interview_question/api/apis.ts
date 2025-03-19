import {
  IAddQuestions,
  IDeleteQuestions,
  IntvFeedback,
  IQuestion,
  IRandomQuestions,
  QuestionType,
} from '@/src/entities/interview_question/model/type';

import { fetcher, METHOD } from '@/src/shared/utils';
import { NEXT_APIS, QUESTIONS_APIS } from '@/src/shared/config/apis';

// FIXME : 잘못된 예외처리 사용중 수정해야함
const getInterViewQuestionList = async (
  queryString: QuestionType | string,
): Promise<IQuestion[]> =>
  fetcher(
    METHOD.GET,
    `${QUESTIONS_APIS.GET_API}?${
      queryString === 'ALL' ? '' : `questionType=${queryString}`
    }`,
  )
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

const getIntvFeedback = async (
  qnaPayload: IntvFeedback,
): Promise<{ strengths: string[]; improvements: string[] }> => {
  const response = await fetcher(METHOD.POST, NEXT_APIS.FEDD_API, qnaPayload);

  return response.data;
};

export {
  getInterViewQuestionList,
  addInterViewQuestion,
  deleteInterViewQuestion,
  getRandomQuestions,
  getIntvFeedback,
};

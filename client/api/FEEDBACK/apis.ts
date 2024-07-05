import {
  IGetFeedBack,
  IReviseFeedBack,
  IWriteFeedBack,
} from '@/types/feedback/FeedBackType';
import { FEED_APIS } from '../config';
import { fetcher, METHOD } from '../client';

export const getFeedBackList = async (
  targetId: number,
): Promise<IGetFeedBack[]> =>
  fetcher(METHOD.GET, `${FEED_APIS.GET_API}${targetId}`)
    .then((res) => res.data)
    .catch((error) => console.error(error));

export const reviseFeedBack = async (feedBackPayload: IReviseFeedBack) =>
  fetcher(METHOD.PATCH, FEED_APIS.REVISE_API, feedBackPayload);

export const writeFeedBack = async (feedbackPayload: IWriteFeedBack) =>
  fetcher(METHOD.POST, FEED_APIS.WRITE_API, feedbackPayload);

import { fetcher, METHOD } from '@/src/shared/utils';

import { FEED_APIS } from '@/src/shared/config/apis';
import {
  IGetFeedBack,
  IReviseFeedBack,
  IWriteFeedBack,
} from '@/src/entities/feedback/model/type';

export const getFeedBackList = async (
  targetId: number,
): Promise<IGetFeedBack[]> =>
  fetcher(METHOD.GET, `${FEED_APIS.GET_API}${targetId}`)
    .then((res) => res.data);

export const reviseFeedBack = async (feedBackPayload: IReviseFeedBack) =>
  fetcher(METHOD.PATCH, FEED_APIS.REVISE_API, feedBackPayload);

export const writeFeedBack = async (feedbackPayload: IWriteFeedBack) =>
  fetcher(METHOD.POST, FEED_APIS.WRITE_API, feedbackPayload);

export const deleteFeedBack = async (feedbackId: number) => {
  fetcher(METHOD.DELETE, `${FEED_APIS.DELETE_API}${feedbackId}`);
};

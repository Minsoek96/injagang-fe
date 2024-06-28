import { FEED_APIS } from "../config";
import { fetcher, METHOD } from "../client";

import { IReviseFeedBack, IWriteFeedBack } from "@/types/feedback/FeedBackType";
import { FEEDBACKLIST } from "@/components/redux/FeedBack/types";

export const getFeedBackList = async (
  targetId: number,
): Promise<FEEDBACKLIST[]> => {
  return fetcher(METHOD.GET, `${FEED_APIS.GET_API}${targetId}`)
    .then(res => res.data)
    .catch(error => console.error(error));
};

export const reviseFeedBack = async (feedBackPayload: IReviseFeedBack) => {
  return fetcher(METHOD.PATCH, FEED_APIS.REVISE_API, feedBackPayload);
};

export const writeFeedBack = async (feedbackPayload: IWriteFeedBack) => {
  return fetcher(METHOD.POST, FEED_APIS.WRITE_API, feedbackPayload);
};

import {
  IGetFeedBack,
  IReviseFeedBack,
  IWriteFeedBack,
} from '@/src/entities/feedback/model/type';

const sampleReviseFeed: IReviseFeedBack = {
  feedbackId: 10001,
  reviseContent: 'testContent',
};

const sampleWriteFeed: IWriteFeedBack = {
  qnaId: 10001,
  feedbackContent: 'testContent',
  feedbackTarget: 'target',
};

const feedList = Array.from({ length: 5 }, (_, i) => i + 1).map((i) => ({
  feedbackId: 10000 + i,
  target: `target${i}`,
  content: `test${i}`,
  owner: true,
}));

const sampleResponseFeed: IGetFeedBack[] = feedList;

const sampleTargetId = 1001;

export {
  sampleReviseFeed, sampleTargetId, sampleWriteFeed, sampleResponseFeed,
};

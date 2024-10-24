import { sampleResponseFeed } from '@/fixutures/entities/feed';
import TestProvider from '@/fixutures/TestProvider';
import { feedbackQueries } from '@/src/entities/feedback';
import { IGetFeedBack } from '@/src/entities/feedback/model/type';

import TargetFeedBackView from '@/src/features/qna/feedback/TargetFeedBackView';
import { render, screen } from '@testing-library/react';

jest.mock('@/src/entities/feedback', () => {
  const actualHooks = jest.requireActual('@/src/entities/feedback');
  return {
    ...actualHooks,
    feedbackQueries: {
      useFetchFeedBackList: jest.fn(),
    },
  };
});

const context = describe;
describe('TargetFeedBackView', () => {
  const mockFeedbackList = (data: IGetFeedBack[] | []) => {
    (feedbackQueries.useFetchFeedBackList as jest.Mock).mockReturnValue({
      data,
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (isTarget: boolean = false) => {
    render(
      <TestProvider>
        <TargetFeedBackView targetFeed={isTarget ? 10001 : 0} />
      </TestProvider>,
    );
  };

  context('타겟 넘버가 존재하는 상황', () => {
    context('feedbackList(피드백 목록)이 존재 하지 않으면.', () => {
      it('목록이 없는 상황을 전달한다.', () => {
        mockFeedbackList([]);
        renderComponent(true);
        const searchEmpty = screen.getByText(/등록된 피드백이 없습니다/);
        expect(searchEmpty).toBeInTheDocument();
      });
    });

    context('타겟이 존재하는 상황에서는', () => {
      it('비어있는 상태를 전달한다.', () => {
        mockFeedbackList([]);
        renderComponent();
        const searchEmpty = screen.getByText(/자소서 넘버를 선택해주세요/);
        expect(searchEmpty).toBeInTheDocument();
      });
    });
  });

  context('feedbackList가 존재하는 경우', () => {
    it('리스트의 아이템이 렌더링된다.', () => {
      mockFeedbackList(sampleResponseFeed);
      renderComponent();
      sampleResponseFeed.forEach((feed) => {
        const searchCorrection = screen.getByText(feed.target);
        const searchFeed = screen.getByText(feed.content);
        expect(searchCorrection).toBeInTheDocument();
        expect(searchFeed).toBeInTheDocument();
      });
    });
  });
});

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
  beforeEach(() => {});
  const renderComponent = () => {
    render(
      <TestProvider>
        <TargetFeedBackView targetFeed={0} />
      </TestProvider>,
    );
  };

  context('feedbackList가 존재하지 않는 경우', () => {
    it('안내 메시지를 전달한다.', () => {
      mockFeedbackList([]);
      renderComponent();
      const searchEmpty = screen.getByText(/자소서 넘버를 선택해주세요/);
      expect(searchEmpty).toBeInTheDocument();
    });
  });
});

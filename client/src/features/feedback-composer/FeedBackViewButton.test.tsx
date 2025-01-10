import TestProvider from '@/fixutures/TestProvider';
import { useFeedStore } from '@/src/entities/feedback';
import FeedBackViewButtons from '@/src/features/feedback-composer/FeedBackViewButton';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

jest.mock('@/src/entities/feedback');

describe('FeedBackViewButtons', () => {
  const qnaIdList = Array.from({ length: 5 }, (_, index) => 10001 + index);
  const mockTarget = qnaIdList[3];
  const setTargetFeedMock = jest.fn();

  const renderComponent = () => {
    render(
      <TestProvider>
        <FeedBackViewButtons qnaIdList={qnaIdList} />
      </TestProvider>,
    );
  };

  beforeEach(() => {
    (useFeedStore as unknown as jest.Mock).mockReturnValue({
      targetFeed: mockTarget,
      setTargetFeed: setTargetFeedMock,
    });
  });

  it('qnaIdList의 길이 만큼 버튼이 렌더링된다.', () => {
    renderComponent();
    qnaIdList.forEach((list, idx) => {
      const searchButton = screen.getByRole('button', {
        name: new RegExp(String(idx + 1)),
      });
      expect(searchButton).toBeInTheDocument();
    });
  });

  it('target와 아이템이 일치하면 활성화된다.', () => {
    renderComponent();
    qnaIdList.forEach((list, idx) => {
      const searchButton = screen.getByRole('button', {
        name: new RegExp(String(idx + 1)),
      });
      expect(searchButton).toBeInTheDocument();

      if (list === mockTarget) {
        expect(searchButton).toHaveStyleRule(
          'background-color',
          '#0F766E',
        );
      }
    });
  });

  it('버튼을 클릭하면 target이 변한다.', () => {
    renderComponent();
    qnaIdList.forEach(async (list, idx) => {
      const searchButton = screen.getByRole('button', {
        name: new RegExp(String(idx + 1)),
      });

      // 일치하지 않는 상황
      if (list !== mockTarget) {
        expect(searchButton).not.toHaveStyleRule(
          'background-color',
          '#0F766E',
        );
      }

      fireEvent.click(searchButton);
      expect(setTargetFeedMock).toHaveBeenCalledWith(list);

      // 클릭후 상태 변화가 적용된 상황
      await waitFor(() => {
        expect(searchButton).toHaveStyleRule(
          'background-color',
          '#0F766E',
        );
      });
    });
  });
});

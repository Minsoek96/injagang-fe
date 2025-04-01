/* eslint-disable @typescript-eslint/ban-ts-comment */
import TestProvider from '@/fixutures/TestProvider';

import { render, screen, waitFor } from '@testing-library/react';

import RecordPlayer from './RecordPlayer';

const context = describe;

describe('RecordPlayer', () => {
  global.URL.createObjectURL = jest.fn(() => 'mock-video-url');
  global.URL.revokeObjectURL = jest.fn();

  const createMockVideoBlob = () =>
    new Blob(['video content'], { type: 'video/mp4' });
  const mockVideoBlob = createMockVideoBlob();

  const renderComponent = (isBlob = true) =>
    render(
      <TestProvider>
        {/* @ts-ignore - 테스트 목적으로 타입 에러 무시 */}
        <RecordPlayer currentVideoChunk={isBlob ? mockVideoBlob : null} />
      </TestProvider>,
    );

  context('렌더링 테스트', () => {
    it('비디오 플레이어가 렌더링된다', () => {
      renderComponent();

      const videoEl = screen.getByText('', { selector: 'video' });
      expect(videoEl).toBeInTheDocument();
    });

    it('비디오 플레이어에 속성이 있다', () => {
      renderComponent();

      const videoEl = screen.getByText('', { selector: 'video' });
      expect(videoEl).toHaveAttribute('controls');
      expect(videoEl).toHaveAttribute('autoplay');
      expect(videoEl).toHaveAttribute('playsinline');
      expect(videoEl).toHaveAttribute('src', 'mock-video-url');
    });

    it('currentVideoChunk가 없으면 로딩 메시지가 표시된다', () => {
      renderComponent(false);

      expect(screen.getByText(/비디오를 로드 중/)).toBeInTheDocument();
    });
  });

  context('URL 객체 관리', () => {
    it('비디오 블롭으로 호출된다', () => {
      renderComponent();

      expect(URL.createObjectURL).toHaveBeenCalledWith(mockVideoBlob);
    });

    it('컴포넌트가 언마운트될 때 비디오 블롭이 정리된다.', async () => {
      const { unmount } = renderComponent();

      unmount();

      await waitFor(() => {
        expect(URL.revokeObjectURL).toHaveBeenCalled();
      });
    });
  });
});

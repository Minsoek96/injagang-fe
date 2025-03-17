import TestProvider from '@/fixutures/TestProvider';
import RecordingDetails from '@/src/features/interview/screen-result/ui/RecordingDetails';
import { render, screen } from '@testing-library/react';

describe('RecordingDetails', () => {
  it('영상 콘텐츠 정보가 렌더링 된다', () => {
    const mockQuestion = 'Mock Question';
    const mockScript = 'Mock Script';
    const mockTimer = '05:00';
    const mockVoice = 'Mock Voice Script';

    render(
      <TestProvider>
        <RecordingDetails
          question={mockQuestion}
          script={mockScript}
          timer={mockTimer}
          voiceScript={mockVoice}
        />
      </TestProvider>,
    );

    expect(screen.getByText(mockQuestion)).toBeInTheDocument();
    expect(screen.getByText(mockVoice)).toBeInTheDocument();
    expect(screen.getByText(mockTimer)).toBeInTheDocument();
    expect(screen.getByText(mockVoice)).toBeInTheDocument();
  });
});

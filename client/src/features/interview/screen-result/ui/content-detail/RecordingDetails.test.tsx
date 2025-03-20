import TestProvider from '@/fixutures/TestProvider';

import { render, screen } from '@testing-library/react';

import RecordingDetails from './RecordingDetails';

describe('RecordingDetails', () => {
  it('영상 콘텐츠 정보가 렌더링 된다', () => {
    const mockQuestion = 'Mock Question';
    const mockRecordContent = {
      script: 'Mock Script',
      timer: '05:00',
      voiceScript: 'Mock Voice Script',
      strengths: [''],
      improvements: [''],
    };

    render(
      <TestProvider>
        <RecordingDetails
          question={mockQuestion}
          recordContents={mockRecordContent}
        />
      </TestProvider>,
    );

    expect(screen.getByText(mockQuestion)).toBeInTheDocument();
    expect(screen.getByText(mockRecordContent.script)).toBeInTheDocument();
    expect(screen.getByText(mockRecordContent.voiceScript)).toBeInTheDocument();
    expect(screen.getByText(mockRecordContent.timer)).toBeInTheDocument();
  });
});

import { fireEvent, render, screen } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';

import { useIntvRecordStore } from '@/src/entities/interview_question';
import InterviewResultViewer from './InterviewResultViewer';

describe('interviewResultViewer', () => {
  global.URL.createObjectURL = jest.fn(() => 'mock-video-url');
  global.URL.revokeObjectURL = jest.fn();

  const mockQuestion = ['Mock Question 1', 'Mock Question 2', 'Mock Question 3'];
  it('면접장 버튼을 클릭하면 모드가 변경된다.', () => {
    render(
      <TestProvider>
        <InterviewResultViewer question={mockQuestion} currentIdx={1} />
      </TestProvider>,
    );

    const studioButton = screen.getByText('면접장으로');
    const { interviewMode } = useIntvRecordStore.getState();
    fireEvent.click(studioButton);
    expect(interviewMode).toBe('record');
  });

  it('피드백 분석 요청 버튼을 클릭하면 모달이 출력된다', () => {
    render(
      <TestProvider>
        <InterviewResultViewer question={mockQuestion} currentIdx={1} />
      </TestProvider>,
    );

    const aiButton = screen.getByText(/피드백 분석 요청/);
    expect(aiButton).toBeInTheDocument();
  });
});

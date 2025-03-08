import { renderHook, act } from '@testing-library/react';
import { saveAs } from 'file-saver';
import { useDownloadHandler } from './useDownloadHandler';

jest.mock('file-saver', () => ({
  saveAs: jest.fn(),
}));

const context = describe;

describe('useDownloadHandler', () => {
  const mockVideo = [new Blob(['test video content'], { type: 'video/mp4' })];
  const mockRecordInfoList = [{ script: 'Mock Script', timer: '00:30', voiceScript: 'Mock Voice' }];
  const mockQuestions = ['Mock Question'];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('비디오와 대본을 다운로드할 때', () => {
    it('비디오와 대본 파일 이름으로 saveAs를 호출한다', () => {
      const { result } = renderHook(() =>
        useDownloadHandler({
          video: mockVideo,
          recordInfoList: mockRecordInfoList,
          question: mockQuestions,
          counter: 0,
        }));

      act(() => {
        result.current.downloadVideo();
      });

      expect(saveAs).toHaveBeenCalledWith(mockVideo[0], 'Mock Question.mp4');

      expect(saveAs).toHaveBeenCalledWith(
        expect.any(Blob),
        'Mock Question_대본.txt',
      );
    });
  });

  context('recordInfoList가 비어 있을 때', () => {
    it('대본에 대한 saveAs 호출을 하지 않는다', () => {
      const { result } = renderHook(() =>
        useDownloadHandler({
          video: mockVideo,
          recordInfoList: [],
          question: mockQuestions,
          counter: 0,
        }));

      act(() => {
        result.current.downloadVideo();
      });

      expect(saveAs).not.toHaveBeenCalledWith(
        expect.any(Blob),
        'Mock Question_대본.txt',
      );
    });
  });

  context('video가 비어 있을 때', () => {
    it('saveAs를 호출하지 않는다', () => {
      const { result } = renderHook(() =>
        useDownloadHandler({
          video: [],
          recordInfoList: mockRecordInfoList,
          question: mockQuestions,
          counter: 0,
        }));

      act(() => {
        result.current.downloadVideo();
      });

      expect(saveAs).not.toHaveBeenCalled();
    });
  });
});

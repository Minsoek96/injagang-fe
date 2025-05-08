import { getQuestionTypeByLabel } from './index';

describe('getQuestionTypeByLabel', () => {
  it('라벨이 CS 질문인 경우 CS로 변환한다.', () => {
    const mockType = 'CS 질문';
    const result = getQuestionTypeByLabel(mockType);
    expect(result).toBe('CS');
  });
});

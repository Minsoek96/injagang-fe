import validateRules, { IValid } from './validateRules';

const context = describe;
describe('validateRules', () => {
  context('검증 과정에서 오류가 발견되면', () => {
    it('해당 오류 메시지를 반환한다.', () => {
      const validations: IValid[] = [
        { check: () => false, message: '첫 번째 통과' },
        { check: () => true, message: '두 번째 실패' },
        { check: () => false, message: '세 번째 통과' },
      ];
      const result = validateRules(validations);
      expect(result.errorMessage).toBe('두 번째 실패');
    });
  });

  context('모든 검증이 통과하면', () => {
    it('isValid는 true이다.', () => {
      const validations: IValid[] = [
        { check: () => false, message: '첫 번째 통과' },
        { check: () => false, message: '두 번째 통과' },
        { check: () => false, message: '세 번째 통과' },
      ];
      const result = validateRules(validations);
      expect(result.isValid).toBe(true);
    });

    it('errormessage는 빈값이다.', () => {
      const validations: IValid[] = [
        { check: () => false, message: '첫 번째 통과' },
        { check: () => false, message: '두 번째 통과' },
        { check: () => false, message: '세 번째 통과' },
      ];
      const result = validateRules(validations);
      expect(result.errorMessage).toBe('');
    });
  });
});

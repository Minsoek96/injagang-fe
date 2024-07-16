import runValidationChecks, { IValid } from './runValidationChecks';

describe('runValidationChecks', () => {
  const context = describe;
  describe('검증 통과 시', () => {
    context('하나 이상의 검증이 통과할 때', () => {
      it('첫 번째 통과한 검증의 메시지를 반환해야 한다', () => {
        const validations: IValid[] = [
          { check: () => false, message: '첫 번째 실패' },
          { check: () => true, message: '두 번째 통과' },
          { check: () => true, message: '세 번째 통과' },
        ];
        const result = runValidationChecks(validations);
        expect(result).toBe('두 번째 통과');
      });
    });
  });

  describe('검증 실패 시', () => {
    context('모든 검증이 실패할 때', () => {
      it('false를 반환해야 한다', () => {
        const validations: IValid[] = [
          { check: () => false, message: '첫 번째 실패' },
          { check: () => false, message: '두 번째 실패' },
          { check: () => false, message: '세 번째 실패' },
        ];
        const result = runValidationChecks(validations);
        expect(result).toBe(false);
      });
    });
  });
});

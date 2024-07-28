import { fields, fieldKey } from './hasEmpty';

describe('hasEmpty', () => {
  const context = describe;
  describe('fileds 함수', () => {
    context('객체의 값이 하나라도 비어있을때', () => {
      it('true를 반환한다', () => {
        const exmple = { name: 'test', emaill: '' };
        const result = fields(exmple);
        expect(result).toBe(true);
      });
    });

    context('객체의 값이 비어있지 않으면', () => {
      it('false를 반환한다.', () => {
        const exmple = { name: 'test', email: 'test@test.com' };
        const result = fields(exmple);
        expect(result).toBe(false);
      });
    });
  });

  describe('fieldKey', () => {
    context('여러개의 객체의 값이 하나라도 비어있다면', () => {
      it('해당 키를 반환한다.', () => {
        const exmple = { name: 'test', email: '' };
        const result = fieldKey(exmple);
        expect(result).toBe('email');
      });
    });

    context('두개 이상의 객체의 값이 비어있다면', () => {
      it('첫번째 대상의 키값을 반환한다.', () => {
        const exmple = { name: 'test', email: '', age: '' };
        const result = fieldKey(exmple);
        expect(result).toBe('email');
      });
    });
  });
});

import keys from './keys';

describe('keys 함수', () => {
  const context = describe;

  describe('정상적인 인자 제공 시', () => {
    context('문자열과 인덱스를 제공했을 때', () => {
      it('문자열과 인덱스를 결합한 형식을 반환해야 한다', () => {
        const result = keys('test', 1);
        expect(result).toBe('test-1');
      });

      it('다른 문자열과 인덱스를 결합한 형식을 반환해야 한다', () => {
        const result = keys('example', 42);
        expect(result).toBe('example-42');
      });
    });
  });
});

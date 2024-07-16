import SessionStorageManager from './sessionStorageManager';

describe('SessionStorageManager', () => {
  const context = describe;
  const testKey = 'testKey';
  let manager: SessionStorageManager;

  beforeEach(() => {
    manager = new SessionStorageManager(testKey);
    sessionStorage.clear();
  });

  describe('데이터 저장', () => {
    context('데이터를 sessionStorage에 저장할 때', () => {
      it('sessionStorage에 데이터를 저장해야 한다', () => {
        const data = { a: 1, b: 'test' };
        manager.save(data);
        expect(sessionStorage.getItem(testKey)).toBe(JSON.stringify(data));
      });
    });
  });

  describe('데이터 가져오기', () => {
    context('sessionStorage에 데이터가 있을 때', () => {
      it('sessionStorage에서 데이터를 가져와야 한다', () => {
        const data = { a: 1, b: 'test' };
        sessionStorage.setItem(testKey, JSON.stringify(data));
        expect(manager.get()).toEqual(data);
      });
    });

    context('sessionStorage에 데이터가 없을 때', () => {
      it('null을 반환해야 한다', () => {
        expect(manager.get()).toBeNull();
      });
    });
  });

  describe('데이터 삭제', () => {
    context('sessionStorage에서 데이터를 삭제할 때', () => {
      it('sessionStorage에서 데이터를 삭제해야 한다', () => {
        const data = { a: 1, b: 'test' };
        sessionStorage.setItem(testKey, JSON.stringify(data));
        manager.delete();
        expect(sessionStorage.getItem(testKey)).toBeNull();
      });
    });
  });
});

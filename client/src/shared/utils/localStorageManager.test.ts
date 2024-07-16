import LocalStorageManager from './localStorageManager';

describe('SessionStorageManager', () => {
  const context = describe;
  const testKey = 'testKey';
  let manager: LocalStorageManager;

  beforeEach(() => {
    manager = new LocalStorageManager(testKey);
    localStorage.clear();
  });

  describe('데이터 저장', () => {
    context('데이터를 localStorage에 저장할 때', () => {
      it('localStorage에서 데이터를 저장해야 한다', () => {
        const data = { a: 1, b: 'test' };
        manager.save(data);
        expect(localStorage.getItem(testKey)).toBe(JSON.stringify(data));
      });
    });
  });

  describe('데이터 가져오기', () => {
    context('localStorage에 데이터가 있을 때', () => {
      it('localStorage에서 데이터를 가져와야 한다', () => {
        const data = { a: 1, b: 'test' };
        localStorage.setItem(testKey, JSON.stringify(data));
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
    context('localStorage에서 데이터를 삭제할 때', () => {
      it('localStorage에서 데이터를 삭제해야 한다', () => {
        const data = { a: 1, b: 'test' };
        localStorage.setItem(testKey, JSON.stringify(data));
        manager.delete();
        expect(localStorage.getItem(testKey)).toBeNull();
      });
    });
  });
});

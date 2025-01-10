import LocalStorageManager from './localStorageManager';

describe('localStorageManager', () => {
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

    context('데이터와 만료 옵션을 저장할 때', () => {
      it('localStroage에서 데이터와 만료기한 옵션을 저장해야 한다.', () => {
        const data = { a: 1, b: 'expirationTest' };
        const expirationDate = 3;
        manager.save(data, { expirationDate });

        const getdata = JSON.parse(localStorage.getItem(testKey)!);
        expect(getdata.data).toEqual(data);
        expect(getdata.expires).toBeDefined();
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

    context('localStorage에 옵션이 있을 때', () => {
      it('옵션은 제외하고 데이터만 반환 한다.', () => {
        const data = { a: 1, b: 'expirationTest' };
        const expires = 3234567890000;
        localStorage.setItem(testKey, JSON.stringify({ data, expires }));

        const getData = manager.get();
        expect(getData).toEqual(data);
      });

      it('만료 기한이 지난 경우 데이터를 제거 한다.', () => {
        const data = { a: 1, b: 'expirationTest' };
        const expires = 1234567890000;
        localStorage.setItem(testKey, JSON.stringify({ data, expires }));

        const getData = manager.get();
        expect(getData).toEqual(null);
      });
    });

    context('localStorage에 데이터가 없을 때', () => {
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

import { mmss } from './formatTime';

describe('mmss 함수 테스트', () => {
  it('0초는 "00:00"으로 포맷된다', () => {
    expect(mmss(0)).toBe('00:00');
  });

  it('59초는 "00:59"으로 포맷된다', () => {
    expect(mmss(59)).toBe('00:59');
  });

  it('60초는 "01:00"으로 포맷된다', () => {
    expect(mmss(60)).toBe('01:00');
  });

  it('3600초는 "60:00"으로 포맷된다', () => {
    expect(mmss(3600)).toBe('60:00');
  });

  it('3661초는 "61:01"으로 포맷된다', () => {
    expect(mmss(3661)).toBe('61:01');
  });
});

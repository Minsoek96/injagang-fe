import { serverDisconnected } from './serverDisconnected';

describe('serverDisconnected', () => {
  it('네트워크 연결이 끊긴 경우', () => {
    const message = 'Network Error';
    const error = serverDisconnected(message);

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('서버와 연결이 끊겼습니다. 잠시후 다시시도해주세요.');
  });

  it('확인 불가능한 오류가 발생한 경우', () => {
    const message = 'unknow Error';
    const error = serverDisconnected(message);

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('원인 파악이 불명한 에러가 발생했습니다.');
  });
});

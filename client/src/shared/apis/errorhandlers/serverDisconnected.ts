const serverDisconnected = (message: string) =>
  (message === 'Network Error'
    ? new Error('서버와 연결이 끊겼습니다. 잠시후 다시시도해주세요.')
    : new Error('원인 파악이 불명한 에러가 발생했습니다.'));

export {
  serverDisconnected,
};

type ErrorCodeType = {
  [key: string]: { code: string; message: string; requireLogin?: boolean };
};

const ERROR_CODE: ErrorCodeType = {
  default: { code: 'ERROR', message: '알 수 없는 오류가 발생했습니다.' },

  // axios error
  ERR_BAD_RESPONSE: {
    code: '서버 에러',
    message: '서버와 연결이 끊겼습니다.',
  },

  ERR_NETWORK: {
    code: '통신 에러',
    message:
      '서버가 응답하지 않습니다.',
  },
  ECONNABORTED: {
    code: '요청 시간 초과',
    message: '요청 시간을 초과했습니다.',
  },

  // http status code 및 정의 된 코드
  400: { code: '400', message: '잘못된 요청.' },
  401: { code: '401', message: '인증 에러.', requireLogin: true },
  403: { code: '403', message: '권한이 없습니다.' },
} as const;

export { ERROR_CODE };

export const BRAND = {
  title: 'INJAGANG',
};

export const ERROR_MESSAGES = {
  FILL_BLANKS: '빈칸을 채워주세요.',
  CHECK_PASSWORD: '비밀번호를 재확인해주세요',
  DOESN_T_MATCH: '아이디나 비밀번호가 일치하지 않습니다.',
  EMPTY_TITLE: '제목을 입력해주세요.',
  MINIMUM_QNA: '질문과 답변은 1개이상 작성해주세요.',
  EMPTY_ANSWER: '답변이 비어있습니다.',
  EMPTY_NICK: '닉네임이 비어있습니다.',
  EMPTY_LIST: '리스트가 비어있습니다.',
  DUPLICATION_NICK: '중복된 닉네임이 존재합니다.',
  DUPLICATION_TEXT: '선택한 문장이 존재합니다.',
  DOESN_T_MATCH_PASSWORD: '입력한 정보가 일치하지 않습니다.',
  DOESN_T_TYPE: 'TYPE을 선택해주세요.',
  USER_NOT_FOUND: '해당하는 유저를 찾을 수 없습니다.',
  NO_AUTHORIZATION: '권한이 없습니다. ',
  JWT_EXPIRED: 'JWT가 만료되었습니다.',
  REFRESH_TOKEN_EXPIRED: 'Refresh 토큰이 만료되었습니다.',

  CHECK_OUT: '로그아웃에 실패했습니다.',
  GET_PROFILE: '회원정보를 불러오지 못했습니다.',
  ADDED_USER: '회원가입에 실패했습니다.',
  CHANGE_NICK: '닉네임 변경에 실패했습니다.',

  ADDED_ESSAY: '나의 자소서 목록 추가를 실패했습니다.',
  DELETED_ESSAY: '나의 자소서 목록 삭제를 실패했습니다.',
  UPDATED_ESSAY: '나의 자소서 목록 수정을 실패했습니다.',

  ADDED_QUESTION: '나의 질문이 추가를 실패했습니다.',
  DELETED_QUESTION: '나의 질문 삭제를 실패했습니다.,',
  UPDATED_QUESTION: '나의 질문 수정을 실패했습니다.',

  UPDATED_FEED: '나의 댓글 수정을 실패했습니다.,',
  ADDED_FEED: '댓글 등록을 실패했습니다.,',
  DELETE_FEED: '댓글 삭제를 실패했습니다.',

  ADDED_TEMPLATE: '템플릿 작성을 실패했습니다.',
  DELETED_TEMPLATE: '템플릿 삭제를 실패했습니다.',

  GET_RANDOMQUESTION: '랜덤 질문을 불러오지 못했습니다.',
  ADDED_INTERVIEW_QUESTION: '인터뷰 질문을 등록하지 못했습니다.',
  DELETED_INTERVIEW_QUESTION: '인터뷰 질문을 삭제하지 못했습니다.',
};

export const SUCCESS_MESSAGES = {
  CHECK_OUT: (userId: string) => `${userId}님 좋은 하루되세요^^`,
  GET_PROFILE: (nick: string) => `${nick}님 반갑습니다.^^`,

  ADDED_USER: '회원가입에 성공하였습니다.',

  CHANGE_NICK: '닉네임 변경을 완료하였습니다.',
  CHANGE_PASSWORD: '패스워드 변경을 완료하였습니다.',

  DELETED_TEMPLATE: '템플릿이 성공적으로 삭제되었습니다.,',
  ADDED_TEMPLATE: '템플릿이 추가되었습니다.',

  ADDED_ESSAY: '나의 자소서 목록이 추가되었습니다.',
  DELETED_ESSAY: '나의 자소서 목록이 성공적으로 삭제되었습니다.,',
  UPDATED_ESSAY: '나의 자소서 목록 수정을 하였습니다.',

  ADDED_QUESTION: '나의 질문이 추가되었습니다.',
  DELETED_QUESTION: '나의 질문이 성공적으로 삭제되었습니다.,',
  UPDATED_QUESTION: '나의 질문 수정을 하였습니다.',

  UPDATED_FEED: '나의 댓글을 성공적으로 수정을 하였습니다.,',
  ADDED_FEED: '댓글 등록을 하였습니다.',
  DELETE_FEED: '댓글 삭제를 하였습니다.',

  GET_RANDOMQUESTION: (index:number) => `${index}개의 랜덤 질문을 셋팅하였습니다.`,
  ADDED_INTERVIEW_QUESTION: '인터뷰 질문을 성공적으로 등록하였습니다.',
  DELETED_INTERVIEW_QUESTION: '인터뷰 질문을 성공적으로 삭제하였습니다.',
};

export const PASSWORD_ERROR_MESSAGE = {
  LENGTH: '패스워드 최소 10자 이상이어야 합니다.',
  LOWER: '패스워드에는 최소 하나의 대문자가 포함되어야 합니다.',
  UPPER: '패스워드에는 최소 하나의 소문자가 포함되어야 합니다.',
  NUMBER: '패스워드에는 최소 하나의 숫자가 포함되어야 합니다.',
  SPECIAL: '패스워드에는 최소 하나의 특수문자가 포함되어야 합니다.',
};

export const MODAL_MESSAGES = {
  WARNING: 'Warning',
  MSG: 'Message',
};

export const TOAST_MODE = {
  SUCCESS: 'SUCCESS',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
  INFO: 'INFO',
};

export const TOKEN_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
};

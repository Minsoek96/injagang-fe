const isServer = typeof window === 'undefined';
const SERVER = isServer ? process.env.BACKEND_SERVER_API : '/api';
const AUTH_APIS = {
  INFO_API: '/info',
  SIGNUP_API: '/signup',
  SIGNIN_API: '/login',
  LOGOUT_API: '/logout',
  TOKKEN_REISSUE_API: '/reissue',
  NICK_CHNAGE_API: '/nicknameChange',
  PASSWORD_CHAGNE_API: '/passwordChange',
};

const ESSAY_APIS = {
  WRITE_API: '/essay/write',
  READ_API: '/essay/read/',
  GET_API: '/essay/list',
  DELETE_API: '/essay/delete/',
  REVISE_API: '/essay/revise/',
};

const BOARD_APIS = {
  WRITE_API: '/board/write',
  READ_API: '/board/',
  GET_API: '/board',
  DELETE_API: '/board/',
  REVISE_API: '/board/revise',
};

const FEED_APIS = {
  WRITE_API: '/board/feedback',
  REVISE_API: '/board/feedback/revise',
  GET_API: '/board/feedback/',
  DELETE_API: '/board/feedback/',
};

const QUESTIONS_APIS = {
  ADD_API: '/questions/add',
  GET_API: '/questions',
  RANDOM_API: '/questions/random',
  DELETE_API: '/questions',
};

const TEMPLATE_APIS = {
  ADD_API: '/template/add',
  GET_API: '/template',
  DELTE_API: '/template/',
};

const NEXT_APIS = {
  FEDD_API: '/interview-feedback',
};

export {
  SERVER,
  AUTH_APIS,
  ESSAY_APIS,
  BOARD_APIS,
  FEED_APIS,
  QUESTIONS_APIS,
  TEMPLATE_APIS,
  NEXT_APIS,
};

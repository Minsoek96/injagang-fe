const PROTECTED_ROUTES = {
  COVER_LETTER: /^\/coverLetter(?:\/.*)?$/,
  QNA_DETAIL: /^\/qna\/detail\/.*/,
  QNA_QUESTION: /^\/qna\/question/,
  PROFILE: /^\/profile\/.+/,
  MY_PROFILE: /^\/myProfile/,
};

export { PROTECTED_ROUTES };

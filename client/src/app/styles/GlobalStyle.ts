import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/PretendardVariable.woff2') format('woff2-variations');
    font-weight: 45 920;
    font-style: normal;
    font-display: swap;
  }

  html {
    box-sizing: border-box;
    font-size: 62.5% !important;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    font-size: 1.6rem;
    background: ${(props) => props.theme.colors.bodyColor};
    color: ${(props) => props.theme.colors.text};
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui,
    "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif;
  }

  :lang(ko) {
    font-family: 'Pretendard', -apple-system, "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif;
    h1, h2, h3 {
      word-break: keep-all;
    }
  }

  :lang(en) {
    font-family: 'Roboto', -apple-system, BlinkMacSystemFont, system-ui, "Helvetica Neue", "Segoe UI", sans-serif;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  ::-webkit-scrollbar {
    width: 1rem;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
  }

  ::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
  }
`;

export default GlobalStyle;

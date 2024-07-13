import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
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
    font-family: 'Roboto', sans-serif;
  }

  :lang(ko) {
    h1, h2, h3 {
      word-break: keep-all;
    }
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

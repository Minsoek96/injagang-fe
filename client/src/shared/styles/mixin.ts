import { css } from 'styled-components';

/** Flex 설정 */
const Flex = (justify = 'center', align = 'center') => css`
  display: flex;
  justify-content: ${justify};
  align-items: ${align};
`;

/** Column Flex 설정 */
const Column = (justify = 'center', align = 'center') => css`
  display: flex;
  flex-direction: column;
  justify-content: ${justify};
  align-items: ${align};
`;

/** 가독성  텍스트 옵션 */
const ReadableText = css`
  line-height: 1.8;
  white-space: pre-line;
  overflow-wrap: break-word;
  word-break: break-word;
`;

/** 스타일 스크롤바 */
const ScrollBar = css`
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

const hideScrollbarStyle = css`
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export {
  Flex, Column, ScrollBar, hideScrollbarStyle, ReadableText,
};

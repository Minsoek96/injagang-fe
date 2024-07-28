import { css } from 'styled-components';

/** Flex 설정 */
export const Flex = (justify = 'center', align = 'center') => css`
  display: flex;
  justify-content: ${justify};
  align-items: ${align};
`;

/** Column Flex 설정 */
export const Column = (justify = 'center', align = 'center') => css`
  display: flex;
  flex-direction: column;
  justify-content: ${justify};
  align-items: ${align};
`;

/** 스타일 스크롤바 */
export const ScrollBar = css`
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

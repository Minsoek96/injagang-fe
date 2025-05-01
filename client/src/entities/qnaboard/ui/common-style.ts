import { styleMixin } from '@/src/shared/styles';

import styled from 'styled-components';

/** 자소서 첨부 스타일링 */
const S = {
  container: styled.div`
    ${styleMixin.ScrollBar}
    width: 100%;
    height: 100%;
    color: ${(props) => props.theme.colors.boardText};
    word-break: break-all;
    overflow-x: hidden;
    padding: 1rem;
  `,

  mainTitle: styled.h2`
    color: ${(props) => props.theme.colors.signatureColor};
    font-size: 3rem;
    word-break: normal !important;
    white-space: normal;
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  detailItmes: styled.div`
    word-break: break-all;
  `,

  questionContainer: styled.div`
    font-size: 1.8rem;
    padding-block: 0.8em;
    border-top: 0.1em solid ${(props) => props.theme.colors.mainLine};
    border-bottom: 0.1em solid ${(props) => props.theme.colors.mainLine};
    margin: 1.5rem auto;
    line-height: 1.45;

    > span {
      color: ${(props) => props.theme.colors.signatureColor};
    }

    p {
      display: inline-block;
    }
  `,

  answerContainer: styled.div`
    letter-spacing: 1.25px;
    ${styleMixin.ReadableText};
    > span {
      color: ${(props) => props.theme.colors.signatureColor};
    }
  `,
};

export { S };

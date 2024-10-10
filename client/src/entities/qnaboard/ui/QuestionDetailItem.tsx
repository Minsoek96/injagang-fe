import { memo } from 'react';

import styled from 'styled-components';

import { styleMixin } from '@/src/shared/styles';
import { MarkdownPreview } from '@/src/shared/ui';

interface BoardItemProps {
  title: string;
  nickname: string;
  content: string;
}

/**
 * QuestionDetailItem 질문 상세 아이템
 * 유저의 질문
 *
 * @param title -  질문 제목
 * @param nickname - 작성자
 * @param content - 질문 내용
 */
function QuestionDetailItem({ title, nickname, content }: BoardItemProps) {
  return (
    <QuestionItemContainer>
      <TitleWrapper>
        <Title>{title}</Title>
      </TitleWrapper>
      <NickNameWrapper>
        <p>{nickname}</p>
      </NickNameWrapper>
      <MarkdownPreview content={content} />
    </QuestionItemContainer>
  );
}
export default memo(QuestionDetailItem);

const QuestionItemContainer = styled.div`
  ${styleMixin.Column()}
  width: 100%;
  height: 100%;

  resize: none;
  font-weight: normal;
  line-height: 2;

  padding-block: 0.7em;
  padding-inline: 1em;

  margin: 0.8rem auto;
`;

const TitleWrapper = styled.div`
  width: 100%;
  font-weight: bold;
`;

const Title = styled.h2`
    color: ${(props) => props.theme.colors.signatureColor};
    font-size: 3rem;
    word-break: normal !important;
    white-space: normal;
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    `;

const NickNameWrapper = styled.div`
  width: 100%;
  font-size: 1.8rem;
  text-align: right;
  color: ${(props) => props.theme.colors.signatureColor};
`;

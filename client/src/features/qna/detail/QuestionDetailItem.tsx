import { memo } from 'react';

import styled from 'styled-components';

import { styleMixin } from '@/src/shared/styles';
import { MarkdownPreview } from '@/src/shared/ui';
import { S } from '@/src/features/qna/common';

interface BoardItemProps {
  title: string;
  nickname: string;
  content: string;
}

function QuestionDetailItem({ title, nickname, content }: BoardItemProps) {
  return (
    <QuestionItemContainer>
      <TitleWrapper>
        <S.mainTitle>{title}</S.mainTitle>
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

const NickNameWrapper = styled.div`
  width: 100%;
  font-size: 1.8rem;
  text-align: right;
  color: ${(props) => props.theme.colors.signatureColor};
`;

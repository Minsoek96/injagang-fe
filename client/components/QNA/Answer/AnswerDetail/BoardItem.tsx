import { memo } from 'react';

import styled from 'styled-components';

import { styleMixin } from '@/src/shared/styles';

interface BoardItemProps {
  title: string;
  nickname: string;
  content: string;
  // owner: boolean;
}

function BoardItem({ title, nickname, content }: BoardItemProps) {
  return (
    <BoardItemContainer>
      <h2 className="board_title">
        {' '}
        제목:
        {title}
      </h2>
      <h4 className="board_nickname">
        {' '}
        작성자:
        {nickname}
      </h4>
      <h4 className="board_content">
        {' '}
        {content}
      </h4>
    </BoardItemContainer>
  );
}

export default memo(BoardItem);

const BoardItemContainer = styled.div`
  ${styleMixin.Column()}
  width: 100%;
  height: 100%;
  .board_nickname {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    text-decoration: underline;
  }
  .board_content {
    margin-top: 15px;
    width: 100%;
    display: flex;
    font-weight: normal;
    justify-content: flex-start;
    line-height: 1.8;
  }
`;

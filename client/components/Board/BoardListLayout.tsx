import { useEffect } from 'react';

import styled from 'styled-components';

import { useFetchBoardList } from '@/api/QnABoard/queries';
import { useBoardStore } from '@/store/qna';
import BoardList from './BoardList';
import BoardListHead from './BoardListHead';

const HEAD_ITEM = ['번호', '제목', '닉네임'];
const ID_KEY = 'id';
const ROUTE_TEMPLATE = '/qna/answer';

function BoardListLayout() {
  const {
    curPageNum, boardType, boardSearch, setTotalPage,
  } = useBoardStore();
  const { data } = useFetchBoardList(curPageNum, boardType, boardSearch);

  useEffect(() => {
    if (data?.boardInfos) {
      const total = data.totalPage;
      setTotalPage(total);
    }
  }, [data]);

  return (
    <BoardListViewStyle>
      <BoardListHead headItem={HEAD_ITEM} />
      <BoardList
        boardInfos={data?.boardInfos ?? []}
        idKey={ID_KEY}
        displayKeys={['id', 'title', 'nickname']}
        route={ROUTE_TEMPLATE}
      />
    </BoardListViewStyle>
  );
}

export default BoardListLayout;

const BoardListViewStyle = styled.table`
  border: 1px solid #0a0a0a;
  margin: 30px auto;
  width: 80%;
  thead th {
    font-weight: bold;
    font-size: 18px;
    border: none;
    background-color: #ffa600e4;
  }
  thead th:first-child {
    width: 10%;
  }
`;

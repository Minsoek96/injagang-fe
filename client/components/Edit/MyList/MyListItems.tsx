import React from "react";
import styled from "styled-components";
import {BiEdit} from "react-icons/bi";
import { useRouter } from "next/router";

interface CurList {
  index: number;
  essayId: number;
}

const MyListItemsStyle = styled.div`
  .list-items {
    display: flex;
    align-items: center;
    margin: 4px auto;
    font-size: 20px;
    cursor: pointer;
  }
  svg {
    font-size: 30px;
  }
  input {
    font-size: 21px;
    border-radius: 5px;
  }
  .active-item {
    background-color: #f33514f1;
  }
`;

interface MyListItemsProps {
  idx: number;
  list: any;
  getMyListView: (idx: number, id: number) => void;
  curList: CurList;
}

const MyListItems = ({
  idx,
  list,
  getMyListView,
  curList,
}: MyListItemsProps) => {
  const router = useRouter();

  return (
    <MyListItemsStyle className="list-items">
      <div
        className={curList?.index === idx ? "active-item" : ""}
        onClick={() => getMyListView(idx, list.essayId)}
      >
        {list.title}
      </div>
      {curList.index === idx && (
        <div>
          <BiEdit
            onClick={() =>
              router.push({
                pathname: "/edit",
                query: { essayId: JSON.stringify(curList.essayId)},
              })
            }
          />
        </div>
      )}
    </MyListItemsStyle>
  );
};

export default MyListItems;

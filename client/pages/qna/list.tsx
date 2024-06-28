import { useEffect } from "react";

import { useRouter } from "next/router";

import styled from "styled-components";

import BoardListView from "@/components/Board/BoardListLayout";
import PageNation from "@/components/QNA/PageNation";
import BoardSearch from "@/components/QNA/BoardSearch";

import { ColBox, StyleButton } from "@/styles/GlobalStyle";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useBoardStore } from "@/store/qna";
import { GetServerSideProps } from "next";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { board } from "@/api/QnABoard/queryKeys";
import { getBoardList } from "@/api/QnABoard/apis";

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: board.lists(1, "", ""),
    queryFn: () => getBoardList(1, "", ""),
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const list = () => {
  const router = useRouter();
  const { initBoardSearch } = useBoardStore();
  useEffect(() => {
    return () => {
      initBoardSearch();
    };
  }, []);

  return (
    <ListStyle>
      <StyleButton
        className="edit_btn"
        Size={{ width: "600px", font: "15px" }}
        onClick={() => router.push("/qna/question")}
      >
        <MdOutlineModeEditOutline />
        {" 글쓰기"}
      </StyleButton>
      <BoardListView />
      <PageNation />
      <BoardSearch />
    </ListStyle>
  );
};

export default list;

const ListStyle = styled.div`
  ${ColBox}
  width: 80vw;

  .edit_btn {
    display: flex;
    padding: 8px;
    svg {
      font-size: 20px;
    }
  }
  @media screen and (max-width: 800px) {
    .edit_btn {
      width: 300px;
    }
  }
`;

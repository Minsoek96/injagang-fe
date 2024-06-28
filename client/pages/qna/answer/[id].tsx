import React, { useEffect } from "react";

import styled from "styled-components";

import AnswerLayout from "@/components/QNA/Answer/AnswerLayout";

import { ColBox } from "@/styles/GlobalStyle";

import { useDispatch } from "react-redux";
import { initFeedBack } from "@/components/redux/FeedBack/action";
import { useFeedStore } from "@/store/qna";

const ViewStyle = styled.div`
  ${ColBox}
  width: 100%;
  height: 100vh;
`;

const answer = () => {
  const dispatch = useDispatch();
  const { initTargetFeed } = useFeedStore();
  useEffect(() => {
    return () => {
      dispatch(initFeedBack());
      initTargetFeed();
    };
  }, []);

  return (
    <ViewStyle>
      <AnswerLayout />
    </ViewStyle>
  );
};

export default answer;

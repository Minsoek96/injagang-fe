import React, { useEffect } from "react";

import styled from "styled-components";

import AnswerLayout from "@/components/QNA/Answer/AnswerLayout";

import { ColBox } from "@/styles/GlobalStyle";

import { useDispatch } from "react-redux";
import { initFeedBack } from "@/components/redux/FeedBack/action";
import { initTargetFeed } from "@/components/redux/QnA/user/actions";



const ViewStyle = styled.div`
  ${ColBox}
  width: 100%;
  height: 100vh;
`;

const answer = () => {
  const dispatch = useDispatch();
  useEffect(() => {

    return () => {
      dispatch(initFeedBack())
      dispatch(initTargetFeed())
    }
  }, []);

  return (
    <ViewStyle>
      <AnswerLayout />
    </ViewStyle>
  );
};

export default answer;

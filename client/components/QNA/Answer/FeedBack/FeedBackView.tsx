import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootReducerType } from "../../../redux/store";
import {
  getFeedbackList,
  updateFeedback,
} from "../../../redux/FeedBack/action";
import FeedBackItems from "./FeedBackItems";
import { ColBox } from "@/styles/GlobalStyle";
import userQnaManager from "../../hooks/userQnaManager";

const FeedBackView = () => {
  const dispatch = useDispatch();
  const feedbackList = useSelector(
    (state: RootReducerType) => state.feedBack.feedbackList,
  );
  const feedIsUpdated = useSelector(
    (state: RootReducerType) => state.feedBack.isUpdated,
  );
  const { targetFeed } = userQnaManager();

  const handleUpdateFeedBack = (feedbackId: number, reviseContent: string) => {
    const data = {
      feedbackId,
      reviseContent,
    };
    dispatch(updateFeedback(data));
  };

  useEffect(() => {
    if (targetFeed !== 0) {
      dispatch(getFeedbackList(targetFeed));
    }
  }, [targetFeed, feedIsUpdated]);

  return (
    <FeedBackViewStyle>
      {feedbackList &&
        feedbackList.map(feedback => (
          <FeedBackItems
            key={feedback.feedbackId}
            handleUpdateFeedBack={handleUpdateFeedBack}
            {...feedback}
          ></FeedBackItems>
        ))}
    </FeedBackViewStyle>
  );
};

export default FeedBackView;

const FeedBackViewStyle = styled.div`
  ${ColBox}
  height: 100%;
  width: 100%;
  margin-top: 5vh;
`;

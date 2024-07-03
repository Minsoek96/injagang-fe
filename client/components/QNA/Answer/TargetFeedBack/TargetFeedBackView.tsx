import styled from "styled-components";
import { ColBox } from "@/styles/GlobalStyle";

import TargetFeedBackItems from "./TargetFeedBackItems";

import userQnaManager from "../../hooks/userQnaManager";
import { useFetchFeedBackList } from "@/api/FEEDBACK/queries";
import { useReviseFeed } from "@/api/FEEDBACK/mutation";

const TargetFeedBackView = () => {
  const { targetFeed } = userQnaManager();
  const { data: feedbackList } = useFetchFeedBackList(targetFeed);
  const { mutate: updateFeed } = useReviseFeed(targetFeed);

  return (
    <FeedBackViewStyle>
      {feedbackList?.map(feedback => (
        <TargetFeedBackItems
          key={feedback.feedbackId}
          handleUpdateFeedBack={updateFeed}
          {...feedback}
        ></TargetFeedBackItems>
      ))}
    </FeedBackViewStyle>
  );
};

export default TargetFeedBackView;

const FeedBackViewStyle = styled.div`
  ${ColBox}
  height: 100%;
  width: 100%;
  margin-top: 5vh;
`;

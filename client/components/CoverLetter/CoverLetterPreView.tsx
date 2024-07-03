import React from "react";

import styled from "styled-components";
import { ColBox, ScrollBar } from "@/styles/GlobalStyle";
import { v } from "@/styles/variables";

import CoverLetterPreViewItem from "./preview/CoverLetterPreViewItem";

import useCoverLetterStore from "@/store/coverLetter/useCoverLetterStore";

const CoverLetterPreView = () => {
  const { selectedCoverLetter } = useCoverLetterStore();

  return (
    <CoverLetterPreViewContainer>
      {selectedCoverLetter.questions.map((question, idx) => (
        <CoverLetterPreViewItem key={idx} question={question} idx={idx} />
      ))}
    </CoverLetterPreViewContainer>
  );
};

export default CoverLetterPreView;

const CoverLetterPreViewContainer = styled.div`
  ${ColBox}
  ${ScrollBar}
  width: 100%;
  height: 200px;
  border-radius: 5px;
  padding: 15px 25px;
  margin: 15px auto;
  background-color: #1d1b1b;
  overflow-x: hidden;
  box-shadow: ${v.boxShadow2};
`;

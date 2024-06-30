import React from "react";

import styled from "styled-components";
import { ColBox, ScrollBar } from "@/styles/GlobalStyle";
import { v } from "@/styles/variables";

import useCoverLetterManager from "./hooks/useCoverLetterManager";
import { useFetchCoverLetter } from "@/api/coverLetter/queries";

const CoverLetterItems = React.lazy(() => import("./CoverLetterItems"));

const CoverLetterList = () => {
  const { selectedCoverLetter } = useCoverLetterManager();

  const { data: coverLetters } = useFetchCoverLetter();

  return (
    <CoverLetterListContainer>
      {coverLetters?.map(item => (
        <CoverLetterItems
          key={item.essayId}
          item={item}
          selectedId={selectedCoverLetter.essayId}
        />
      ))}
    </CoverLetterListContainer>
  );
};

export default CoverLetterList;

export const CoverLetterListContainer = styled.div`
  ${ColBox}
  ${ScrollBar}
  background-color: #302e2e;
  border-radius: 5px;
  width: 100%;
  height: 350px;
  margin: 15px auto;
  overflow-x: hidden;
  box-shadow: ${v.boxShadow2};
`;

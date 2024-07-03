import React, { useEffect } from "react";

import styled from "styled-components";
import { ColBox } from "@/styles/GlobalStyle";

import CoverLetter from "@/components/CoverLetter/CoverLetter";

import useCoverLetterStore from "@/store/coverLetter/useCoverLetterStore";

const CoverLetterPage = () => {
  const { initCoverLetter } = useCoverLetterStore();

  useEffect(() => {
    return () => {
      initCoverLetter()
    };
  }, []);

  return (
    <CoverLetterStyle>
      <CoverLetter />
    </CoverLetterStyle>
  );
};

export default CoverLetterPage;

const CoverLetterStyle = styled.div`
  ${ColBox}
`;

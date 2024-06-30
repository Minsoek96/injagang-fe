import React from "react";

import { BiEdit } from "react-icons/bi";

import styled from "styled-components";
import { FlexBox } from "@/styles/GlobalStyle";

import useUserCoverLetterManager from "./hooks/useCoverLetterManager";

import { ICoverLetters } from "@/types/coverLetter/CoverLetterType";


interface CoverLetterItemsProps {
  item: ICoverLetters;
  selectedId: number;
}

const CoverLetterItems = ({ item, selectedId }: CoverLetterItemsProps) => {
  const { moveEditPage, changeSeleted } = useUserCoverLetterManager();
  const isSelectedItem = selectedId === item.essayId ? true : false;

  return (
    <CoverLetterItemsContainer isActive={isSelectedItem}>
      <p onClick={() => changeSeleted(item)}>{item.title}</p>
      <BiEdit onClick={() => moveEditPage(item.essayId)} />
    </CoverLetterItemsContainer>
  );
};

export default React.memo(CoverLetterItems);

const CoverLetterItemsContainer = styled.div<{ isActive: boolean }>`
  ${FlexBox}
  gap: 13px;
  margin-top: 15px;
  font-size: ${({ isActive }) => (isActive ? "30px" : "20px")};
  background-color: ${({ isActive }) => (isActive ? "#e78f29" : "")};
  transition: all ease-in 0.2s;
  width: 95%;
  opacity: ${({ isActive }) => (isActive ? "1" : "0.2")};
  border-radius: 8px;
  cursor: pointer;
`;

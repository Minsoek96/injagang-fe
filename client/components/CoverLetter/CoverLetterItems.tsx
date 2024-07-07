/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { BiEdit } from 'react-icons/bi';

import styled from 'styled-components';
import { FlexBox } from '@/styles/GlobalStyle';

import { ICoverLetters } from '@/types/coverLetter/CoverLetterType';
import { memo } from 'react';
import useUserCoverLetterManager from './hooks/useCoverLetterManager';

interface CoverLetterItemsProps {
  item: ICoverLetters;
  selectedId: number;
}

function CoverLetterItems({ item, selectedId }: CoverLetterItemsProps) {
  const { moveEditPage, changeSeleted } = useUserCoverLetterManager();
  const isSelectedItem = selectedId === item.essayId;

  return (
    <CoverLetterItemsContainer $isActive={isSelectedItem}>
      <p onClick={() => changeSeleted(item)}>{item.title}</p>
      <BiEdit onClick={() => moveEditPage(item.essayId)} />
    </CoverLetterItemsContainer>
  );
}

export default memo(CoverLetterItems);

const CoverLetterItemsContainer = styled.div<{ $isActive: boolean }>`
  ${FlexBox}
  gap: 13px;
  margin-top: 15px;
  font-size: ${({ $isActive }) => ($isActive ? '30px' : '20px')};
  background-color: ${({ $isActive }) => ($isActive ? '#e78f29' : '')};
  transition: all ease-in 0.2s;
  width: 95%;
  opacity: ${({ $isActive }) => ($isActive ? '1' : '0.2')};
  border-radius: 8px;
  cursor: pointer;
`;

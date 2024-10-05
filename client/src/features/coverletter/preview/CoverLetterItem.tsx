import { memo } from 'react';

import styled from 'styled-components';

import { BiEdit } from 'react-icons/bi';

import {
  coverLetterType,
  useCoverLetterStore,
} from '@/src/entities/coverLetter';

import { styleMixin, V } from '@/src/shared/styles';
import usePageRouter from '@/src/shared/hooks/router/usePageRouter';

interface CoverLetterItemsProps {
  item: coverLetterType.ICoverLetters;
  selectedCoverLetter: coverLetterType.ICoverLetters;
}

/**
 * CoverLetterItem 유저의 자소서 목록 리스트 아이템
 * - 선택한 자소서를 미리보기에 등록
 * - 선택한 제목의 자소서 정보 상세보기
 *
 * @param item - 질문 넘버
 * @param selectedCoverLetter - 현재 유저가 선택한 자소
 */
function CoverLetterItem({
  item,
  selectedCoverLetter,
}: CoverLetterItemsProps) {
  const { moveCoverLetterEditPage } = usePageRouter();
  const { setCoverLetter } = useCoverLetterStore();

  const changeSeleted = (newList: coverLetterType.ICoverLetters) => {
    if (newList === selectedCoverLetter) return;
    setCoverLetter(newList);
  };

  const isSelectedItem = selectedCoverLetter.essayId === item.essayId;

  return (
    <CoverLetterItemsContainer $isActive={isSelectedItem}>
      <div onClick={() => changeSeleted(item)}>{item.title}</div>
      <HideSvg
        onClick={() => moveCoverLetterEditPage(item.essayId)}
        role="button"
      >
        <BiEdit />
        <span>상세보기</span>
      </HideSvg>
    </CoverLetterItemsContainer>
  );
}

export default memo(CoverLetterItem);

const CoverLetterItemsContainer = styled.li<{ $isActive: boolean }>`
  ${styleMixin.Flex()}
  gap: 1.3rem;
  margin-top: ${V.mdMargin};
  font-size: 2rem;
  font-weight: 600;
  transform: ${({ $isActive }) => ($isActive ? 'scale(1.5)' : 'scale(1)')};
  transition: all ease-in 0.2s;
  width: 100%;
  opacity: ${({ $isActive }) => ($isActive ? '1' : '0.2')};
  border-radius: 8px;
  cursor: pointer;

  @media screen and (max-width: ${V.mediaMobile}) {
    font-size: 1.5rem;
  }
`;

const HideSvg = styled.div`
  ${styleMixin.Flex()}
  color: ${(props) => props.theme.colors.brandColor};
  span {
    display: none;
  }
  &:hover {
    span {
      display: block;
      font-size: 1rem;
    }
  }
`;

import styled from "styled-components";

import { BiEditAlt, BiFile } from "react-icons/bi";

import {
  coverLetterType,
  useCoverLetterStore,
} from "@/src/entities/coverLetter";

import { styleMixin, V } from "@/src/shared/styles";
import usePageRouter from "@/src/shared/hooks/router/usePageRouter";
import { HideSvg } from "@/src/shared/ui";

interface CoverLetterItemsProps {
  item: coverLetterType.ICoverLetters;
  selectedCoverLetter: coverLetterType.ICoverLetters;
}

function CoverLetterItem({ item, selectedCoverLetter }: CoverLetterItemsProps) {
  const { moveCoverLetterEditPage } = usePageRouter();
  const { setCoverLetter } = useCoverLetterStore();

  const changeSeleted = (newList: coverLetterType.ICoverLetters) => {
    if (newList === selectedCoverLetter) return;
    setCoverLetter(newList);
  };

  const isSelectedItem = selectedCoverLetter.essayId === item.essayId;

  return (
    <CoverLetterItemsContainer $isActive={isSelectedItem}>
      <ItemContainer onClick={() => changeSeleted(item)}>
        <FileIconWrapper>
          <BiFile />
        </FileIconWrapper>
        <ItemWrapper>
          <ItemTitle>{item.title}</ItemTitle>
          <ItemInfo>
            <span>{item.questions.length}</span>
            개의 문항이 존재합니다.
          </ItemInfo>
        </ItemWrapper>
      </ItemContainer>
      {isSelectedItem && (
        <HideSvg
          onClick={() => moveCoverLetterEditPage(item.essayId)}
          Logo={<BiEditAlt />}
          label="상세보기"
          sx={{ fontSize: "2.5rem", fontWeight: 500 }}
        />
      )}
    </CoverLetterItemsContainer>
  );
}

export default CoverLetterItem;

const CoverLetterItemsContainer = styled.li<{ $isActive: boolean }>`
  ${styleMixin.Flex("space-between", "center")}
  padding-block: 1.2rem 1.6rem;
  width: 100%;
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.highlightColor : "transparent"};
  border-radius: 12px;
  transition: all 0.3s ease;
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.text : theme.colors.emptyGray};
  cursor: pointer;

  &:hover {
    background-color: ${({ $isActive, theme }) =>
      $isActive ? theme.colors.highlightColor : theme.colors.mainHover};
  }

  @media screen and (max-width: ${V.mediaMobile}) {
    padding: 1rem 0.8rem;
  }
`;

const ItemContainer = styled.div`
  ${styleMixin.Flex("flex-start", "center")};
  gap: 1.2rem;
  flex: 1;
  min-width: 0;
`;

const FileIconWrapper = styled.div`
  ${styleMixin.Flex()};
  font-size: 2.8rem;
  flex-shrink: 0;
`;

const ItemWrapper = styled.div`
  ${styleMixin.Column("", "flex-start")}
  gap: 0.4rem;
  min-width: 0;
`;

const ItemTitle = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemInfo = styled.div`
  font-size: 1.4rem;

  span {
    font-weight: 500;
    color: ${(props) => props.theme.colors.signatureColor};
    margin-right: 0.4rem;
  }
`;

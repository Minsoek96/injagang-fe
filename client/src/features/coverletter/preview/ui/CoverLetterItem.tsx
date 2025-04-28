import styled from 'styled-components';
import { BiEditAlt, BiFile, BiTrash } from 'react-icons/bi';

import {
  coverLetterType,
  useCoverLetterStore,
} from '@/src/entities/coverLetter';
import { styleMixin, V } from '@/src/shared/styles';
import { MainButton } from '@/src/shared/ui';
import { usePageRouter } from '@/src/shared/hooks/router';

interface CoverLetterItemsProps {
  item: coverLetterType.ICoverLetters;
  selectedCoverLetter: coverLetterType.ICoverLetters;
  onDelete: (id: number) => void;
}

function CoverLetterItem({
  item,
  selectedCoverLetter,
  onDelete,
}: CoverLetterItemsProps) {
  const { moveCoverLetterEditPage } = usePageRouter();
  const setCoverLetter = useCoverLetterStore((state) => state.setCoverLetter);
  const isSelectedItem = selectedCoverLetter.essayId === item.essayId;

  const changeSelected = (
    e: React.MouseEvent,
    newList: coverLetterType.ICoverLetters,
  ) => {
    e.stopPropagation();
    if (newList === selectedCoverLetter) return;
    setCoverLetter(newList);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(item.essayId);
    }
  };

  return (
    <Container $isActive={isSelectedItem}>
      <ItemContainer onClick={(e) => changeSelected(e, item)}>
        <FileIconWrapper $isActive={isSelectedItem}>
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

      <ButtonWrapper>
        <MainButton
          onClick={(e) => {
            e.stopPropagation();
            moveCoverLetterEditPage(item.essayId);
          }}
          label={(
            <>
              <BiEditAlt />
              <ButtonLabel>편집</ButtonLabel>
            </>
          )}
          isActive={isSelectedItem}
          disabled={!isSelectedItem}
          variant="dashed"
        />

        <MainButton
          onClick={handleDelete}
          isActive={isSelectedItem}
          disabled={!isSelectedItem}
          label={(
            <>
              <BiTrash />
              <ButtonLabel>삭제</ButtonLabel>
            </>
          )}
          variant="dashed"
        />
      </ButtonWrapper>
    </Container>
  );
}

export default CoverLetterItem;

const Container = styled.li<{ $isActive: boolean }>`
  ${styleMixin.Flex('space-between', 'center')}
  width: 100%;
  height: 7rem;
  padding: 1rem 1.6rem;
  border-radius: 12px;
  background-color: ${({ $isActive, theme }) =>
    ($isActive ? `${theme.colors.signatureColor}1A` : 'transparent')};
  color: ${({ $isActive, theme }) =>
    ($isActive ? theme.colors.dark : theme.colors.emptyGray)};
  border-left: ${({ $isActive, theme }) =>
    ($isActive
      ? `4px solid ${theme.colors.signatureColor}`
      : '4px solid transparent')};
  transition: all 0.2s ease;
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.75)};
  line-height: 1.1;
  overflow: hidden;
  cursor: pointer;
  margin-bottom: 0.8rem;

  &:hover {
    background-color: ${({ $isActive, theme }) =>
    ($isActive
      ? `${theme.colors.signatureColor}2A`
      : `${theme.colors.signatureColor}0A`)};
    opacity: 1;
  }

  @media screen and (max-width: ${V.mediaMobile}) {
    padding: 1rem;
    height: auto;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }
`;

const ItemContainer = styled.div`
  ${styleMixin.Flex('flex-start', 'center')};
  gap: 1.2rem;
  flex: 1;
  min-width: 0;
`;

const FileIconWrapper = styled.div<{ $isActive: boolean }>`
  ${styleMixin.Flex()};
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 8px;
  background-color: ${({ $isActive, theme }) =>
    ($isActive
      ? `${theme.colors.signatureColor}30`
      : `${theme.colors.emptyGray}15`)};
  color: ${({ $isActive, theme }) =>
    ($isActive ? theme.colors.signatureColor : theme.colors.emptyGray)};
  flex-shrink: 0;
  transition: all 0.2s ease;

  svg {
    font-size: 2.2rem;
    fill: currentColor;
  }
`;

const ItemWrapper = styled.div`
  ${styleMixin.Column('', 'flex-start')}
  gap: 0.4rem;
  min-width: 0;
`;

const ItemTitle = styled.div`
  width: 100%;
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

const ButtonWrapper = styled.div`
  ${styleMixin.Flex()};
  gap: 0.8rem;
  margin-left: 1rem;
  button {
    font-size: 1.8rem;
    color:${(props) => props.theme.colors.text};
  }
`;

const ButtonLabel = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  margin-left: 0.3rem;
`;

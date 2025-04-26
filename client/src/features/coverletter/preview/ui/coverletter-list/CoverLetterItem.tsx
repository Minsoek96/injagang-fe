import styled from 'styled-components';
import { BiEditAlt, BiFile } from 'react-icons/bi';

import { coverLetterType, useCoverLetterStore } from '@/src/entities/coverLetter';

import { styleMixin, V } from '@/src/shared/styles';
import { MainButton } from '@/src/shared/ui';
import { usePageRouter } from '@/src/shared/hooks/router';

interface CoverLetterItemsProps {
  item: coverLetterType.ICoverLetters;
  selectedCoverLetter: coverLetterType.ICoverLetters;
}

function CoverLetterItem({ item, selectedCoverLetter }: CoverLetterItemsProps) {
  const { moveCoverLetterEditPage } = usePageRouter();
  const setCoverLetter = useCoverLetterStore((state) => state.setCoverLetter);
  const isSelectedItem = selectedCoverLetter.essayId === item.essayId;

  const changeSeleted = (e:React.MouseEvent, newList: coverLetterType.ICoverLetters) => {
    e.stopPropagation();
    if (newList === selectedCoverLetter) return;
    setCoverLetter(newList);
  };

  return (
    <Container $isActive={isSelectedItem}>
      <ItemContainer onClick={(e) => changeSeleted(e, item)}>
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
        <MainButton
          onClick={(e) => {
            e.stopPropagation();
            moveCoverLetterEditPage(item.essayId);
          }}
          label={(
            <>
              <BiEditAlt style={{ fontSize: '2.5rem' }} />
              Edit
            </>
          )}
          sx={{ fontSize: '2rem', fontWeight: 500, padding: '.2rem' }}
          variant="ghost"
        />
      )}
    </Container>
  );
}

export default CoverLetterItem;

const Container = styled.li<{ $isActive: boolean }>`
  ${styleMixin.Flex('space-between', 'center')}
  width: 100%;
  height: 6.5rem;
  padding: 1rem 1.6rem;
  border-radius: 8px;
  background-color: ${({ $isActive, theme }) =>
    ($isActive ? `${theme.colors.signatureColor}1A` : 'transparent')};
  color: ${({ $isActive, theme }) =>
    ($isActive ? theme.colors.dark : theme.colors.emptyGray)};
  transition: all 0.3s ease;
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.6)};
  line-height: 1.1;
  overflow: hidden;
  cursor: pointer;

  svg {
    font-size: 3.2rem;
    fill: ${({ $isActive, theme }) =>
    ($isActive ? theme.colors.signatureColor : theme.colors.emptyGray)};
  }

  &:hover {
    background-color: ${({ theme }) => `${theme.colors.signatureColor}4A`};
  }

  button:hover {
    scale: 1.1;
  }

  @media screen and (max-width: ${V.mediaMobile}) {
    padding: 1rem 0.8rem;
  }
`;

const ItemContainer = styled.div`
  ${styleMixin.Flex('flex-start', 'center')};
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
    font-weight: 400;
    color: ${(props) => props.theme.colors.signatureColor};
    margin-right: 0.4rem;
  }
`;

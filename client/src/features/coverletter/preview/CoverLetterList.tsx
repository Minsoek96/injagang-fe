import styled from 'styled-components';

import { GoFile } from "react-icons/go";

import { styleMixin, V } from '@/src/shared/styles';
import {
  useCoverLetterStore,
  coverLetterQueries,
} from '@/src/entities/coverLetter';

import CoverLetterItem from './CoverLetterItem';

/**
 * CoverLetterList 유저의 자소서 목록 리스트
 * - 유저가 작성한 자소서 목록 리스트를 가져온다.
 */
function CoverLetterList() {
  const { data: coverLetters } = coverLetterQueries.useFetchCoverLetter();
  const { selectedCoverLetter } = useCoverLetterStore();

  if (!coverLetters?.length) {
    return (
      <CoverLetterListContainer>
        <EmptyContainer>
          <GoFile />
          <EmptyTitle>작성된 자소서가 없습니다</EmptyTitle>
          <EmptyText>새로운 자기소개서를 작성해보세요</EmptyText>
        </EmptyContainer>
      </CoverLetterListContainer>
    );
  }

  return (
    <CoverLetterListContainer>
      <ListHeader>
        <ListTitle>자기소개서 목록</ListTitle>
      </ListHeader>
      <ListContent>
        {coverLetters?.map((item) => (
          <CoverLetterItem
            key={item.essayId}
            item={item}
            selectedCoverLetter={selectedCoverLetter}
          />
        ))}
      </ListContent>
    </CoverLetterListContainer>
  );
}

export default CoverLetterList;

const CoverLetterListContainer = styled.div`
  ${styleMixin.Column('flex-start', 'flex-start')}
  width: 100%;
  height: 40rem;
  background: ${(props) => props.theme.colors.primary};
  border-radius: 1.2rem;
  box-shadow: ${V.boxShadow1};
  @media screen and (max-width: ${V.mediaMobile}) {
    height: 20rem;
  }
`;

const ListHeader = styled.div`
  width: 100%;
  padding: 1.2rem 1.6rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.mainLine};
`;

const ListTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 600;
`;

const ListContent = styled.ul`
  ${styleMixin.Column('flex-start', 'flex-start')}
  ${styleMixin.ScrollBar}
  width: 100%;
  height: 100%;
  padding: 0.8rem;
  gap: 0.4rem;
`;

const EmptyContainer = styled.div`
  ${styleMixin.Column('center', 'center')}
  width: 100%;
  height: 100%;
  padding: 2rem;
  text-align: center;

  svg {
    ${styleMixin.Flex()}
    font-size: 7rem;
    margin-bottom: 1.6rem;
    color: ${props => props.theme.colors.emptyGray};
  }
`;

const EmptyTitle = styled.p`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
`;

const EmptyText = styled.p`
  font-size: 1.4rem;
`;

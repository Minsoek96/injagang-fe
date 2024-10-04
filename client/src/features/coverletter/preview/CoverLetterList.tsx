import styled from 'styled-components';

import { styleMixin, V } from '@/src/shared/styles';

import { useCoverLetterStore, coverLetterQueries } from '@/src/entities/coverLetter';

import CoverLetterItems from './CoverLetterItems';

function CoverLetterList() {
  const { data: coverLetters } = coverLetterQueries.useFetchCoverLetter();
  const { selectedCoverLetter } = useCoverLetterStore();

  if (!coverLetters?.length) {
    return (
      <CoverLetterListContainer>
        <EmptyItem>작성된 자소서가 없습니다.</EmptyItem>
      </CoverLetterListContainer>
    );
  }

  return (
    <CoverLetterListContainer>
      {coverLetters?.map((item) => (
        <CoverLetterItems
          key={item.essayId}
          item={item}
          selectedCoverLetter={selectedCoverLetter}
        />
      ))}
    </CoverLetterListContainer>
  );
}

export default CoverLetterList;

const CoverLetterListContainer = styled.ul`
  ${styleMixin.Column()}
  ${styleMixin.ScrollBar}
  width: 100%;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 5px;
  height: 35rem;
  margin: 0.5rem auto;
  overflow-x: hidden;
  box-shadow: ${V.boxShadow2};
`;

const EmptyItem = styled.li`
  font-size: 1.8rem;
`;

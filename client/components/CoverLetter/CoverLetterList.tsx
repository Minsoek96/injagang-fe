import styled from 'styled-components';
import { ColBox, ScrollBar } from '@/styles/GlobalStyle';

import { useFetchCoverLetter } from '@/src/entities/coverLetter/queries';
import { lazy } from 'react';
import { V } from '@/src/shared/styles';
import useCoverLetterManager from './hooks/useCoverLetterManager';

const CoverLetterItems = lazy(() => import('./CoverLetterItems'));

function CoverLetterList() {
  const { selectedCoverLetter } = useCoverLetterManager();

  const { data: coverLetters } = useFetchCoverLetter();

  return (
    <CoverLetterListContainer>
      {coverLetters?.map((item) => (
        <CoverLetterItems
          key={item.essayId}
          item={item}
          selectedId={selectedCoverLetter.essayId}
        />
      ))}
    </CoverLetterListContainer>
  );
}

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
  box-shadow: ${V.boxShadow2};
`;

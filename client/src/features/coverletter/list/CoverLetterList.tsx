import styled from 'styled-components';

import { styleMixin, V } from '@/src/shared/styles';

import { useFetchCoverLetter } from '@/src/entities/coverLetter/queries';
import CoverLetterItems from '@/src/features/coverletter/list/CoverLetterItems';
import useCoverLetterManager from '../hooks/useCoverLetterManager';

function CoverLetterList() {
  const { data: coverLetters } = useFetchCoverLetter();
  const { selectedCoverLetter } = useCoverLetterManager();

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

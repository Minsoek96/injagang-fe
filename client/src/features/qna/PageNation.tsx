import { memo } from 'react';

import styled from 'styled-components';

import { usePageNation } from '@/src/shared/hooks';

import { MainButton } from '@/src/shared/components/button';
import { styleMixin, V } from '@/src/shared/styles';

function PageNation() {
  const {
    curPageNum,
    handlePageClick,
    handlePrevClick,
    handleNextClick,
    visiblePageNumbers,
  } = usePageNation(8);

  return (
    <Container>
      <MainButton label="<" onAction={handlePrevClick} />
      <PageButtonContainer>
        {visiblePageNumbers.map((pageNum) => (
          <MainButton
            key={pageNum}
            label={`${pageNum}`}
            isActive={pageNum === curPageNum}
            onAction={() => handlePageClick(pageNum)}
            sx={{ marginInline: '.2rem' }}
          />
        ))}
      </PageButtonContainer>
      <MainButton label=">" onAction={handleNextClick} />
    </Container>
  );
}

export default memo(PageNation);

const Container = styled.div`
 ${styleMixin.Flex()}

 button {
  font-size: 1.8rem;
 }

 @media screen and (max-width: ${V.mediaMobile}){
  ${styleMixin.Flex('space-between')}
  width: 100%;
 }
`;

const PageButtonContainer = styled.div`
 ${styleMixin.Flex()}

 @media screen and (max-width: ${V.mediaMobile}){
    display:none;
 }
`;

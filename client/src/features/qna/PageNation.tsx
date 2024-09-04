import { memo } from 'react';

import styled from 'styled-components';

import { usePageNation } from '@/src/shared/hooks';

import { MainButton } from '@/src/shared/components/button';
import { styleMixin, V } from '@/src/shared/styles';

/** 페이지 네이션 버튼을 렌더하는 함수 */
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
      <MainButton label="<" onClick={handlePrevClick} disabled={curPageNum === 1} />
      <PageButtonContainer>
        {visiblePageNumbers.map((pageNum) => (
          <MainButton
            key={pageNum}
            label={`${pageNum}`}
            isActive={pageNum === curPageNum}
            onClick={() => handlePageClick(pageNum)}
            sx={{ marginInline: '.2rem' }}
          />
        ))}
      </PageButtonContainer>
      <MainButton label=">" onClick={handleNextClick} disabled={curPageNum === visiblePageNumbers.length} />
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

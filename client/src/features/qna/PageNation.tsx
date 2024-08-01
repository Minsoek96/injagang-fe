import { memo } from 'react';

import styled from 'styled-components';

import { usePageNation } from '@/src/shared/hooks';

import { MainButton } from '@/src/shared/components/button';
import { styleMixin } from '@/src/shared/styles';

// TODO : 너무 복잡한 의존성으로 엮여있음 끊어내기 로직 변경
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
      {visiblePageNumbers.map((pageNum) => (
        <MainButton
          key={pageNum}
          label={`${pageNum}`}
          isActive={pageNum === curPageNum}
          onAction={() => handlePageClick(pageNum)}
          sx={{ marginInline: '.2rem' }}
        />
      ))}
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
`;

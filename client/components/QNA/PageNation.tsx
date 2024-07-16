import { memo } from 'react';

import { usePageNation } from '@/src/shared/hooks';

import { BaseButton } from '@/src/shared/components/button';

// TODO : 너무 복잡한 의존성으로 엮여있음 끊어내기 로직 변경
function PageNation() {
  const {
    curPageNum,
    handlePageClick,
    handlePrevClick,
    handleNextClick,
    visiblePageNumbers,
  } = usePageNation([8]);

  return (
    <div>
      <NavigationButton text="<" onClick={handlePrevClick} />
      {visiblePageNumbers.map((pageNum) => (
        <NavigationButton
          key={pageNum}
          text={`${pageNum}`}
          isActive={pageNum === curPageNum}
          onClick={() => handlePageClick(pageNum)}
        />
      ))}
      <NavigationButton text=">" onClick={handleNextClick} />
    </div>
  );
}

// TODO :: 스타일 리팩토링 작업시 정리 할 것!!
interface NavigationButtonProps {
  text: string;
  isActive?: boolean;
  onClick: () => void;
}

function NavigationButton({
  text,
  isActive = false,
  onClick,
}: NavigationButtonProps) {
  return (
    <BaseButton
      $Size={{ width: '40px', font: '15px' }}
      className={isActive ? 'active_button' : ''}
      onClick={onClick}
    >
      {text}
    </BaseButton>
  );
}

export default memo(PageNation);

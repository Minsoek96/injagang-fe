import { ComboBox } from '@/src/shared/ui';

import { useBoardSearch } from '../../model';

export default function TypeSelector() {
  const { displaySearchType, availableSearchTypes, changeSearchType } = useBoardSearch();
  return (
    <ComboBox
      label="검색"
      hideLabel
      selectedItem={displaySearchType}
      items={availableSearchTypes}
      itemToId={(itme) => itme || ''}
      itemToText={(item) => item || ''}
      onChange={(value) =>
        value && changeSearchType(value as '제목' | '작성자')}
      sx={{ height: '4rem', minWidth: '4rem' }}
    />
  );
}

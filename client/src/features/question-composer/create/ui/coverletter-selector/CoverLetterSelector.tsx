import { useState } from 'react';

import { coverLetterQueries } from '@/src/entities/coverLetter';

import { ComboBox } from '@/src/shared/ui';

type Props = {
  handleChange: (essayId: number) => void;
};
/**
 * CoverLetterSelector 유저의 자소서 선택기
 * - 유저가 선택한 자소서 아이디를 반환한다.
 * @param handleChange : 자소서 변경 함수
 * @returns essayId
 */
export default function CoverLetterSelector({ handleChange }: Props) {
  const { data: coverLtters = [] } = coverLetterQueries.useFetchCoverLetter();

  const [coverLetterTitle, setCoverLetterTitle] = useState<string>('');

  const changeCoverLetter = (changeTitle: string) => {
    setCoverLetterTitle(changeTitle);
    const findEssay = coverLtters?.find((list) => list.title === changeTitle);
    if (findEssay) handleChange(findEssay?.essayId);
  };

  return (
    <ComboBox
      Size={{ width: '100%', height: '4rem' }}
      label="대표자소서선택"
      placeholder="나의자소서 선택(필수사항)"
      hideLabel
      selectedItem={coverLetterTitle}
      items={coverLtters.map((item) => item.title)}
      itemToId={(item) => item || ''}
      itemToText={(item) => item || ''}
      onChange={(value) => value && changeCoverLetter(value)}
    />
  );
}

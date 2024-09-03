import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { BtnType } from '@/src/shared/components';

import { Spinner } from '@/src/shared/components/spinner';
import { useFetchDetailCoverLetter } from '@/src/entities/coverLetter/queries';

import { CoverLetterTemplate } from '@/src/features/coverletter/common';
import useCoverLetterManager from '../hooks/useCoverLetterManager';
import useCoverLetterCreatorLogic from '../hooks/useCoverLetterCreatorLogic';

/** 자소서 수정 메인 컴포넌트 */
function CoverLetterEdit() {
  const router = useRouter();
  const moveCoverLetterMainPage = '/coverLetter';

  const { id } = router.query;
  const { data: coverLetter, isLoading } = useFetchDetailCoverLetter(
    Number(id),
  );

  const {
    qnaList,
    setQnAList,
    deleteQnAList,
    changeQnAList,
    addQnAList,
    coverLetterTitle,
    setCoverLetterTitle,
  } = useCoverLetterCreatorLogic();

  const { changeCoverLetter, deleteCoverLetter } = useCoverLetterManager();

  useEffect(() => {
    if (coverLetter && !isLoading) {
      setQnAList(coverLetter?.qnaList ?? []);
      setCoverLetterTitle(coverLetter?.title ?? '');
    }
  }, [coverLetter]);

  const navigateMoveLetterMainpage = ():void => {
    router.push(moveCoverLetterMainPage);
  };

  const actionButtons: BtnType.BaseProps[] = [
    {
      id: 'back-01',
      label: '뒤로가기',
      onClick: () => navigateMoveLetterMainpage(),
      sx: { fontSize: '2em' },
    },
    {
      id: 'delete-02',
      label: '삭제하기',
      onClick: () => deleteCoverLetter(Number(id)),
      sx: { fontSize: '2em' },
    },
    {
      id: 'change-03',
      label: '수정완료',
      onClick: () => changeCoverLetter(Number(id), coverLetterTitle, qnaList),
      sx: { fontSize: '2em' },
    },
  ];

  if (isLoading) return <Spinner />;

  return (
    <CoverLetterTemplate
      mainTitle="자소서 수정하기"
      coverLetterTitle={coverLetterTitle}
      setCoverLetterTitle={setCoverLetterTitle}
      qnaList={qnaList}
      deleteQnAList={deleteQnAList}
      changeQnAList={changeQnAList}
      addQnAList={addQnAList}
      actionButtons={actionButtons}
      isLoading={isLoading}
      isTemplate={false}
    />
  );
}

export default CoverLetterEdit;

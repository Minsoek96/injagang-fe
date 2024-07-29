import { useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import { BiPlus } from 'react-icons/bi';

import styled from 'styled-components';

import { BaseButton } from '@/src/shared/components/button';

import { V, styleMixin } from '@/src/shared/styles';

import { Spinner } from '@/src/shared/components/spinner';
import { useFetchDetailCoverLetter } from '@/src/entities/coverLetter/queries';
import { APIErrorBoundary } from '@/src/features/boundary';
import useCoverLetterManager from '../hooks/useCoverLetterManager';
import useCoverLetterCreatorLogic from '../hooks/useCoverLetterCreatorLogic';
import CoverLetterQuestionItems from '../new/CoverLetterQuestionItems';

function CoverLetterEdit() {
  const [coverLetterTitle, setCoverLetterTitle] = useState<string>('');
  const router = useRouter();
  const moveCoverLetterMainPage = '/coverLetter';
  const { id } = router.query;
  const { data: coverLetter, isLoading } = useFetchDetailCoverLetter(
    Number(id),
  );

  const {
    qnaList, setQnAList, deleteQnAList, changeQnAList, addQnAList,
  } = useCoverLetterCreatorLogic();

  const { changeCoverLetter, deleteCoverLetter } = useCoverLetterManager();

  useEffect(() => {
    if (coverLetter && !isLoading) {
      setQnAList(coverLetter?.qnaList ?? []);
      setCoverLetterTitle(coverLetter?.title ?? '');
    }
  }, [coverLetter]);

  if (isLoading) return <Spinner />;

  return (
    <APIErrorBoundary>
      <CoverLetterCreatorContainer>
        <MainTitle>자소서 수정하기</MainTitle>
        <CoverLetterTitle
          value={coverLetterTitle}
          onChange={(e) => setCoverLetterTitle(e.target.value)}
          placeholder="자소서 제목"
        />
        {qnaList.map((qna) => (
          <CoverLetterQuestionItems
            key={qna.qnaId}
            item={qna}
            onDelete={deleteQnAList}
            onUpdate={changeQnAList}
          />
        ))}
        <BiPlusStyled onClick={addQnAList} />
        <ControllerBtns>
          <BaseButton
            $Size={{ width: '150px', font: '20px' }}
            onClick={() => router.push(moveCoverLetterMainPage)}
          >
            뒤로가기
          </BaseButton>
          <BaseButton
            $Size={{ width: '150px', font: '20px' }}
            onClick={() => deleteCoverLetter(Number(id))}
          >
            삭제하기
          </BaseButton>
          <BaseButton
            $Size={{ width: '150px', font: '20px' }}
            onClick={() =>
              changeCoverLetter(Number(id), coverLetterTitle, qnaList)}
          >
            수정완료
          </BaseButton>
        </ControllerBtns>
      </CoverLetterCreatorContainer>
    </APIErrorBoundary>
  );
}

export default CoverLetterEdit;
const CoverLetterCreatorContainer = styled.div`
  ${styleMixin.Column()}
  width: 100%;
`;

const MainTitle = styled.h2`
  font-size: 1.7rem;
  margin-bottom: 30px;
  text-decoration-line: underline;
`;

const CoverLetterTitle = styled.input`
  width: ${V.xlItemWidth};
  height: 40px;
  border-radius: 5px;
  border-color: black;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0px 1px 0.5px rgba(0, 0, 0, 09);
  margin-bottom: 15px;
`;

const ControllerBtns = styled.div`
  display: flex;
  justify-content: space-between;
  width: ${V.xlItemWidth};
`;

const BiPlusStyled = styled(BiPlus)`
  margin: 40px auto;
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

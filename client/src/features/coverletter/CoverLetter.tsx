import { Suspense } from 'react';

import { useRouter } from 'next/router';

import { BiPlus } from 'react-icons/bi';

import styled from 'styled-components';
import { styleMixin, V } from '@/src/shared/styles';

import { Spinner } from '@/src/shared/components/spinner';
import { APIErrorBoundary } from '@/src/features/boundary';
import { Container } from '@/src/shared/components/container';
import CoverLetterPreView from './CoverLetterPreView';
import CoverLetterList from './CoverLetterList';

function CoverLetter() {
  const router = useRouter();
  const headerTitle = '나의 자소서 목록';
  const moveCreationPage = '/coverLetter/new';

  return (
    <CoverLetterContainer>
      <CoverLetterPreView />
      <ListHeader>{headerTitle}</ListHeader>
      <APIErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <CoverLetterList />
        </Suspense>
      </APIErrorBoundary>
      <CoverLetterControllers>
        <BiPlus onClick={() => router.push(moveCreationPage)} />
      </CoverLetterControllers>
    </CoverLetterContainer>
  );
}

export default CoverLetter;

const CoverLetterContainer = styled(Container.ItemBase)`
  height: 600px;
  ${styleMixin.Column()}
`;

const CoverLetterControllers = styled.div`
  svg {
    font-size: 50px;
    margin-bottom: 30px;
    cursor: pointer;
  }
`;

const ListHeader = styled.div`
  text-align: center;
  width: 100%;
  font-size: 30px;
  font-weight: bold;
  background-color: #302e2e;
  padding: ${V.xsPadding};
  border-radius: 5px;
  box-shadow: ${V.boxShadow2};
`;

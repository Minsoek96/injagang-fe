import { Suspense } from 'react';

import { useRouter } from 'next/router';

import { BiPlus } from 'react-icons/bi';

import styled from 'styled-components';

import { styleMixin, V } from '@/src/shared/styles';
import { Container, MainButton, Spinner } from '@/src/shared/ui';

import CoverLetterGuide from '@/src/features/coverletter/preview/CoverLetterGuide';
import CoverLetterList from './CoverLetterList';
import CoverLetterPreView from './CoverLetterPreView';

/** 유저 자소서 선택 페이지 */
function CoverLetter() {
  const router = useRouter();
  const headerTitle = '나의 자기소개서 목록';
  const moveCreationPage = '/coverLetter/new';

  return (
    <>
      <ListHeader>
        <HeaderTitle>{headerTitle}</HeaderTitle>
        <MainButton
          onClick={() => router.push(moveCreationPage)}
          label={(
            <>
              <BiPlus />
              {' '}
              새로 작성하기
            </>
          )}
          variant="ghost"
          sx={{ fontSize: '1.8rem', color: 'black' }}
        />
      </ListHeader>
      <CoverLetterContainer>
        <Suspense fallback={<Spinner />}>
          <CoverLetterList />
        </Suspense>
        <CoverLetterPreView />
        <CoverLetterGuide />
      </CoverLetterContainer>
    </>
  );
}

export default CoverLetter;

const CoverLetterContainer = styled(Container.ItemBase)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  width: 100%;
  color: ${(props) => props.theme.colors.text};
  height: 100%;

  @media screen and (max-width: ${V.mediaTablet}) {
    ${styleMixin.Column('flex-start', 'flex-start')}
    gap:1rem;
  }
`;

const ListHeader = styled.div`
  ${styleMixin.Flex('space-between')}
  margin-bottom: 1.5rem;
  text-align: start;
  width: 100%;
  background-color: ${(props) => props.theme.colors.highlightColor};
  padding: 1.8rem 1.25rem;
  border-radius: 0.5rem;
  position: relative;
  letter-spacing: -0.02em;

  @media screen and (max-width: ${V.mediaMobile}) {
    padding: 0.8rem 0.5rem;
  }
`;

const HeaderTitle = styled.p`
  font-size: 2.5rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.signatureText};

  @media screen and (max-width: ${V.mediaMobile}) {
    font-size: 1.8rem;
  }
`;

import { Suspense } from 'react';

import { useRouter } from 'next/router';

import { BiPlus } from 'react-icons/bi';

import styled from 'styled-components';

import { styleMixin, V } from '@/src/shared/styles';
import { Container, HideSvg, Spinner } from '@/src/shared/ui';

import CoverLetterList from './CoverLetterList';
import CoverLetterPreView from './CoverLetterPreView';

/** 유저 자소서 선택 페이지 */
function CoverLetter() {
  const router = useRouter();
  const headerTitle = '나의 자소서 목록';
  const moveCreationPage = '/coverLetter/new';

  return (
    <CoverLetterContainer>
      <ListHeader>{headerTitle}</ListHeader>
      <CoverLetterPreView />
      <Suspense fallback={<Spinner />}>
        <CoverLetterList />
      </Suspense>
      <HideSvg
        onClick={() => router.push(moveCreationPage)}
        label="자소서 작성하기"
        Logo={<BiPlus />}
        sx={{ fontSize: '4rem' }}
      />
    </CoverLetterContainer>
  );
}

export default CoverLetter;

const CoverLetterContainer = styled(Container.ItemBase)`
  ${styleMixin.Column('flex-start')}
  max-width: 100%;
  color: ${(props) => props.theme.colors.text};
  height: 100%;
`;

const ListHeader = styled.div`
  text-align: center;
  width: 100%;
  font-size: 2.5rem;
  opacity: 0.8;
  font-weight: bold;
  background-color: ${(props) => props.theme.colors.primary};
  padding: ${V.smPadding};
  border-radius: 5px;
  box-shadow: ${V.boxShadow1};

  @media screen and (max-width: ${V.mediaMobile}) {
    font-size: 2rem;
  }
`;

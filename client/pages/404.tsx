import { NextPage } from 'next';

import styled from 'styled-components';

import Link from 'next/link';

import { styleMixin, V } from '@/src/shared/styles';

import sorryScreen from '@/public/assets/sorryghost.webp';
import Image from 'next/image';

const TITLE = {
  main: '404-Page Not Found',
  sub: '찾으시는 페이지는 존재하지 않습니다.',
  link: '홈 화면',
};

const Custom404: NextPage = function Custom404() {
  return (
    <Container>
      <Image
        src={sorryScreen}
        alt="sorry"
        width={300}
        height={300}
        placeholder="blur"
      />
      <TextWrapper>
        <Title>{TITLE.main}</Title>
        <p>{TITLE.sub}</p>
        <StyledLink href="/">{TITLE.link}</StyledLink>
      </TextWrapper>
    </Container>
  );
};

export default Custom404;

const Container = styled.div`
  ${styleMixin.Flex('center', 'center')}
  width: 100%;
  height: 100vh;

  @media screen and (max-width: ${V.mediaMobile}) {
    ${styleMixin.Column('flex-start', 'center')}
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const StyledLink = styled(Link)`
  font-size: 2rem;
  margin-top: 12px;
  color: red;
`;

const TextWrapper = styled.div`
  ${styleMixin.Column('center', 'center')}
`;

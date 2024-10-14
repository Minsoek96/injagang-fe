import { Container } from '@/src/shared/ui';

import { styleMixin, V } from '@/src/shared/styles';

import styled from 'styled-components';

export const S = {
  MainContainer: styled(Container.ArticleCard)`
    ${styleMixin.Column()}
    width: 100%;
    height: 100%;
    border-radius: 0.8rem;
    padding: 2em 1em;
  `,

  MainTitle: styled.h1`
    text-align: center;
    width: 100%;
    border-radius: 0.5rem;
    font-size: 2.5rem;
    border-left: 0.2em solid ${(props) => props.theme.colors.signatureColor};
    border-right: 0.2em solid ${(props) => props.theme.colors.signatureColor};
    margin-bottom: 2rem;

    @media screen and (max-width: ${V.mediaMobile}) {
      display: none;
    }
  `,

  Warring: styled.p`
    color: red;
    margin-bottom: 1rem;
  `,

  Form: styled.form`
    width: 100%;
  `,
};

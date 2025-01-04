import { bounce, styleMixin, V } from '@/src/shared/styles';

import styled from 'styled-components';

const S = {
  container: styled.div`
    ${styleMixin.Column()}
    gap: 2rem;
    padding: 3rem;
    text-align: center;
    min-width: 40rem;
    max-width: 50rem;
    margin: 0 auto;
    border-radius: 12px;
    box-shadow: ${V.boxShadow3};
    background-color: ${(props) => props.theme.colors.primary};
  `,

  iconWrapper: styled.div`
    animation: ${bounce} 2s ease infinite;
  `,

  messageContainer: styled.div`
    ${styleMixin.Column()}
    gap: 0.75rem;
  `,

  errorTitle: styled.h2`
    margin: 0;
    font-size: 1.8rem;
    font-weight: 600;
  `,

  errorMessage: styled.p`
    margin: 0;
    font-size: 1.4rem;
  `,

  buttonContainer: styled.div`
    ${styleMixin.Flex()}
    gap: 1rem;
    width: 100%;

    button {
      min-width: 160px;
    }
  `,
};

export {
  S,
};

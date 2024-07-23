import { styled } from 'styled-components';

import { V } from '@/src/shared/styles';

export const BaseInput = styled.input`
  width: ${V.lgItemWidth};
  height: 40px;
  border-radius: 5px;
  border-color: black;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0px 1px 0.5px rgba(0, 0, 0, 09);
  margin-bottom: 15px;
  @media screen and (max-width: 900px) {
    width: ${V.smItemWidth};
  }
`;

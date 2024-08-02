import { styled } from 'styled-components';

import { V } from '@/src/shared/styles';

export const BaseInput = styled.input`
  height: 40px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 15px;
  @media screen and (max-width: 900px) {
    width: ${V.smItemWidth};
  }
`;

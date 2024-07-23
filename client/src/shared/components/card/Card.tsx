import { styleMixin } from '@/src/shared/styles';

import { styled } from 'styled-components';

interface CardProps {
    $size: {
      width: string;
      height: string;
      flex?: string;
    };
  }

export const BaseCard = styled.div<CardProps>`
  ${({ $size }) =>
    ($size.flex === 'row' ? styleMixin.Flex() : styleMixin.Column())};
  padding: 15px 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  width: ${({ $size }) => $size.width || '100%'};
  height: ${({ $size }) => $size.height || '100%'};
  border-radius: 8px;
  box-shadow: 1px 2px 12px rgba(0, 0, 0, 0.6);
`;

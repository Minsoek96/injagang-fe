import { styleMixin, V } from '@/src/shared/styles';

import { styled } from 'styled-components';

interface CardProps {
    $size: {
      width: string;
      height: string;
      flex?: string;
    };
  }

// TODO 정리하기
export const BaseCard = styled.article<CardProps>`
  ${({ $size }) =>
    ($size.flex === 'row' ? styleMixin.Flex() : styleMixin.Column())};
  padding: 1em;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  width: ${({ $size }) => $size.width || '100%'};
  height: ${({ $size }) => $size.height || '100%'};
  border-radius: 8px;
  box-shadow: 1px 2px 12px rgba(0, 0, 0, 0.6);

 @media screen and (max-width: ${V.mediaMobile}){
  height: 50rem;
  /* background-color: ${({ theme }) => theme.colors.bodyColor}; */
  /* box-shadow: none; */
 }
`;

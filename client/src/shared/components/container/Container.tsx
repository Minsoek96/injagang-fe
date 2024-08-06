import styled from 'styled-components';

import { V, styleMixin } from '@/src/shared/styles';

const ItemBase = styled.section`
    width:${V.mdBoxWidth};

    @media screen and (max-width: ${V.mediaMobile}){
        min-width: ${V.smBoxWidth};
        width: 100%;
    }
`;

interface CardProps {
  $size: {
    width: string;
    height: string;
    flex?: string;
    isMedia?: boolean;
  };
}

const ArticleCard = styled.article<CardProps>`
${({ $size }) =>
    ($size.flex === 'row' ? styleMixin.Flex() : styleMixin.Column())};
padding: 1em;
color: ${({ theme }) => theme.colors.text};
width: ${({ $size }) => $size.width || '100%'};
height: ${({ $size }) => $size.height || '100%'};
max-height: ${V.lgHeight};
border-radius: 8px;
border: .2rem solid ${(props) => props.theme.colors.mainLine};

@media screen and (max-width: ${V.mediaMobile}){
max-height: ${({ $size }) => ($size.isMedia ? '100%' : '50rem')}
}
`;

export {
  ItemBase,
  ArticleCard,
};

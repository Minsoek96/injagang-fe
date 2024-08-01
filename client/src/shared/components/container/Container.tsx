import styled from 'styled-components';

import { V } from '@/src/shared/styles';

const ItemBase = styled.section`
    width:${V.mdBoxWidth};

    @media screen and (max-width: ${V.mediaMobile}){
        min-width: ${V.smBoxWidth};
        width: 100%;
    }
`;

export {
  ItemBase,
};

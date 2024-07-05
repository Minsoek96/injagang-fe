import { Suspense } from 'react';

import styled from 'styled-components';

import { ColBox } from '@/styles/GlobalStyle';

import Spinner from '@/components/Spinner';
import AddTemplate from './AddTemplate';
import TemplateDetail from './TemplateDetail';

import useTemplateStoreManager from '../../hooks/useTemplateStoreManager';

function TemplateViewController() {
  const { isAddTemplate, setIsAddTemplate } = useTemplateStoreManager();
  return (
    <TemplateViewStyle>
      {isAddTemplate ? (
        <AddTemplate onClose={setIsAddTemplate} />
      ) : (
        <Suspense fallback={<Spinner />}>
          <TemplateDetail />
        </Suspense>
      )}
    </TemplateViewStyle>
  );
}

export default TemplateViewController;

const TemplateViewStyle = styled.div`
  ${ColBox}
  justify-content: space-between;
  width: 95%;
  height: 100%;
  .endTitle {
    ${ColBox}
    justify-content: center;
    height: 100%;
  }
  svg {
    margin-top: 10px;
    font-size: 30px;
    cursor: pointer;
  }
  svg:hover {
    color: red;
  }
  @media screen and (max-width: 800px) {
    width: 100%;
    height: 50%;
  }
`;

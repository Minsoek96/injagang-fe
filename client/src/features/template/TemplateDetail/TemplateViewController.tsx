import { Suspense } from 'react';

import styled from 'styled-components';

import { styleMixin } from '@/src/shared/styles';
import { Spinner } from '@/src/shared/ui/spinner';
import AddTemplate from '../AddTemplate/AddTemplate';
import TemplateDetail from './TemplateDetail';

import useTemplateStoreManager from '../hooks/useTemplateStoreManager';

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
  ${styleMixin.Column()}
  justify-content: space-between;
  width: 100%;
  height: 100%;

  svg {
    margin-top: 10px;
    font-size: 30px;
    cursor: pointer;
  }
  svg:hover {
    color: red;
  }
`;

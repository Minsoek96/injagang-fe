import { Suspense } from 'react';

import styled from 'styled-components';

import { styleMixin } from '@/src/shared/styles';
import { Spinner } from '@/src/shared/ui/spinner';
import { useTemplateStore } from '@/src/entities/template';

import { CreateTemplate, TemplateDetail } from '@/src/features/template';

function TemplateModeChanger() {
  const { setAddTemplateToggle, isAddTemplate } = useTemplateStore();

  return (
    <TemplateViewStyle>
      {isAddTemplate ? (
        <CreateTemplate onClose={setAddTemplateToggle} />
      ) : (
        <Suspense fallback={<Spinner />}>
          <TemplateDetail />
        </Suspense>
      )}
    </TemplateViewStyle>
  );
}

export default TemplateModeChanger;

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

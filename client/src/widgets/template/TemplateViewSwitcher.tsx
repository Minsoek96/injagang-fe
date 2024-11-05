import { Suspense } from 'react';

import styled from 'styled-components';

import { styleMixin } from '@/src/shared/styles';
import { Spinner } from '@/src/shared/ui/spinner';
import { useTemplateStore } from '@/src/entities/template';

import { CreateTemplate, TemplateDetail } from '@/src/features/template';

function TemplateViewSwitcher() {
  const { setAddTemplateToggle, isAddTemplate } = useTemplateStore();

  return (
    <Container>
      {isAddTemplate ? (
        <CreateTemplate onClose={setAddTemplateToggle} />
      ) : (
        <Suspense fallback={<Spinner />}>
          <TemplateDetail />
        </Suspense>
      )}
    </Container>
  );
}

export default TemplateViewSwitcher;

const Container = styled.div`
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

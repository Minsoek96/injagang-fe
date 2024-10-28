import { Suspense } from 'react';

import styled from 'styled-components';

import { styleMixin } from '@/src/shared/styles';
import { Spinner } from '@/src/shared/ui/spinner';
import { templateMutations, templateType, useTemplateStore } from '@/src/entities/template';

import AddTemplate from '../AddTemplate/AddTemplate';
import TemplateDetail from './TemplateDetail';

function TemplateViewController() {
  const { setAddTemplateToggle, isAddTemplate } = useTemplateStore();
  const { mutate: addTemplate } = templateMutations.useAddTemplate();

  const onSubmit = (data: templateType.IAddFormTemplate) => {
    const formatData:templateType.IAddTemplate = {
      title: data.title,
      questions: data.questions.map((item) => item.question),
    };
    addTemplate(formatData);
    setAddTemplateToggle(false);
  };

  return (
    <TemplateViewStyle>
      {isAddTemplate ? (
        <AddTemplate onClose={setAddTemplateToggle} onSubmit={onSubmit} />
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

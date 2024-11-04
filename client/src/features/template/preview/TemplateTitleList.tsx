import styled from 'styled-components';

import { BiPlus } from 'react-icons/bi';

import { templateQueries, useTemplateStore } from '@/src/entities/template';

import { styleMixin } from '@/src/shared/styles';
import { HideSvg } from '@/src/shared/ui';

import TemplateItem from './TemplateTitleItem';

function TemplateTitleList() {
  const { data: templateList } = templateQueries.useFetchTemplate();

  const { isAddTemplate, setAddTemplateToggle } = useTemplateStore();

  return (
    <TemplateTtileContainer>
      {templateList?.map((item) => (
        <TemplateItem key={item.templateId} list={item} />
      ))}
      {!isAddTemplate && (
        <HideSvg
          Logo={<BiPlus />}
          label="템플릿 추가"
          onClick={() => setAddTemplateToggle(true)}
        />
      )}
    </TemplateTtileContainer>
  );
}

export default TemplateTitleList;

const TemplateTtileContainer = styled.div`
  ${styleMixin.Column()}
  svg {
    margin-top: 1.5rem;
    font-size: 3.5rem;
  }
  svg:hover {
    color: red;
  }
`;

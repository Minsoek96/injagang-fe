import styled from 'styled-components';
import { styleMixin } from '@/src/shared/styles';
import { BiPlus } from 'react-icons/bi';

import { templateQueries } from '@/src/entities/template';
import { HideSvg } from '@/src/shared/ui';
import TemplateItem from './TemplateTitleItem';

import useTemplateStoreManager from '../hooks/useTemplateStoreManager';

function TemplateTitleList() {
  const { data: templateList } = templateQueries.useFetchTemplate();

  const { isAddTemplate, setIsAddTemplate } = useTemplateStoreManager();

  return (
    <TemplateTtileContainer>
      {templateList?.map((item) => (
        <TemplateItem key={item.templateId} list={item} />
      ))}
      {!isAddTemplate && (
        <HideSvg
          Logo={<BiPlus />}
          label="템플릿 추가"
          onClick={() => setIsAddTemplate(true)}
        />
      )}
    </TemplateTtileContainer>
  );
}

export default TemplateTitleList;

const TemplateTtileContainer = styled.div`
  ${styleMixin.Column()}
  svg {
    margin-top: 10px;
    font-size: 35px;
    cursor: pointer;
  }
  svg:hover {
    color: red;
  }
`;

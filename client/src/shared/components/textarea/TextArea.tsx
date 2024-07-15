import { styleMixin } from '@/src/shared/styles';

import { styled } from 'styled-components';

export const BaseArea = styled.textarea`
  ${styleMixin.Flex()}
  resize: vertical;
  box-sizing: border-box;
  color: #22272e;
  background-color: white;
  font-weight: bold;
  width: 100%;
  height: 100%;
  line-height: 1.5;
  padding: 10px 15px;
  border-radius: 5px;
  overflow-y: auto;
  margin: 15px auto;
`;

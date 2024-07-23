import styled from 'styled-components';

import V from '@/src/shared/styles/variables';

// TODO :: 제거
export const BaseTitle = styled.div`
  text-align: center;
  background-color: "#151618";
  box-shadow: 1px 2px 12px rgba(0, 0, 0, 0.4);
  font-weight: bold;
  font-size: 1.8rem;
  width: ${V.xlItemWidth};
  border-radius: 8px;
  padding: 8px 20px;
  margin-bottom: 11px;

  @media screen and (max-width: 900px) {
    width: ${V.smItemWidth};
  }
`;

import styled, { keyframes } from 'styled-components';

import { BsArrowDown } from 'react-icons/bs';
import { styleMixin } from '@/src/shared/styles';

function ArrowDown() {
  return (
    <ArrowContainer>
      <BsArrowDown />
    </ArrowContainer>
  );
}

export default ArrowDown;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
`;

const ArrowContainer = styled.div`
  ${styleMixin.Flex()};
  margin-top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  animation: ${bounce} 2s infinite;
  opacity: 0.8;
  svg {
    font-size: 3.5rem;
  }
`;

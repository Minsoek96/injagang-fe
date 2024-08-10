import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { MdCallMade } from 'react-icons/md';

import { bounce } from '@/src/shared/styles';

interface ArrowAnimationProps {
  targetId: string;
  guideText: string;
}

function ArrowAnimation({ targetId, guideText }: ArrowAnimationProps) {
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    const updatePosition = () => {
      const targetElement = document.querySelector(`.${targetId}`);
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        setPosition({
          top: rect.bottom,
          left: rect.left,
        });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, [targetId]);

  return (
    <Arrow
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
      }}
    >
      <MdCallMade />
      <p>{guideText}</p>
    </Arrow>
  );
}

export default ArrowAnimation;

const Arrow = styled.div`
  font-size: 50px;
  color: red;
  animation: ${bounce} 2s infinite;
  font-family: "Oswald", sans-serif;
  p {
    font-size: 30px;
  }
`;

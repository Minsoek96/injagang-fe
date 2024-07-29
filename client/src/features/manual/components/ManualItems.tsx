import { memo, useState } from 'react';

import { StaticImageData } from 'next/image';

import styled, { keyframes, css } from 'styled-components';

import { ArrowDown } from '@/src/shared/components/arrow';

import { useSectionObserver } from '@/src/shared/hooks';

import { keys } from '@/src/shared/utils';

import ImageItem from './ImageItem';

interface MnualItemsProps {
  mainTitle: string;
  subTitle: string;
  isArrow: boolean;
  imageList: StaticImageData[];
}

function ManualItems({
  mainTitle,
  subTitle,
  isArrow,
  imageList,
}: MnualItemsProps) {
  const [isShow, setIsShow] = useState<boolean>(false);
  const { targetItemRef } = useSectionObserver(() => {
    !isShow && setIsShow(true);
  }, 0.5);
  return (
    <BannerContainer ref={targetItemRef} $isShow={isShow}>
      <MainTitle $isShow={isShow}>{mainTitle}</MainTitle>
      <SubTitle $isShow={isShow}>{subTitle}</SubTitle>
      {imageList.map((image, index) => (
        <ItemContainer key={keys(image.src, index)}>
          <ImageItem image={image} />
          {isArrow && <ArrowDown />}
        </ItemContainer>
      ))}
    </BannerContainer>
  );
}

export default memo(ManualItems);

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
const fadeInUpOpacity = css<{ $isShow: boolean }>`
  opacity: 0;
  animation: ${(props) =>
    (props.$isShow
      ? css`
          ${fadeInUp} 0.5s ease forwards
        `
      : 'none')};
`;

const BannerContainer = styled.div<{ $isShow: boolean }>`
  will-change: transform, opacity;
  height: 100vh;
  display: ${({ $isShow }) => ($isShow ? 'flex' : 'visibilty')};
  flex-direction: column;
  align-items: center;
  ${fadeInUpOpacity}
`;

const MainTitle = styled.h2<{ $isShow: boolean }>`
  font-size: 3.5rem;
  ${fadeInUpOpacity}
  animation-delay: 0.2s;
`;

const SubTitle = styled.h3<{ $isShow: boolean }>`
  margin-top: 0.5em;
  font-size: 2.5rem;
  ${fadeInUpOpacity}
  animation-delay: 0.4s;
`;

const ItemContainer = styled.div`
  width: 100%;
`;

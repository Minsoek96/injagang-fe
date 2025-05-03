import { keys } from '@/src/shared/utils';
import Image, { StaticImageData } from 'next/image';

import { styled } from 'styled-components';

type Props = {
    imageList: StaticImageData[]
}

export default function Images({ imageList }:Props) {
  return (
    <ImageContainer>
      {imageList?.map((image, index) => (
        <Image
          key={keys(String(image), index)}
          src={image}
          alt={`${image}-${index}`}
          quality={100}
          placeholder="blur"
          priority={index === 0}
        />
      ))}
    </ImageContainer>
  );
}

const ImageContainer = styled.div`
  border-radius: 0.8em;

  img {
    margin-bottom: 2rem;
    object-fit: contain;
    border-radius: 0.8em;
    max-width: 100%;
    height: auto;
    max-height: 50rem;
  }
`;

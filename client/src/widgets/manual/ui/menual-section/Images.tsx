import Image, { StaticImageData } from 'next/image';

import { styled } from 'styled-components';

import { v4 as uuid4 } from 'uuid';

type Props = {
    imageList: StaticImageData[]
}

export default function Images({ imageList }:Props) {
  return (
    <ImageContainer>
      {imageList?.map((image, index) => (
        <Image
          key={uuid4()}
          src={image}
          alt={`${image}-${index}`}
          quality={100}
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
    border: 0.5px solid ${(props) => props.theme.colors.text};
    object-fit: contain;
    border-radius: 0.8em;
    max-width: 100%;
    height: auto;
  }
`;

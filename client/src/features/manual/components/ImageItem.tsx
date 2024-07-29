import { styled } from 'styled-components';
import Image, { StaticImageData } from 'next/image';

type ImageItemProps = {
    image: StaticImageData
}

export default function ImageItem({ image }:ImageItemProps) {
  return (
    <ImageContainer>
      <Image
        src={image}
        alt="Interview Image"
        placeholder="blur"
        fill
        style={{ objectFit: 'fill' }}
        quality={100}
      />
    </ImageContainer>
  );
}

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-top: 3rem;
  width: 70rem;
  height: 60rem;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  @media screen and (max-width: 600px) {
    width: 100%;
  }
  `;

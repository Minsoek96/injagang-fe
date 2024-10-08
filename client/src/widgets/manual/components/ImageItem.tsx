import { styled } from 'styled-components';
import Image, { StaticImageData } from 'next/image';
import { V } from '@/src/shared/styles';

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
  padding: 1em;
  border-radius: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-top: 3rem;
  width: 100%;
  height: 60rem;
  min-height: 30rem;

  @media screen and (max-width: ${V.mediaMobile}){
    height: 100%;
  }
  `;

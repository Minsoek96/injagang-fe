import { StaticImageData } from 'next/image';

type ManualData = {
    id: string;
    main: string;
    sub: string;
    imageList: StaticImageData[];
  }

export type {
  ManualData,
};

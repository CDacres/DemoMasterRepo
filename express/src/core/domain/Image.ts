import { Ref, WithWorker } from '@src/core';
import { Tag } from './Tag';
import { VenueImageTypes } from './ImageType';

export interface Image {
  id: Ref;
  tags: Tag[];
  type: VenueImageTypes;
  urls: ImageUrls;
  downloadLink?: string;
}

export interface ImageUrls {
  largeUrl?: string;
  originalUrl?: string;
  thumbUrl?: string;
}

export enum ImageSize {
  BANNER = 'BANNER',
  HUGE = 'HUGE',
  LARGE = 'LARGE',
  MEDIUM = 'MEDIUM',
  SMALL = 'SMALL',
}

export type ImageRef = Image & WithWorker;

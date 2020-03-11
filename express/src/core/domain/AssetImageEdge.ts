import { Int, Ref } from '@src/core';
import { Image } from './Image';

export type AssetImageEdge = {
  description?: string;
  image: Image;
  orderIndex: Int;
};

export type AssetImageEdgeInput = {
  description?: string;
  imageId: Ref;
  orderIndex: Int;
};

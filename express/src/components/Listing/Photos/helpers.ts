import { ImageFilter } from '@src/components/Listing/Photos/filter';

type Size = {
  height: number;
  width: number;
};

export type Offset = {
  x: number;
  y: number;
};

type Area = Offset & Size;

type NaturalSize = {
  naturalHeight: number;
  naturalWidth: number;
} & Size;

export type CropInfo = {
  percent: Area;
  pixels: Area;
};

export const getCropSize = (width: number, height: number, aspect: number): Size => {
  if (width >= height * aspect) {
    return {
      height: height,
      width: height * aspect,
    };
  }
  return {
    height: width / aspect,
    width: width,
  };
};

/**
 * Ensure a new image position stays in the crop area.
 */
export const restrictPosition = (
  position: Offset,
  imageSize: Size,
  cropSize: Size,
  zoom: number): Offset => {

  const restrictPositionCoord = (
    coordPosition: number,
    coordImageSize: number,
    coordCropSize: number,
    coordZoom: number): number => {

    const maxPosition = (coordImageSize * coordZoom) / 2 - coordCropSize / 2;
    return Math.min(maxPosition, Math.max(coordPosition, -maxPosition));
  };

  return {
    x: restrictPositionCoord(position.x, imageSize.width, cropSize.width, zoom),
    y: restrictPositionCoord(position.y, imageSize.height, cropSize.height, zoom),
  };
};

export const getDistance = (a: Offset, b: Offset): number => {
  return Math.sqrt(Math.pow(a.y - b.y, 2) + Math.pow(a.x - b.x, 2));
};

/**
 * Compute the output cropped area of the image in percentages and pixels.
 * x/y are the top-left coordinates on the src image
 */
export const computeCropInfo = (crop: Offset, imgSize: NaturalSize, cropSize: Size, zoom: number): CropInfo => {
  const percent = {
    x: limitArea(
      100,
      (((imgSize.width - cropSize.width / zoom) / 2 - crop.x / zoom) / imgSize.width) * 100
    ),
    y: limitArea(
      100,
      (((imgSize.height - cropSize.height / zoom) / 2 - crop.y / zoom) / imgSize.height) * 100
    ),
    width: limitArea(100, ((cropSize.width / imgSize.width) * 100) / zoom),
    height: limitArea(100, ((cropSize.height / imgSize.height) * 100) / zoom),
  };
  const pixels = {
    x: limitArea(imgSize.naturalWidth, (percent.x * imgSize.naturalWidth) / 100),
    y: limitArea(imgSize.naturalHeight, (percent.y * imgSize.naturalHeight) / 100),
    width: limitArea(
      imgSize.naturalWidth,
      (percent.width * imgSize.naturalWidth) / 100
    ),
    height: limitArea(
      imgSize.naturalHeight,
      (percent.height * imgSize.naturalHeight) / 100
    ),
  };
  return { percent, pixels };
};

/**
 * Ensure the returned value is between 0 and max
 */
function limitArea(max: number, value: number): number {
  return Math.min(max, Math.max(0, value));
}

/**
 * Return the point that is the center of point a and b
 */
export function getCenter(a: Offset, b: Offset) {
  return {
    x: (b.x + a.x) / 2,
    y: (b.y + a.y) / 2,
  };
}

const loadImage = (url: string): Promise<CanvasImageSource> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    // image.crossOrigin = "";
    image.onload = () => resolve(image);
    image.onerror = () => reject(image);
    image.src = url;
  });

type ProcessImageOptions = {
  contentType?: string;
  crop?: Area;
  filters?: ImageFilter[];
  src: string;
};

export const processImage = async ({
  src,
  crop,
  filters,
  contentType = 'image/jpeg' }: ProcessImageOptions) => {

  const image = await loadImage(src);
  const canvas = document.createElement('canvas');
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext('2d');

  const s: Area = crop || { x: 0, y: 0, width: image.width as number, height: image.height as number };
  const d: Area = crop && { x: 0, y: 0, width: crop.width, height: crop.height } || s;

  ctx.drawImage(
    image,
    s.x, s.y, s.width, s.height,
    d.x, d.x, d.width, d.height
  );

  // apply filters
  if (filters && filters.length > 0) {
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    filters.forEach(f => f(img));
    ctx.putImageData(img, 0, 0);
  }

  // As Base64 string sync
  return canvas.toDataURL(contentType);

  // As a blob using async
  // return new Promise((resolve, reject) => {
  //   canvas.toBlob(file => {
  //     resolve(URL.createObjectURL(file))
  //   }, 'image/jpeg')
  // })
};

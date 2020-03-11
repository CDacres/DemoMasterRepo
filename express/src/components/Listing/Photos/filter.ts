const filter = (img: ImageData, m: number[]) => {
  const arr = img.data;
  for (let i = 0; i < arr.length; i += 4) {
    const r = arr[i + 0];
    const g = arr[i + 1];
    const b = arr[i + 2];
    const a = arr[i + 3];

    arr[i + 0] = r * m[0] + g * m[1] + b * m[2] + a * m[3] + m[4];
    arr[i + 1] = r * m[5] + g * m[6] + b * m[7] + a * m[8] + m[9];
    arr[i + 2] = r * m[10] + g * m[11] + b * m[12] + a * m[13] + m[14];
    arr[i + 3] = r * m[15] + g * m[16] + b * m[17] + a * m[18] + m[19];
  }
};

export const expose = (img: ImageData, e: number) =>
  filter(img, [
    e, 0, 0, 0, 0,
    0, e, 0, 0, 0,
    0, 0, e, 0, 0,
    0, 0, 0, 1, 0]);

export type ImageFilter = (img: ImageData) => void;

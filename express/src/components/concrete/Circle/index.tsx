import * as React from 'react';
import { css } from 'aphrodite/no-important';

type Props = {
  height: string;
  stylesArray: object[];
  text: string;
  width: string;
};

const Circle = ({ height, stylesArray, text, width }: Props) => (
  <div
    className={css(stylesArray)}
    style={{
      height: `${height}`,
      lineHeight: `${height}`,
      width: `${width}`,
    }}
  >
    {text}
  </div>
);

export default Circle;

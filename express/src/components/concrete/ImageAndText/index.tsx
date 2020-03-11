import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { pagestyles } from '@src/styles';

type Props = {
  imageComponent: JSX.Element;
  textComponent: JSX.Element;
};

const ImageAndText = ({ imageComponent, textComponent }: Props) => (
  <div className={css(pagestyles.relativePosition)}>
    <div className={css(styles.leftAbsolute)}>
      {imageComponent}
    </div>
    <div className={css(styles.innerPad)}>
      <div className={css(styles.rightAbsolute)}>
        {textComponent}
      </div>
    </div>
  </div>
);

export default ImageAndText;

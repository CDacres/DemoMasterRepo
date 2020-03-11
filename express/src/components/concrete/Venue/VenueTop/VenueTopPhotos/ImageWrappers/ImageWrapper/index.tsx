import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import wrapperStyles from '../styles';

// Components
import Button from '@src/components/concrete/Button';

type Props = {
  src: string;
};

const ImageWrapper = ({ src }: Props) => (
  <Button stylesArray={[styles.imgButton]}>
    <div className={css(wrapperStyles.imgContainer)}>
      <div className={css(wrapperStyles.imgInner)}>
        <img
          className={css(wrapperStyles.imgContent)}
          src={src}
        />
        <div className={css(wrapperStyles.backgroundImageWrapper)} />
      </div>
    </div>
  </Button>
);

export default ImageWrapper;

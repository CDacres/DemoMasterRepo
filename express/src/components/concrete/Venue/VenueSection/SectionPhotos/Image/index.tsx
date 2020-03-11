/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

type Props = {
  isSmallImage: boolean;
  isFirstImage: boolean;
  src: string;
};

const Image = ({ isFirstImage, isSmallImage, src }: Props) => (
  <div className={css(pagestyles.column, pagestyles.columnFloat, padding.leftright_1, isFirstImage ? [pagestyles.fullColumn, pagestyles.halfColumnSmallScreen] : pagestyles.halfColumn, isSmallImage ? pagestyles.thirdColumnSmallScreen : null)}>
    <div className={css(margin.bottom_2)}>
      <button className={css(styles.button, margin.topbottom_0, padding.all_0)}>
        <div className={css(styles.container)}>
          <div className={css(styles.inner)}>
            <img
              className={css(styles.img)}
              src={src}
            />
            <div className={css(styles.content)} />
          </div>
        </div>
      </button>
    </div>
  </div>
);

export default Image;

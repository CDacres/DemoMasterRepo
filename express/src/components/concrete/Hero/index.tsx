import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { padding, pagestyles } from '@src/styles';

type Props = {
  backgroundImage: string;
  children: JSX.Element[];
};

const Hero = ({ backgroundImage, children }: Props) => (
  <div className={css(styles.heroOuter)}>
    <div className={css(styles.heroInner, padding.leftright_1_5)}>
      <div
        className={css(styles.heroBackground)}
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />
      <div className={css(styles.heroBackgroundPush)} />
      <div className={css(pagestyles.relativePosition)}>
        <div className={css(styles.heroPush)}>
          <div className={css(styles.heroContent)}>
            {children}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Hero;

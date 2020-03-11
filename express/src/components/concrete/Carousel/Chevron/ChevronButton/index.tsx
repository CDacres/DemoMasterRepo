/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { pagestyles } from '@src/styles';

// Components
import { Chevron } from '@src/components/concrete/Icons/svgs';
import Button from '@src/components/concrete/Button';

type Props = {
  adjustedTop: boolean;
  direction: string;
  large: boolean;
  onClick: (direction: string) => void;
};

const ChevronButton = ({ adjustedTop, direction, large, onClick }: Props) => (
  <div
    className={css(styles.chevronContainer)}
    style={{ [direction]: '-16px' }}
  >
    <span className={css(adjustedTop ? styles.adjustedTop : [styles.chevronButtonSpan, large ? styles.chevronLarge : styles.chevronSmall])}>
      <Button
        action={() => onClick(direction)}
        aria-busy="false"
        stylesArray={[styles.chevronButton]}
      >
        <span className={css(styles.chevronEnc)}>
          <Chevron
            direction={direction}
            stylesArray={[pagestyles.icon, pagestyles.icon10]}
          />
        </span>
      </Button>
    </span>
  </div>
);

export default ChevronButton;

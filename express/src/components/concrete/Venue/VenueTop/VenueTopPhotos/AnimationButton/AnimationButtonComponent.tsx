import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { padding, pagestyles } from '@src/styles';

// Components
import { Pause, Play } from '@src/components/concrete/Icons/svgs';
import Button from '@src/components/concrete/Button';

type Props = {
  handleClick: () => void;
  play: boolean;
};

const AnimationButtonComponent = ({ handleClick, play }: Props) => (
  <div className={css(styles.animationIcon)}>
    <div className={css(pagestyles.fullColumn, pagestyles.tableCellBottom)} />
    <div className={css(pagestyles.tableCellBottom)}>
      <div className={css(styles.iconContainer)}>
        <div className={css(styles.iconInner)}>
          <Button
            action={handleClick}
            stylesArray={[styles.iconButton, padding.all_1_5]}
          >
            {play ? (
              <Play stylesArray={[styles.icon, pagestyles.icon15]} />
            ) : (
              <Pause stylesArray={[styles.icon, pagestyles.icon15]} />
            )}
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default AnimationButtonComponent;

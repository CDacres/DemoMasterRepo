import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import { Close, Globe } from '@src/components/concrete/Icons/svgs';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import Button from '@src/components/concrete/Button';

type Props = {
  isShowing: boolean;
  onClick: () => void;
};

const SquashedToggleButtonContainer = ({ isShowing, onClick }: Props) => (
  <div className={css(styles.footerSquashedToggleContainer)}>
    <Button
      action={onClick}
      aria-busy="false"
      stylesArray={[styles.footerSquashedToggleButton]}
    >
      <span className={css(styles.footerSquashedToggleButtonInner)}>
        <div className={css(styles.table)}>
          <div className={css(pagestyles.tableCellMiddle)}>
            <div className={css(margin.right_1_5)}>
              {isShowing ? (
                <Close stylesArray={[pagestyles.icon, pagestyles.icon15]} />
              ) : (
                <Globe stylesArray={[pagestyles.icon, pagestyles.icon15]} />
              )}
            </div>
          </div>
          <Translatable content={{ transKey: isShowing ? 'common.close' : 'footer.squashed_toggle' }}>
            <div className={css(pagestyles.tableCellMiddle)} />
          </Translatable>
        </div>
      </span>
    </Button>
  </div>
);

export default SquashedToggleButtonContainer;

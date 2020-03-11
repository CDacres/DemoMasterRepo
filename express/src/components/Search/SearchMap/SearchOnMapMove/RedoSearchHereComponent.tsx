import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import { Redo } from '@src/components/concrete/Icons/svgs';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import Button from '@src/components/concrete/Button';

type Props = {
  onClick: () => void;
};

const RedoSearchHereComponent = ({ onClick }: Props) => (
  <div className={css(styles.mapRefreshControls)}>
    <Button
      action={onClick}
      aria-busy="false"
      stylesArray={[styles.redoSearchHereButton]}
    >
      <span className={css(styles.redoSearchHereButtonText)}>
        <div className={css(styles.redoSearchHereButtonTable)}>
          <Translatable content={{ transKey: 'common.redo_search_here' }}>
            <div className={css(pagestyles.tableCellMiddle)} />
          </Translatable>
          <div className={css(pagestyles.tableCellMiddle)}>
            <div className={css(margin.left_1_5)}>
              <Redo stylesArray={[pagestyles.icon, pagestyles.icon15]} />
            </div>
          </div>
        </div>
      </span>
    </Button>
  </div>
);

export default RedoSearchHereComponent;

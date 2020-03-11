import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import Button from '@src/components/concrete/Button';
import { Chevron } from '@src/components/concrete/Icons/svgs';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

// Types
import { ActionLink } from '@src/typings/types';

type Props = {
  text: string;
} & ActionLink;

const ColumnHeaderButton = ({ action, text }: Props) => (
  // TODO: add ordering actions + rotate chevron
  <Button
    action={action}
    stylesArray={[styles.button, pagestyles.row, padding.all_0]}
  >
    <div className={css(styles.wrapper, padding.topbottom_0_5, padding.leftright_1)}>
      <div className={css(styles.container)}>
        <div className={css(styles.inner)}>
          <div>
            <div className={css(pagestyles.smallText, pagestyles.fontMedium, margin.all_0)}>
              <Translatable content={{ transKey: text }}>
                <div />
              </Translatable>
            </div>
          </div>
        </div>
        <div className={css(styles.inner)}>
          <div className={css(margin.left_1)}>
            <div className={css(pagestyles.tableCellMiddle)}>
              <Chevron stylesArray={[pagestyles.icon, pagestyles.icon10, pagestyles.iconBlack]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Button>
);

export default ColumnHeaderButton;

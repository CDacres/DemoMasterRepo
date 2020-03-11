import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import Button from '@src/components/concrete/Button';
import { Chevron } from '@src/components/concrete/Icons/svgs';

// Types
import { ActionLink } from '@src/typings/types';

type Props = {
  children?: JSX.Element | string;
} & ActionLink;

const Select = ({ action, children }: Props) => (
  <div>
    <Button
      action={action}
      stylesArray={[styles.buttonDisplay]}
    >
      <div className={css(margin.leftright_1)}>
        <div className={css(styles.table)}>
          <div className={css(pagestyles.fullColumn, pagestyles.tableCellMiddle)}>
            {children}
          </div>
          <div className={css(pagestyles.tableCellMiddle)}>
            <Chevron stylesArray={[styles.chevron]} />
          </div>
        </div>
      </div>
    </Button>
  </div>
);

export default Select;

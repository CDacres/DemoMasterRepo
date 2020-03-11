/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { padding, pagestyles } from '@src/styles';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const FooterColumn = ({ children }: Props) => (
  <div className={css(styles.column, pagestyles.column, pagestyles.fullColumn, pagestyles.columnFloat, padding.leftright_1)}>
    <section>
      {children}
    </section>
  </div>
);

export default FooterColumn;

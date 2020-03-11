import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { padding, pagestyles } from '@src/styles';

type Props = {
  text: string;
};

const Code = ({ text }: Props) => (
  <div className={css(styles.codeWrapper, pagestyles.tableCell)}>
    <pre className={css(styles.pre)}>
      <code className={css(styles.code, padding.all_0)}>
        {text}
    </code>
  </pre>
</div>
);

export default Code;

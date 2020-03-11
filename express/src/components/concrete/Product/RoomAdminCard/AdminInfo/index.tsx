import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import adminCardStyles from '../styles';
import { margin } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  children?: JSX.Element | JSX.Element[] | string;
  customStyle?: object;
  text?: string;
  transKey: string;
};

const AdminInfo = ({ children, customStyle, text, transKey }: Props) => (
  <div className={css(styles.adminText, margin.bottom_1, customStyle ? customStyle : null)}>
    <Translatable content={{ transKey: transKey }}>
      <span className={css(adminCardStyles.semiBold)} />
    </Translatable>:
    {React.Children.count(children) === 0 ? (
      <span className={css(margin.left_0_5)}>
        {text}
      </span>
    ) : (
      <React.Fragment>
        {children}
      </React.Fragment>
    )}
  </div>
);

export default AdminInfo;

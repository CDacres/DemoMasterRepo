import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Components
import Spell from '@src/components/Listing/Translate/Spell';

type Props = {
  children?: React.ReactNode;
};

const DashedCard = ({ children }: Props) => (
  <div className={css(styles.container)}>
    <div className={css(styles.plus)}>
      +
    </div>
    <div className={css(styles.text)}>
      <Spell word="listing.add_another" />
    </div>
    {children}
  </div>
);

export default DashedCard;

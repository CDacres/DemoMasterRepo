import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Components
import Spell from '@src/components/Listing/Translate/Spell';

type Props = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  title?: string;
};

const SectionTooltip = ({ children, icon, title }: Props) => (
  <div className={css(styles.container)}>
    {icon &&
      <React.Fragment>
        {icon}
      </React.Fragment>
    }
    {title &&
      <span className={css(styles.title)}>
        <Spell word={title} />
      </span>
    }
    {children}
  </div>
);

export default SectionTooltip;

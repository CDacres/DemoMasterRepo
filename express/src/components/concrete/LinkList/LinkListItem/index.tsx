import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { pagestyles } from '@src/styles';

// Components
import BrowserLink from '@src/components/abstract/Link';

type Props = {
  columns?: number;
  link: string;
  subtitle?: string;
  text: string;
  textSize?: string;
  title: string;
};

const LinkListItem: React.FunctionComponent<Props> = ({ columns, link, subtitle, text, textSize, title }) => (
  <div className={css(styles.cols, styles[`cols${columns}`], !subtitle && styles.noSubtext)}>
    <p
      className={css(styles.title)}
      style={{ fontSize: textSize ? textSize : '15px' }}
    >
      <BrowserLink
        attributes={{ title: { transKey: title } }}
        className={css(pagestyles.link)}
        href={link}
      >
        {text}
      </BrowserLink>
    </p>
    {!!subtitle &&
      <p className={css(styles.subtitle)}>
        {subtitle}
      </p>
    }
  </div>
);

LinkListItem.defaultProps = { columns: 5 };

export default LinkListItem;

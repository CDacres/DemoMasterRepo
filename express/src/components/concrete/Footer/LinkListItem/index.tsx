import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import BrowserLink from '@src/components/abstract/Link';

// Types
import { Link } from '@src/typings/types';

type Props = {
  link: Link;
};

const LinkListItem = ({ link: { href, prefetch = false, text } }: Props) => (
  <li className={css(margin.bottom_0_5)}>
    <BrowserLink
      attributes={{ title: { transKey: text } }}
      className={css(styles.linkListItemAnchor)}
      href={href}
      prefetch={prefetch}
    >
      <Translatable content={{ transKey: text }} />
    </BrowserLink>
  </li>
);

export default LinkListItem;

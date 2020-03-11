import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import BrowserLink from '@src/components/abstract/Link';

type Props = {
  href: string;
  transKey: string;
};

const ControlItem = ({ href, transKey }: Props) => (
  <BrowserLink
    attributes={{ title: { transKey: transKey } }}
    className={css(styles.controlsText, pagestyles.link)}
    href={href}
  >
    <Translatable content={{ transKey: transKey }} />
  </BrowserLink>
);

export default ControlItem;

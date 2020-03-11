import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { padding, pagestyles } from '@src/styles';

type Props = {
  children: JSX.Element | JSX.Element[] | string;
  href: string;
};

const SocialIcon = ({ children, href }: Props) => (
  <div className={css(pagestyles.inlineBlockMiddle, padding.leftright_1)}>
    <a
      aria-busy="false"
      className={css(styles.socialIconAnchor)}
      href={href}
      itemProp="sameAs"
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  </div>
);

export default SocialIcon;

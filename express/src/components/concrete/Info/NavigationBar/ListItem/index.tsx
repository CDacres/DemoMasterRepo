/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import BrowserLink from '@src/components/abstract/Link';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  href: string;
  isCurrent: boolean;
  text: string;
};

const ListItem = ({ href, isCurrent, text }: Props) => (
  <li className={css(styles.wrapper, pagestyles.inlineBlockMiddle, margin.right_4, isCurrent ? styles.wrapperSelected : null)}>
    <div className={css(pagestyles.inlineBlock)}>
      {isCurrent ? (
        <span className={css(styles.selectedSpanWrapper, pagestyles.inlineBlock, pagestyles.fullColumn, pagestyles.fontMedium)}>
          <Translatable content={{ transKey: text }}>
            <span className={css(styles.selectedSpan)} />
          </Translatable>
        </span>
      ) : (
        <BrowserLink
          attributes={{ title: { transKey: text } }}
          className={css(pagestyles.linkBlack, pagestyles.linkUnderlined, pagestyles.fontMedium, pagestyles.inlineBlock, pagestyles.fullColumn)}
          href={href}
        >
          <Translatable content={{ transKey: text }} />
        </BrowserLink>
      )}
    </div>
  </li>
);

export default ListItem;

import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding } from '@src/styles';

// Components
import BrowserLink from '@src/components/abstract/Link';

type Props = {
  buttonText: string;
  link: string;
  text: string;
  textColor?: string;
};

const Advert = ({ buttonText, link, text, textColor }: Props) => (
  <div className={css(styles.advertContainer, margin.top_5_large, margin.leftright_5_large)}>
    <div className={css(styles.advertTextWrapper, margin.bottom_2)}>
      <div className={css(styles.advertTextContainer, margin.all_0)}>
        <span style={{ color: textColor ? textColor : '#484848' }}>
          {text}
        </span>
      </div>
    </div>
    <div>
      <BrowserLink
        aria-busy="false"
        attributes={{ title: { transKey: buttonText } }}
        className={css(styles.advertLink, padding.topbottom_1_5)}
        href={link}
      >
        <span className={css(styles.advertLinkText)}>
          <div className={css(styles.advertLinkTextInner, margin.all_0, padding.topbottom_0)}>
            {buttonText}
          </div>
        </span>
      </BrowserLink>
    </div>
  </div>
);

export default Advert;

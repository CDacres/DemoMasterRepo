import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import BrowserLink from '@src/components/abstract/Link';

type Props = {
  title: string;
  subtitle: string;
  link: string;
};

const NavigationItem = ({ title, subtitle, link }: Props) => (
  <div className={css(styles.wrapper, margin.bottom_2)}>
    <BrowserLink
      className={css(styles.container, margin.bottom_0_5, padding.topbottom_2, padding.leftright_3)}
      href={link}
    >
      <Translatable content={{ transKey: title }}>
        <div className={css(styles.title, pagestyles.subtitle, pagestyles.fontBlack, margin.all_0)} />
      </Translatable>
      <div className={css(margin.top_0_25)}>
        <Translatable content={{ transKey: subtitle }}>
          <div className={css(styles.subtitleContent, pagestyles.smallSubtitle, pagestyles.fontMedium, margin.all_0)} />
        </Translatable>
      </div>
    </BrowserLink>
  </div>
);

export default NavigationItem;

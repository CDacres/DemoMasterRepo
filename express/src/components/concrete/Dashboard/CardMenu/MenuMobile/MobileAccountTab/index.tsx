import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { Chevron } from '@src/components/concrete/Icons/svgs';
import BrowserLink from '@src/components/abstract/Link';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  isFirst: boolean;
  link: string;
  subtitle: string;
  title: string;
};

const MobileAccountTab = ({ isFirst, link, subtitle, title }: Props) => (
  <BrowserLink
    className={css(styles.linkStyle)}
    href={link}
  >
    <div {...(isFirst ? { className: css(padding.top_3) } : {})}>
      <div className={css(styles.secondTabContainer)}>
        <div className={css(pagestyles.fullColumn, pagestyles.tableCellTop)}>
          <div>
            <Translatable content={{ transKey: title }}>
              <span className={css(pagestyles.text, margin.all_0)} />
            </Translatable>
          </div>
          <div className={css(margin.top_1)}>
            <Translatable content={{ transKey: subtitle }}>
              <div className={css(pagestyles.smallText, margin.all_0)} />
            </Translatable>
          </div>
        </div>
        <div className={css(pagestyles.tableCellTop)}>
          <div className={css(margin.left_2)}>
            <Chevron
              direction="right"
              stylesArray={[styles.rightIcon, pagestyles.icon16]}
            />
          </div>
        </div>
      </div>
    </div>
    <ContentSeparator marginNum={3} />
  </BrowserLink>
);

export default MobileAccountTab;

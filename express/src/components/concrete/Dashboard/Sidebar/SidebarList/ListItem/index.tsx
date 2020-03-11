import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import { Chevron } from '@src/components/concrete/Icons/svgs';
import BrowserLink from '@src/components/abstract/Link';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  href: string;
  isLast: boolean;
  text: string;
};

const ListItem = ({ href, isLast, text }: Props) => (
  <React.Fragment>
    <div className={css(margin.topbottom_3)}>
      <BrowserLink
        className={css(pagestyles.block, pagestyles.link, pagestyles.linkUnderlined)}
        href={href}
      >
        <div className={css(pagestyles.text, pagestyles.fontMedium, margin.all_0)}>
          <div className={css(styles.textContainer)}>
            <Translatable content={{ transKey: text }}>
              <div className={css(pagestyles.fullColumn, pagestyles.tableCellMiddle)} />
            </Translatable>
            <div className={css(pagestyles.tableCellMiddle)}>
              <Chevron
                direction="right"
                stylesArray={[pagestyles.icon]}
              />
            </div>
          </div>
        </div>
      </BrowserLink>
    </div>
    {!isLast &&
      <ContentSeparator marginNum={2} />
    }
  </React.Fragment>
);

export default ListItem;

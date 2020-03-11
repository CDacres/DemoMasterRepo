import * as React from 'react';
import { css } from 'aphrodite/no-important';
import shortid from 'shortid';

// Styles
import styles from './styles';
import { margin, padding } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import BrowserLink from '@src/components/abstract/Link';

type Point = {
  link_href: string;
  link_text: string;
};
type Props = {
  sideMenu: Point[];
};

const LegalSideMenu = ({ sideMenu }: Props) => (
  <div className={css(styles.menuBlock, margin.all_0, padding.topbottom_0)}>
    <ul className={css(styles.list, margin.all_0, padding.top_1_25, padding.left_0)}>
      {sideMenu.map(point => (
        <li key={shortid.generate()}>
          <BrowserLink
            attributes={{ title: { transKey: point.link_text } }}
            className={css(styles.listOpt, padding.topbottom_1, padding.leftright_0)}
            href={`/legal${point.link_href}`}
          >
            <Translatable content={{ transKey: point.link_text }} />
          </BrowserLink>
        </li>
      ))}
    </ul>
  </div>
);

export default LegalSideMenu;

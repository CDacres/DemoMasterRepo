/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';
import shortid from 'shortid';

// Styles
import styles from './styles';
import { padding, pagestyles } from '@src/styles';

// Components
import MenuItem from '@src/components/concrete/Venue/MiniMenu/MenuItem';
import ContentSeparator from '@src/components/concrete/ContentSeparator';

type Props = {
  isDisplayed: boolean;
  menuItems: Array<{
    isFirst: boolean;
    onScroll: boolean;
    ref: React.RefObject<HTMLDivElement>;
    text: string;
  }>;
};

const MiniMenuComponent = ({ isDisplayed, menuItems }: Props) => (
  <div className={css(styles.menuWrapper, isDisplayed ? pagestyles.block : pagestyles.none)}>
    <div className={css(styles.container)}>
      <div className={css(styles.contentWrapper, padding.leftright_2, padding.topbottom_0_small, padding.leftright_10_small)}>
        <div className={css(styles.contentInner, padding.topbottom_2)}>
          {menuItems.map(item => (
            <React.Fragment key={shortid.generate()}>
              {!item.isFirst &&
                <span>
                  &nbsp;<span aria-hidden="true"> · </span>&nbsp;
                </span>
              }
              <MenuItem
                onClick={() => { item.ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                onScroll={item.onScroll}
                text={item.text}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
      <ContentSeparator marginNum={0} />
    </div>
  </div>
);

export default MiniMenuComponent;

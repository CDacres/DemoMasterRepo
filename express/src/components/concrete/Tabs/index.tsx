/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { padding, pagestyles } from '@src/styles';

// Components
import TabItem from '@src/components/concrete/Tabs/TabItem';
import Button from '@src/components/concrete/Button';
import { Chevron } from '@src/components/concrete/Icons/svgs';

type Props = {
  fullScreen?: boolean;
  handleClick: (page: number) => void;
  items: string[];
  tabIndex: number;
};

const Tabs = ({ fullScreen, handleClick, items, tabIndex }: Props) => (
  <div className={css(pagestyles.row, pagestyles.clearfix)}>
    <div className={css(pagestyles.column, padding.leftright_1, !fullScreen ? pagestyles.sevenTwelfthsColumnSmallScreen : null)}>
      <div>
        <div className={css(pagestyles.relativePosition)}>
          <div className={css(styles.navWrapper)}>
            <div className={css(styles.navContainer)}>
              <div
                className={css(styles.navInner)}
                role="tablist"
              >
                {items.map((item, index) => (
                  <TabItem
                    key={item}
                    onClick={() => handleClick(index)}
                    panelVisible={tabIndex === index}
                    title={item}
                  />
                ))}
              </div>
            </div>
          </div>
          <div>
            {/* TODO: work out how to show arrows with smaller screens or too long a tab list */}
            <Button
              disabled={true}
              stylesArray={[styles.iconButton, styles.previousButton]}
            >
              <div className={css(styles.buttonInner, padding.right_0_5)}>
                <div className={css(styles.buttonIcon)}>
                  <Chevron
                    direction="left"
                    role="presentation"
                    stylesArray={[pagestyles.icon]}
                  />
                </div>
              </div>
              <div className={css(styles.previousSpacer)} />
            </Button>
            <Button
              disabled={true}
              stylesArray={[styles.iconButton, styles.nextButton]}
            >
              <div className={css(styles.buttonInner, padding.left_0_5)}>
                <div className={css(styles.buttonIcon)}>
                  <Chevron
                    direction="right"
                    role="presentation"
                    stylesArray={[pagestyles.icon]}
                  />
                </div>
              </div>
              <div className={css(styles.previousSpacer)} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Tabs;

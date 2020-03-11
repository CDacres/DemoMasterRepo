import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import packageCardStyles from '../styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { FullScreenModal } from '@src/components/abstract/MediaQuery';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import Icon from '../Icon';
import BottomSectionLink from '@src/components/concrete/PackagesCard/BottomSection/BottomSectionLink';

// Types
import { Package } from '@src/typings/types';

type Props = {
  collapseAction: (e?: any) => void;
  hasCollapseSection: boolean;
  isCollapsed: boolean;
  item: Package;
};

const BottomSection = ({ collapseAction, hasCollapseSection, isCollapsed, item }: Props) => (
  <FullScreenModal>
    {matches => {
      if (matches) {
        return (
          <div className={css(packageCardStyles.priceExtras, padding.all_2)}>
            {item.offerText &&
              <div className={css(packageCardStyles.priceExtraSmallTable)}>
                <div className={css(pagestyles.fullColumn, pagestyles.tableCellMiddle)}>
                  <div className={css(pagestyles.smallText)}>
                    {item.offerText}
                  </div>
                </div>
                <div className={css(pagestyles.tableCellMiddle)}>
                  <Icon />
                </div>
              </div>
            }
            {hasCollapseSection &&
              <React.Fragment>
                <ContentSeparator marginNum={3} />
                <BottomSectionLink
                  collapseAction={collapseAction}
                  hasCollapseSection={hasCollapseSection}
                  isCollapsed={isCollapsed}
                />
              </React.Fragment>
            }
          </div>
        );
      }
      return (
        <div className={css(packageCardStyles.priceExtras, padding.all_2)}>
          <div className={css(packageCardStyles.priceExtraLeft)}>
            {item.offerText &&
              <React.Fragment>
                <div className={css(margin.right_1)}>
                  <Icon />
                </div>
                <div className={css(pagestyles.smallText)}>
                  {item.offerText}
                </div>
              </React.Fragment>
            }
          </div>
          <BottomSectionLink
            collapseAction={collapseAction}
            hasCollapseSection={hasCollapseSection}
            isCollapsed={isCollapsed}
          />
        </div>
      );
    }}
  </FullScreenModal>
);

export default BottomSection;

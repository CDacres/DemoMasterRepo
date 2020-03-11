import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { padding, pagestyles } from '@src/styles';

// Components
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import MobileFilterPanelItemInner from '@src/components/concrete/FilterBar/FilterPanels/MobileFilterPanel/MobileFilterPanelContent/MobileFilterPanelItem/MobileFilterPanelItemInner';
import PanelItemBlockWrapper from '@src/components/concrete/FilterBar/FilterPanels/PanelItems/PanelItemBlockWrapper';

type Props = {
  children: JSX.Element | JSX.Element[];
  isCollapseElement?: boolean;
  isLast?: boolean;
};

const MobileFilterPanelItem = ({ children, isCollapseElement, isLast }: Props) => {
  let headerElement = null;
  let description = null;
  let subtitle = null;
  let learnMore = null;
  let rightElement = null;
  let showBlock = false;
  const remainingChildren = [];
  {React.Children.map(children, (child: JSX.Element) => {
    if (child.type.name === 'PanelItemDescription') {
      description = child;
      showBlock = true;
    } else if (child.type.name === 'PanelItemHeader') {
      headerElement = child;
    } else if (child.type.name === 'PanelItemSubtitle') {
      subtitle = child;
      showBlock = true;
    } else if (child.type.name === 'PanelItemLearnMore') {
      learnMore = child;
      showBlock = true;
    } else if (child.type.name === 'PanelItemSelect') {
      rightElement = child;
      showBlock = true;
    } else if (child.type.name === 'PanelItemToggle') {
      rightElement = child;
      showBlock = true;
    } else {
      remainingChildren.push(child);
    }
  });
  }
  return (
    <React.Fragment>
      {(isCollapseElement && remainingChildren) ? (
        <div className={css(pagestyles.noBottomBorder, padding.topbottom_3)}>
          {remainingChildren}
        </div>
      ) : (
        <div className={css(pagestyles.noBottomBorder, padding.topbottom_1)}>
          <section>
            {headerElement}
            {showBlock ? (
              <MobileFilterPanelItemInner>
                <PanelItemBlockWrapper
                  description={description}
                  learnMore={learnMore}
                  rightElement={rightElement}
                  subtitle={subtitle}
                />
              </MobileFilterPanelItemInner>
            ) : (remainingChildren ? (
              <React.Fragment>
                {remainingChildren}
              </React.Fragment>
            ) : (
              null
            ))}
          </section>
        </div>
      )}
      {!isLast &&
        <ContentSeparator marginNum={0} />
      }
    </React.Fragment>
  );
};

export default MobileFilterPanelItem;

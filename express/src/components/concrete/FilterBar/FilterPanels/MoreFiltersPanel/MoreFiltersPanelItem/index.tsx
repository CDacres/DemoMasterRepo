import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, padding, pagestyles } from '@src/styles';

// Components
import FilterPanelItem from '@src/components/concrete/FilterBar/FilterPanels/FilterPanel/FilterPanelItem';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import PanelItemBlockWrapper from '@src/components/concrete/FilterBar/FilterPanels/PanelItems/PanelItemBlockWrapper';

type Props = {
  children: JSX.Element | JSX.Element[];
  isLast?: boolean;
};

const MoreFiltersPanelItem = ({ children, isLast }: Props) => {
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
    } else if (child.type.name === 'PanelItemToggle') {
      rightElement = child;
      showBlock = true;
    } else {
      remainingChildren.push(child);
    }
  });
  }
  return (
    <div role="group">
      <section>
        <legend>
          {headerElement}
        </legend>
        <div className={css(margin.topbottom_2)}>
          <span className={css(pagestyles.hideFont)} />
          <div className={css(pagestyles.row, pagestyles.clearfix)}>
            {showBlock ? (
              <FilterPanelItem isLarge={true}>
                <div className={css(pagestyles.noBottomBorder, padding.top_0, padding.bottom_2)}>
                  <PanelItemBlockWrapper
                    description={description}
                    learnMore={learnMore}
                    rightElement={rightElement}
                    subtitle={subtitle}
                  />
                </div>
              </FilterPanelItem>
            ) : (remainingChildren ? (
              <React.Fragment>
                {remainingChildren}
              </React.Fragment>
            ) : (
              null
            ))}
          </div>
        </div>
        {!isLast &&
          <ContentSeparator marginNum={3} />
        }
      </section>
    </div>
  );
};

export default MoreFiltersPanelItem;

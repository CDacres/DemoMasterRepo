/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { FullScreenModal, ProductLargeScreen } from '@src/components/abstract/MediaQuery';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import GenericCard from '@src/components/concrete/GenericCard';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import ChooseButton from '@src/components/concrete/PackagesCard/ChooseButton';
import CollapseSection from '@src/components/concrete/PackagesCard/CollapseSection';
import BottomSection from '@src/components/concrete/PackagesCard/BottomSection';

// Types
import { Package } from '@src/typings/types';

type Props = {
  item: Package;
};

type State = {
  isCollapsed: boolean;
};

class PackagesCard extends React.PureComponent<Props, State> {
  state: State = { isCollapsed: false };

  handleClick = e => {
    e.preventDefault();
    this.setState(prevState => ({ isCollapsed: !prevState.isCollapsed }));
  }

  render() {
    const { item } = this.props;
    const { isCollapsed } = this.state;
    const hasBottomSection = ((item.extras && item.extras !== null) || (item.offerText && item.offerText !== null) || (item.times && item.times.length > 1));
    const hasCollapseSection = ((item.extras && item.extras !== null) || (item.times && item.times.length > 1));
    return (
      <div className={css(margin.bottom_2)}>
        <GenericCard
          boxShadow="none"
          padding="0px"
        >
          <div className={css(padding.leftright_2)}>
            <div className={css(padding.topbottom_3)}>
              <div className={css(styles.priceContainer)}>
                <div>
                  <div className={css(margin.top_0_25, margin.bottom_0_75)}>
                    <div className={css(pagestyles.subtitle)}>
                      <Translatable content={{ transKey: item.title }}>
                        <span className={css(pagestyles.fontMedium)} />
                      </Translatable>
                      {(item.times && item.times.length === 1) &&
                        <React.Fragment>
                          <span className={css(styles.timeSeparator, margin.leftright_0_5)}>
                            |
                          </span>
                          <span>
                            {item.times[0]}
                          </span>
                        </React.Fragment>
                      }
                    </div>
                  </div>
                  {item.price &&
                    <div className={css(margin.top_0_25, margin.bottom_0_75)}>
                      <div className={css(pagestyles.text)}>
                        {item.price}
                      </div>
                    </div>
                  }
                  {item.subtitle &&
                    <div className={css(margin.top_0_25, margin.bottom_0_75)}>
                      {item.subtitle}
                    </div>
                  }
                </div>
                <ProductLargeScreen>
                  {matches => {
                    if (matches) {
                      return (
                        <div className={css(margin.left_1)}>
                          <ChooseButton />
                        </div>
                      );
                    }
                    return null;
                  }}
                </ProductLargeScreen>
              </div>
            </div>
            <FullScreenModal>
              {matches => {
                if (matches) {
                  return (
                    <div {...(!hasCollapseSection ? { className: css(margin.bottom_3) } : {})}>
                      <ChooseButton />
                    </div>
                  );
                }
                return (
                  <React.Fragment>
                    {hasBottomSection &&
                      <ContentSeparator marginNum={0} />
                    }
                  </React.Fragment>
                );
              }}
            </FullScreenModal>
            {hasCollapseSection &&
              <CollapseSection
                isCollapsed={isCollapsed}
                item={item}
              />
            }
          </div>
          {hasBottomSection &&
            <BottomSection
              collapseAction={this.handleClick}
              hasCollapseSection={hasCollapseSection}
              isCollapsed={isCollapsed}
              item={item}
            />
          }
        </GenericCard>
      </div>
    );
  }
}

export default PackagesCard;

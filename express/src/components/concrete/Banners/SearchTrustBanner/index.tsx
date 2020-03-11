import * as React from 'react';
import { css } from 'aphrodite/no-important';
import shortid from 'shortid';

// Data
import { trustBanner } from '@src/data/search';

// Styles
import { margin, pagestyles } from '@src/styles';

// Components
import SectionHeader from '@src/components/concrete/SectionHeader';
import { ProductLargeScreen } from '@src/components/abstract/MediaQuery';
import TrustLargeItem from '@src/components/concrete/Banners/SearchTrustBanner/TrustLargeItem';
import TrustSmallItem from '@src/components/concrete/Banners/SearchTrustBanner/TrustSmallItem';

type Props = {
  sectionSubtitle?: string;
  sectionTitle?: string;
};

const SearchTrustBanner = ({ sectionSubtitle, sectionTitle }: Props) => (
  <div>
    <div className={css(margin.topbottom_4, margin.topbottom_5_small)}>
      <div>
        {sectionTitle &&
          <SectionHeader
            sectionSubtitle={sectionSubtitle}
            sectionTitle={sectionTitle}
          />
        }
      </div>
      <div className={css(margin.bottom_0)}>
        <div>
          <div className={css(margin.topbottom_2_small, margin.bottom_4_large)}>
            <div>
              <ProductLargeScreen>
                {matches => {
                  if (matches) {
                    return (
                      <div className={css(pagestyles.largerRow, pagestyles.clearfix)}>
                        {trustBanner.map(item => (
                          <TrustLargeItem
                            icon={item.icon}
                            key={shortid.generate()}
                            text={item.text}
                            title={item.title}
                          />
                        ))}
                      </div>
                    );
                  }
                  return (
                    <React.Fragment>
                      {trustBanner.map(item => (
                        <TrustSmallItem
                          icon={item.icon}
                          key={shortid.generate()}
                          text={item.text}
                          title={item.title}
                        />
                      ))}
                    </React.Fragment>
                  );
                }}
              </ProductLargeScreen>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SearchTrustBanner;

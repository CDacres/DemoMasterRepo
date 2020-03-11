/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding } from '@src/styles';

// Components
import { ProductLargeScreen } from '@src/components/abstract/MediaQuery';
import Title from '@src/components/concrete/Banners/RoundedBanner/Title';
import Header from '@src/components/concrete/Banners/RoundedBanner/Header';
import Description from '@src/components/concrete/Banners/RoundedBanner/Description';
import LearnMore from '@src/components/concrete/Banners/RoundedBanner/LearnMore';

const RoundedBanner = () => (
  <div>
    <div className={css(margin.top_3)}>
      <div />
    </div>
    <div>
      <div>
        <div className={css(margin.top_1, margin.bottom_1_5)}>
          <a className={css(styles.container)}>
            <div className={css(styles.space)} />
            <div className={css(styles.imgWrapper)}>
              <div className={css(styles.imgContainer)}>
                <ProductLargeScreen>
                  {matches => {
                    if (matches) {
                      return (
                        <img
                          className={css(styles.imgInner)}
                          src="https://a0.muscache.com/pictures/5c6a8abb-9798-4185-828b-5a010cd3d9e1.jpg" // TODO: hardcoded image
                        />
                      );
                    }
                    return (
                      <img
                        className={css(styles.imgInner)}
                        src="https://a0.muscache.com/pictures/3d9bd982-982a-49e9-9273-9cc3e6b18edd.jpg" // TODO: hardcoded image
                      />
                    );
                  }}
                </ProductLargeScreen>
                <div className={css(styles.imgBreak)} />
              </div>
            </div>
            <ProductLargeScreen>
              {matches => {
                if (matches) {
                  return (
                    <div className={css(styles.textWrapper, padding.topbottom_6_large, padding.left_8_large)}>
                      {/* TODO: hardcoded lang */}
                      <Title title="INTRODUCING ZIPCUBE" />
                      <Header header="The perfect meeting with none of the planning" />
                      <Description description="Lodging, meals, and activities included" />
                      <LearnMore />
                      <div className={css(styles.box)} />
                    </div>
                  );
                }
                return (
                  <div className={css(styles.textWrapperSmallScreen, margin.all_3)}>
                    <Title
                      isSmall={true}
                      title="INTRODUCING ZIPCUBE" // TODO: hardcoded lang
                    />
                    <Header
                      header="The perfect meeting with none of the planning" // TODO: hardcoded lang
                      isSmall={true}
                    />
                    <Description
                      description="Lodging, meals, and activities included" // TODO: hardcoded lang
                      isSmall={true}
                    />
                    <LearnMore isSmall={true} />
                    <div className={css(styles.box)} />
                  </div>
                );
              }}
            </ProductLargeScreen>
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default RoundedBanner;

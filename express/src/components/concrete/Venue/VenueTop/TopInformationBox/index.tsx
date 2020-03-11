/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { FullScreenModal, RightSidebar } from '@src/components/abstract/MediaQuery';
import TopContentWrapper from '@src/components/concrete/Venue/VenueTop/TopContentWrapper';
import Title from '@src/components/concrete/Venue/VenueTop/TopInformationBox/Items/Title';
import Info from '@src/components/concrete/Venue/VenueTop/TopInformationBox/Items/Info';

type Props = {
  addTranslationButton?: boolean;
  badges: Array<{
    href: string;
    text: string;
  }>;
  header: string;
  info: Array<{
    icon: string;
    text: string;
    title: string;
  }>;
  title: {
    large: string;
    location: string;
    searchLink: string;
    small: string;
  };
};

const TopInformationBox = ({ addTranslationButton, badges, header, info, title }: Props) => (
  <TopContentWrapper>
    <div>
      <RightSidebar>
        {matches => {
          if (matches) {
            return (
              <div className={css(pagestyles.largerRow, pagestyles.clearfix)}>
                <div className={css(pagestyles.column, pagestyles.thirdColumnLargeScreen, padding.leftright_1_5)}>
                  <Title
                    addTranslationButton={addTranslationButton}
                    badges={badges}
                    largeTitle={title.large}
                    location={title.location}
                    searchLink={title.searchLink}
                    smallTitle={title.small}
                  />
                </div>
                <div className={css(pagestyles.column, pagestyles.twoThirdsColumnLargeScreen, padding.leftright_1_5)}>
                  <div className={css(margin.bottom_2, margin.right_16, margin.top_3_small)}>
                    <div>
                      <div className={css(styles.header, pagestyles.title, margin.all_0)}>
                        {header}
                      </div>
                    </div>
                  </div>
                  <Info info={info} />
                </div>
              </div>
            );
          }
          return (
            <div className={css(pagestyles.row, pagestyles.clearfix)}>
              <div className={css(pagestyles.column, pagestyles.fullColumn, pagestyles.halfColumnSmallScreen, pagestyles.columnFloat, padding.leftright_1)}>
                <Title
                  badges={badges}
                  largeTitle={title.large}
                  location={title.location}
                  searchLink={title.searchLink}
                  smallTitle={title.small}
                />
              </div>
              <div className={css(pagestyles.column, pagestyles.fullColumn, pagestyles.halfColumnSmallScreen, pagestyles.columnFloat, padding.leftright_1)}>
                <div className={css(styles.headerSmall, margin.right_0, margin.bottom_2, margin.top_3_small)}>
                  <div>
                    <FullScreenModal>
                      {matches => {
                        if (matches) {
                          return (
                            <div className={css(styles.header, pagestyles.subtitle, margin.all_0)}>
                              {header}
                            </div>
                          );
                        }
                        return (
                          <div className={css(styles.header, pagestyles.title, margin.all_0)}>
                            {header}
                          </div>
                        );
                      }}
                    </FullScreenModal>
                  </div>
                </div>
              </div>
              <div className={css(pagestyles.column, pagestyles.fullColumn, pagestyles.columnFloat, padding.leftright_1)}>
                <Info info={info} />
              </div>
            </div>
          );
        }}
      </RightSidebar>
    </div>
  </TopContentWrapper>
);

export default TopInformationBox;

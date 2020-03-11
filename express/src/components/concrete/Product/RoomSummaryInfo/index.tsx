/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding } from '@src/styles';

// Components
import Avatar from '@src/components/concrete/Avatar';
import RoomStatistic from '@src/components/concrete/Product/RoomStatistic';
import RoomInfo from '@src/components/concrete/Product/RoomInfo';
import AccentUpperText from '@src/components/concrete/Product/AccentUpperText';
import GenericHeader from '@src/components/concrete/GenericHeader';
import BrowserLink from '@src/components/abstract/Link';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import { SmallScreen } from '@src/components/abstract/MediaQuery';

// Types
import { CapacityRange, RoomLocation, RoomPrice, Store } from '@src/typings/types';

export type RoomSummaryInfoProps = {
  capacity?: CapacityRange;
  info: Store.RoomInfo;
  name: string;
  location: RoomLocation;
  priceRange: RoomPrice;
  reviews: number;
  title: string;
  titleHref: string;
};

const RoomSummaryInfo = ({ capacity, info, name, location, priceRange, reviews, title, titleHref }: RoomSummaryInfoProps) => (
  <section id="summary">
    <div className={css(margin.top_3)}>
      <SmallScreen>
        {matches => {
          if (matches) {
            return (
              <React.Fragment>
                <div>
                  <BrowserLink
                    attributes={{ title: { transKey: title } }}
                    className={css(styles.link)}
                    href={titleHref}
                  >
                    <AccentUpperText text={title} />
                  </BrowserLink>
                </div>
                <div className={css(margin.bottom_1)}>
                  <GenericHeader
                    tag="h2"
                    text={name}
                  />
                </div>
                <div className={css(styles.location)}>
                  <div data-location={info.venue_city}>
                    <a
                      className={css(styles.link)}
                      href="#location"
                    >
                      <div className={css(styles.summaryText)}>
                        {info.venue_city}
                      </div>
                    </a>
                  </div>
                  <div>
                    <Avatar
                      customStyle={styles.avatarSize}
                      height="48px"
                      name={{
                        firstName: info.owner_first_name,
                        lastName: info.owner_last_name,
                      }}
                      src={info.owner_img_src}
                      width="48px"
                    />
                  </div>
                </div>
              </React.Fragment>
            );
          }
          return (
            <div className={css(styles.row)}>
              <div>
                <BrowserLink
                  attributes={{ title: { transKey: title } }}
                  className={css(styles.link)}
                  href={titleHref}
                >
                  <AccentUpperText text={title} />
                </BrowserLink>
                <div className={css(margin.bottom_1)}>
                  <GenericHeader
                    tag="h2"
                    text={name}
                  />
                </div>
                <div className={css(margin.bottom_2)}>
                  <div data-location={info.venue_city}>
                    <a
                      className={css(styles.link)}
                      href="#location"
                    >
                      <div className={css(styles.summaryText)}>
                        {info.venue_city}
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <Avatar
                  name={{
                    firstName: info.owner_first_name,
                    lastName: info.owner_last_name,
                  }}
                  src={info.owner_img_src}
                >
                  <div className={css(styles.summaryText, styles.owner)}>
                    {info.owner_first_name}
                  </div>
                </Avatar>
              </div>
            </div>
          );
        }}
      </SmallScreen>
      {reviews &&
        <React.Fragment>
          <RoomStatistic
            count={reviews}
            name="common.reviews_count"
            type="review"
          />
          <RoomStatistic
            name="room.verified"
            type="verified"
          />
        </React.Fragment>
      }
      <div className={css(padding.top_3)}>
        <RoomInfo
          capacity={capacity}
          location={location}
          priceRange={priceRange}
        />
      </div>
      <ContentSeparator marginNum={4} />
    </div>
  </section>
);

export default RoomSummaryInfo;

/* tslint:disable:max-line-length */
import * as React from 'react';
import Collapse from 'react-collapse';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import GenericHeader from '@src/components/concrete/GenericHeader';
import GenericCard from '@src/components/concrete/GenericCard';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import { SmallScreen } from '@src/components/abstract/MediaQuery';
import InteractionLink from '@src/components/concrete/InteractionLink';

// Types
import { Amenity, Currency } from '@src/typings/types';

export type RoomAmenitiesProps = {
  amenities: Amenity[];
  currency: Currency;
  inVenuePage?: boolean;
};

type State = {
  isCollapsed: boolean;
  largeLimit: number;
  smallLimit: number;
};

class RoomAmenities extends React.Component<RoomAmenitiesProps, State> {
  state: State = {
    isCollapsed: false,
    largeLimit: 12,
    smallLimit: 9,
  };

  handleClick = e => {
    e.preventDefault();
    this.setState(prevState => ({ isCollapsed: !prevState.isCollapsed }));
  }

  renderShowMore = (limit) => {
    const { amenities } = this.props;
    const { isCollapsed } = this.state;
    return (
      <React.Fragment>
        {(amenities.length > limit) &&
          <div className={css(margin.top_6)}>
            <InteractionLink
              action={this.handleClick}
              className={css(styles.collapsable, pagestyles.link)}
            >
              {isCollapsed ? (
                <Translatable content={{ transKey: 'room.hide_amenities' }} />
              ) : (
                <Translatable content={{ transKey: 'room.show_amenities', count: 1, replacements: { number: amenities.length } }} />
              )}
            </InteractionLink>
          </div>
        }
      </React.Fragment>
    );
  }

  renderAmenities = (limit) => {
    const { amenities, currency } = this.props;
    const { isCollapsed } = this.state;
    return amenities.map((amenity, index) => {
      if (index >= limit && !isCollapsed) {
        return;
      }
      return (
        <GenericCard
          borderColor="#f2f2f2"
          boxShadow="none"
          key={amenity.amenity_id}
          padding="0px"
        >
          <div className={css(styles.amenity)}>
            <div>
              <img
                alt={amenity.name}
                height="100%"
                src={amenity.image_url}
                width="100%"
              />
            </div>
            <div className={css(styles.amenityTextWrapper)}>
              <span className={css(styles.amenityText, pagestyles.textMap, amenity.price ? styles.amenityTextWithPrice : null)}>
                {amenity.name}
              </span>
              {amenity.price &&
                <span className={css(styles.amenityText, styles.amenityPrice, pagestyles.textMap)}>
                  {currency.currency_symbol_left}{amenity.price}
                </span>
              }
            </div>
          </div>
        </GenericCard>
      );
    });
  }

  render() {
    const { amenities, inVenuePage } = this.props;
    const { largeLimit, smallLimit } = this.state;
    return (
      <React.Fragment>
        {(amenities && amenities.length > 0) &&
          <section id="amenities">
            {!inVenuePage &&
              <div className={css(margin.bottom_2)}>
                <GenericHeader text="common.amenities" />
              </div>
            }
            <div>
              <Collapse isOpened={true}>
                <div className={css(styles.amenityContainer)}>
                  <SmallScreen>
                    {matches => {
                      if (matches) {
                        return (
                          <div className={css(styles.amenityWrapper)}>
                            {this.renderAmenities(smallLimit)}
                          </div>
                        );
                      }
                      return (
                        <div className={css(styles.amenityWrapper)}>
                          {this.renderAmenities(largeLimit)}
                        </div>
                      );
                    }}
                  </SmallScreen>
                </div>
              </Collapse>
              <SmallScreen>
                {matches => {
                  if (matches) {
                    return this.renderShowMore(smallLimit);
                  }
                  return this.renderShowMore(largeLimit);
                }}
              </SmallScreen>
            </div>
            {!inVenuePage &&
              <ContentSeparator marginNum={4} />
            }
          </section>
        }
      </React.Fragment>
    );
  }
}

export default RoomAmenities;

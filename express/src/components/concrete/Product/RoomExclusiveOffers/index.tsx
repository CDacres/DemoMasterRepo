/* tslint:disable:max-line-length */
import * as React from 'react';
import shortid from 'shortid';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding } from '@src/styles';

// Data
import { daysOfWeekShort } from '@src/data/weekdays';

// Components
import GenericCard from '@src/components/concrete/GenericCard';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import AccentUpperText from '@src/components/concrete/Product/AccentUpperText';
import GenericHeader from '@src/components/concrete/GenericHeader';
import ContentSeparator from '@src/components/concrete/ContentSeparator';

// Types
import { RoomExclusiveOffer } from '@src/typings/types';

type Props = {
  exclusiveOffer: RoomExclusiveOffer[];
};

const RoomExclusiveOffers = ({ exclusiveOffer }: Props) => (
  <React.Fragment>
    {(exclusiveOffer && exclusiveOffer.length > 0) &&
      <section id="exclusive_offers">
        <div className={css(margin.bottom_2)}>
          <GenericHeader text="room.exclusive_offers" />
        </div>
        <div className={css(styles.offerWrapper)}>
          {exclusiveOffer.map(offer => (
            <GenericCard
              boxShadow="none"
              key={shortid.generate()}
              padding="0px"
            >
              <div className={css(styles.overflowWrapper, padding.all_3)}>
                <div
                  aria-hidden="true"
                  className={css(margin.bottom_3)}
                >
                  <AccentUpperText
                    color="dark"
                    size="medium"
                    text={offer.type}
                    weight="semiBold"
                  />
                </div>
                {offer.date_until &&
                  <Translatable content={{ transKey: 'room.extended_until', count: 1, replacements: { datetime: offer.date_until } }}>
                    <span className={css(styles.extendedUntil)} />
                  </Translatable>
                }
                {offer.condition &&
                  <Translatable content={{ transKey: offer.condition.condition_key, count: 1, replacements: { hours: offer.condition.value } }}>
                    <span className={css(styles.minOrder)} />
                  </Translatable>
                }
                {offer.available &&
                  <div className={css(styles.promotionDays, margin.top_1)}>
                    {daysOfWeekShort.map(day => (
                      <Translatable
                        content={{ transKey: `common.${day}` }}
                        key={day}
                      >
                        <span className={css(styles.day, margin.bottom_0_25, margin.right_0_25, offer.available.includes(day) ? styles.available : null)} />
                      </Translatable>
                    ))}
                  </div>
                }
                <Translatable content={{ transKey: 'room.promotion' }}>
                  <span className={css(styles.promotionRibbon)} />
                </Translatable>
              </div>
            </GenericCard>
          ))}
        </div>
        <ContentSeparator marginNum={4} />
      </section>
    }
  </React.Fragment>
);

export default RoomExclusiveOffers;

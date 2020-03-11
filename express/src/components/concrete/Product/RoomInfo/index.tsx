/* tslint:disable:max-line-length */
import * as React from 'react';

// Styles
import styles from './styles';

// Components
import EagleVision from '@src/components/abstract/Permissions/EagleVision';
import { MapPin, People, Slider } from '@src/components/concrete/Icons/svgs';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import Item from '@src/components/concrete/Product/RoomInfo/Item';

const RoomInfo = (props) => {
  const { capacity, location, priceRange } = props;
  return (
    <React.Fragment>
      <Item
        desc={<Translatable content={{ transKey: 'room.price_range_hour_day', count: 1, replacements: { currency_left: priceRange.currency.currency_symbol_left, currency_right: priceRange.currency.currency_symbol_right, from: priceRange.hourly_rate_formatted, to: priceRange.daily_rate_formatted } }} />}
        icon={<Slider stylesArray={[styles.icon]} />}
        link="pricing"
        text={<Translatable content={{ transKey: 'common.price' }} />}
      />
      <EagleVision>
        <Item
          desc={<Translatable content={{ transKey: 'room.price_range_hour_day', count: 1, replacements: { currency_left: priceRange.currency.currency_symbol_left, currency_right: priceRange.currency.currency_symbol_right, from: priceRange.venue_hourly_rate_formatted, to: priceRange.venue_daily_rate_formatted } }} />}
          icon={<Slider stylesArray={[styles.icon]} />}
          link="pricing"
          text={<Translatable content={{ transKey: 'room.venue_price_range' }} />}
        />
      </EagleVision>
      <Item
        desc={<Translatable content={{ transKey: 'room.people_capacity', count: 1, replacements: { from: capacity.min_capacity, to: capacity.max_capacity } }} />}
        icon={<People stylesArray={[styles.icon]} />}
        link="details"
        text={<Translatable content={{ transKey: 'listing.capacity' }} />}
      />
      <Item
        desc={`${location.nearest.name} · ${location.nearest.distance}`}
        icon={<MapPin stylesArray={[styles.icon]} />}
        link="location"
        text={<Translatable content={{ transKey: 'common.location' }} />}
      />
    </React.Fragment>
  );
};

export default RoomInfo;

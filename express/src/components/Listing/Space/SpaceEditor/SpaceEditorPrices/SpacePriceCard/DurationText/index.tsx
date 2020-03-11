import * as React from 'react';

// Core
import { durationString } from '@src/core';
import { PriceCoverage, PriceModel, TimeUnit } from '@src/core/domain';

// Components
import Spell from '@src/components/Listing/Translate/Spell';

type Props = {
  maxDuration: number;
  minDuration: number;
  priceModel: PriceModel;
  unit: TimeUnit;
};

const DurationText = ({ maxDuration, minDuration, priceModel, unit }: Props) => {
  if (priceModel === PriceCoverage.MINIMUMSPEND) {
    if (maxDuration > 0) {
      return (
        <Spell
          count={maxDuration}
          replacements={{ duration: durationString(maxDuration) }}
          word="listing.price_max_up_to_hours"
        />
      );
    }
  } else if (priceModel === TimeUnit.HOUR) {
    if (minDuration > 0) {
      return (
        <Spell
          count={minDuration}
          replacements={{ duration: durationString(minDuration) }}
          word="listing.price_minimum_hours"
        />
      );
    }
  } else if (unit === TimeUnit.MONTH) {
    if (minDuration > 0 && maxDuration > 0) {
      if (minDuration === maxDuration) {
        return (
          <Spell
            count={maxDuration}
            replacements={{ duration: maxDuration }}
            word="listing.price_max_up_to_months"
          />
        );
      } else {
        return (
          <Spell
            count={1}
            replacements={{ max: maxDuration, min: minDuration }}
            word="listing.price_between_months"
          />
        );
      }
    } else if (minDuration > 0) {
      return (
        <Spell
          count={minDuration}
          replacements={{ duration: minDuration }}
          word="listing.price_minimum_months"
        />
      );
    } else if (maxDuration > 0) {
      return (
        <Spell
          count={maxDuration}
          replacements={{ duration: maxDuration }}
          word="listing.price_max_up_to_months"
        />
      );
    }
  }
  return null;
};

export default DurationText;

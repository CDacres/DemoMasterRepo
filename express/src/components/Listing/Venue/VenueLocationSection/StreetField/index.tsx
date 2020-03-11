/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import locationStyles from '../styles';

// Components
import FormField from '@src/components/Listing/Form/FormField';
import Headings from '@src/components/Listing/Titles/Headings';
import Expanded from '@src/components/Listing/Layout/Expanded';
import StreetInput from '@src/components/Listing/Venue/VenueLocationSection/StreetField/StreetInput';
import Spell from '@src/components/Listing/Translate/Spell';
import ValidationWrapper from '@src/components/Listing/Form/ValidationWrapper';

// Types
import { AddressFieldProps } from '@src/components/Listing/Venue/VenueLocationSection';

type Props = {
  biasBounds?: any;
  countryCode?: string;
  onValueChange?: (street: string, placeId: string) => void;
} & AddressFieldProps;

const StreetField = ({ biasBounds, countryCode, error, expanded, onValueChange, placeholder, required, value }: Props) => (
  <div className={css(locationStyles.fieldLarge)}>
    <ValidationWrapper errors={error}>
      <FormField
        error={error}
        hidden={!expanded && !value}
        label={<Spell word="listing.road" />}
        required={required}
      >
        <Expanded
          collapsed={
            <Headings tag="h4">
              {value || 'n/a'}
            </Headings>
          }
          open={expanded}
        >
          <StreetInput
            countryCode={countryCode}
            errors={error}
            onBlur={onValueChange}
            options={{ bounds: biasBounds }}
            placeholder={placeholder || 'listing.address_placeholder'}
            value={value || ''}
          />
        </Expanded>
      </FormField>
    </ValidationWrapper>
  </div>
);

export default StreetField;

import * as React from 'react';

// Core
import { Country } from '@src/core/domain';

// Components
import FormField from '@src/components/Listing/Form/FormField';
import SelectInput from '@src/components/Listing/Form/SelectInput';
import SelectOption from '@src/components/Listing/Form/SelectInput/SelectOption';
import Headings from '@src/components/Listing/Titles/Headings';
import Spell from '@src/components/Listing/Translate/Spell';
import ValidationWrapper from '@src/components/Listing/Form/ValidationWrapper';

// Types
import { AddressFieldProps } from '@src/components/Listing/Venue/VenueLocationSection';

type Props = {
  displayValue: string;
  items: Country[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  topItems: Country[];
} & AddressFieldProps;

const CountryCodeField = ({ displayValue, error, expanded, items, onChange, required, topItems, value }: Props) => (
  <ValidationWrapper errors={error}>
    <FormField
      error={error}
      hidden={!expanded && !value}
      label={<Spell word="common.address_country" />}
      required={required}
    >
      {expanded ? (
        <SelectInput
          errors={error}
          name="country"
          onChange={onChange}
          value={value}
        >
          {topItems.map(i => (
            <SelectOption
              key={i.id}
              value={i.id}
            >
              {i.native || i.description}
            </SelectOption>
          ))}
          <SelectOption disabled={true} />
          {items.map((i, k) => (
            <SelectOption
              key={k}
              value={i.id}
            >
              {i.native || i.description}
            </SelectOption>
          ))}
        </SelectInput>
      ) : (
        <Headings tag="h4">
          {displayValue}
        </Headings>
      )}
    </FormField>
  </ValidationWrapper>
);

export default CountryCodeField;

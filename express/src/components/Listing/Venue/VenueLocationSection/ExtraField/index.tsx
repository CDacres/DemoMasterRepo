import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import locationStyles from '../styles';

// Components
import FormField from '@src/components/Listing/Form/FormField';
import TextInput from '@src/components/Listing/Form/TextInput';
import Headings from '@src/components/Listing/Titles/Headings';
import Expanded from '@src/components/Listing/Layout/Expanded';
import Spell from '@src/components/Listing/Translate/Spell';

// Types
import { AddressFieldProps } from '@src/components/Listing/Venue/VenueLocationSection';

type Props = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
} & AddressFieldProps;

const ExtraField = ({ error, expanded, onChange, placeholder, value }: Props) => (
  <div className={css(locationStyles.fieldLarge)}>
    <FormField
      hidden={!expanded && !value}
      label={<Spell word="listing.address_extras" />}
    >
      <Expanded
        collapsed={
          <Headings tag="h4">
            {value}
          </Headings>
        }
        open={expanded}
      >
        <TextInput
          errors={error}
          name="extras"
          onChange={onChange}
          placeholder={placeholder}
          value={value || ''}
        />
      </Expanded>
    </FormField>
  </div>
);

export default ExtraField;

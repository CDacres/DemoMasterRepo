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
import ValidationWrapper from '@src/components/Listing/Form/ValidationWrapper';

// Types
import { AddressFieldProps } from '@src/components/Listing/Venue/VenueLocationSection';

type Props = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
} & AddressFieldProps;

const PostcodeField = ({ error, expanded, onChange, placeholder, required, value }: Props) => (
  <div className={css(locationStyles.fieldSmall)}>
    <ValidationWrapper errors={error}>
      <FormField
        error={error}
        hidden={!expanded && !value}
        label={<Spell word="common.address_postal_code" />}
        required={required}
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
            name="post_code"
            onChange={onChange}
            placeholder={placeholder}
            value={value}
          />
        </Expanded>
      </FormField>
    </ValidationWrapper>
  </div>
);

export default PostcodeField;

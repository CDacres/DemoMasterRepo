import * as React from 'react';

// Components
import Spell from '@src/components/Listing/Translate/Spell';
import TextAdornment from '@src/components/Listing/Form/TextAdornment';

type Props = {
  wrapped?: boolean;
};

const TrailIncludeVAT = ({ wrapped }: Props) => (
  <TextAdornment
    hasEqualPadding={true}
    text={wrapped ? (
      <span>
        (<Spell word="common.incl_vat" />)
      </span>
    ) : (
      <Spell word="common.incl_vat" />
    )}
  />
);

export default TrailIncludeVAT;

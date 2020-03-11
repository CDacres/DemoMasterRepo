import * as React from 'react';

// Components
import Spell from '@src/components/Listing/Translate/Spell';

type Props = {
  is247: boolean;
  isClosed: boolean;
};

const Label = ({ is247, isClosed }: Props) => (
  <React.Fragment>
    {isClosed &&
      <Spell word="common.closed" />
    }
    {is247 &&
      <Spell word="listing.opening_hours_24_hours" />
    }
  </React.Fragment>
);

export default Label;

import * as React from 'react';

// Core
import { specs } from '@src/core/ux';

// Components
import Column from '@src/components/Listing/Layout/Column';
import Strip from '@src/components/Listing/Layout/Strip';
import Anchor from '@src/components/Listing/Buttons/Anchor';
import Spell from '@src/components/Listing/Translate/Spell';

// Models
import { SpaceTagModel } from '@src/components/Listing/Models';

type Props = {
  model: SpaceTagModel;
};

const TagSection = ({ model }: Props) => {
  const currentTags = model.items.filter(item => item.isActive).map(item => item.description).join(', ');
  return (
    <Column gap="8px">
      <Strip
        colGap="16px"
        cols="2fr auto"
        itemsHorz="start"
        margin="0px 0px 8px 0px"
        padding="8px 16px 8px 8px"
        style={{ border: specs.boxBorder }}
      >
        <div>
          {currentTags}
        </div>
        <Anchor onClick={model.edit}>
          <Spell word="common.edit" />
        </Anchor>
      </Strip>
    </Column>
  );
};

export default TagSection;

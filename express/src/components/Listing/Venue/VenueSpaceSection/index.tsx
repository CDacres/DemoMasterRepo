import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Core
import { ListingsV1Space } from '@src/core/domain';
import { spaceKindCatalog } from '@src/core/meta';
import { specs } from '@src/core/ux';

// Styles
import styles from './styles';

// Components
import Anchor from '@src/components/Listing/Buttons/Anchor';
import Strip from '@src/components/Listing/Layout/Strip';
import Prices from '@src/components/Listing/Venue/VenueSpaceSection/Prices';
import Thumbnail from '@src/components/Listing/Venue/VenueSpaceSection/Thumbnail';
import Spell from '@src/components/Listing/Translate/Spell';

// Models
import { VenueSpaceModel } from '@src/components/Listing/Models';

type Props = {
  model: VenueSpaceModel;
  onEdit: VoidFunction;
  space: ListingsV1Space;
};

const VenueSpaceSection = ({ model, onEdit, space }: Props) => {
  let imgSrc = null;
  const spaceType = spaceKindCatalog.byId[space.kind];
  if (!spaceType.enablePictures && model.parent.venue.images.any()) {
    imgSrc = model.parent.venue.images.filter(x => x.orderIndex === 0).first().image.urls.thumbUrl;
  } else if (space.images.any()) {
    imgSrc = space.images.filter(x => x.orderIndex === 0).first().image.urls.thumbUrl;
  }
  return (
    <Strip
      colGap="16px"
      cols="auto 2fr 1fr auto"
      itemsHorz="start"
      margin="0px 0px 8px 0px"
      padding="8px 16px 8px 8px"
      style={{
        border: specs.boxBorder,
        boxShadow: specs.boxShadow,
      }}
    >
      <Thumbnail
        size={{
          height: '94px',
          width: '128px',
        }}
        src={imgSrc}
      />
      <span className={css(styles.name)}>
        {space.name}
      </span>
      <Strip>
        <Prices space={space} />
      </Strip>
      <Anchor onClick={onEdit}>
        <Spell word="common.edit" />
      </Anchor>
    </Strip>
  );
};

export default VenueSpaceSection;

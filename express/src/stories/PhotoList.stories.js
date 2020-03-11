import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Container from './container';

import PhotoList from '@src/components/concrete/PhotoList';

storiesOf('Photo List', module)
  .add('photos', () => {
    const photos = Array.from({ length: 6 }, (v, k) => k).map(k => ({
      name: '6310f11a6e9b86068d526c0d073be3bd.jpg',
      isFeatured: true,
      largeUrl: 'http://zipcube.local/images/22859/639_428_6310f11a6e9b86068d526c0d073be3bd.jpg',
      created: '2018-04-23 08:43:11',
      id: `31674${k}`,
      type: 'asset_images',
      typeId: '1',
      assetType: 'venue'
    }));
    return (
      <Container>
        <PhotoList images={photos} />
      </Container>
    );
  });

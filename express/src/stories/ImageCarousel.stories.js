import * as React from 'react';
import { storiesOf } from '@storybook/react';
import faker from 'faker';

import Container from './container';

import ImageCarousel from '@src/components/concrete/ImageCarousel';

storiesOf('Image Carousel', module)
  .add('with navigation', () => {
    const images = [];
    for (let i = 0; i < 12; i++) {
      images.push({
        url: faker.image.abstract(500, 333)
      });
    }
    return (
      <Container>
        <div
          style={{
            width: '500px',
            margin: '0 auto'
          }}
        >
          <ImageCarousel
            images={images}
            linkUrl="/rooms/123"
            title="Monkeytown"
          />
        </div>
      </Container>
    );
  });

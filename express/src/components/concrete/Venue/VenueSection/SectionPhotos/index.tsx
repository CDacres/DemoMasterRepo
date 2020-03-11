import * as React from 'react';
import { css } from 'aphrodite/no-important';
import shortid from 'shortid';

// Styles
import { pagestyles } from '@src/styles';

// Components
import Image from '@src/components/concrete/Venue/VenueSection/SectionPhotos/Image';

type Props = {
  images: Array<{
    isSmallImage: boolean;
    src: string;
  }>;
};

const SectionPhotos = ({ images }: Props) => (
  <section>
    <div className={css(pagestyles.row, pagestyles.clearfix)}>
      {images.map(({ isSmallImage, src }, index) => (
        <Image
          isFirstImage={index === 0}
          isSmallImage={isSmallImage}
          key={shortid.generate()}
          src={src}
        />
      ))}
    </div>
  </section>
);

export default SectionPhotos;

import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { pagestyles } from '@src/styles';

// Components
import BrowserLink from '@src/components/abstract/Link';
import ColumnImage from '@src/components/concrete/Info/Images/ColumnImage';
import ImageWrapper from '@src/components/concrete/Info/Images/ImageWrapper';

type Props = {
  height: string;
  href: string;
  src: string;
  width: string;
};

const LinkImage = ({ height, href, src, width }: Props) => (
  <BrowserLink
    className={css(pagestyles.linkBlack)}
    href={href}
  >
    <ImageWrapper
      height={height}
      width={width}
    >
      <ColumnImage
        height={height}
        src={src}
        width={width}
      />
    </ImageWrapper>
  </BrowserLink>
);

export default LinkImage;

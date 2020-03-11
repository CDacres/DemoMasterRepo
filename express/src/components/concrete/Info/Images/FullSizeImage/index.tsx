/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, padding, pagestyles } from '@src/styles';

// Components
import SectionInner from '@src/components/concrete/Info/Section/SectionInner';
import BaseImage from '@src/components/concrete/Info/Images/BaseImage';
import ImageWrapper from '@src/components/concrete/Info/Images/ImageWrapper';

type Props = {
  height: string;
  src: string;
  width: string;
};

const FullSizeImage = ({ height, width, src }: Props) => (
  <SectionInner hasHiddenFont={true}>
    <div className={css(pagestyles.row, pagestyles.clearfix)}>
      <div className={css(pagestyles.column, pagestyles.fullColumnSmallScreen, pagestyles.fullColumnLargeScreen, padding.leftright_1)}>
        <div className={css(margin.bottom_0, margin.bottom_0_large)}>
          <div className={css(margin.leftright_0)}>
            <div>
              <ImageWrapper
                height={height}
                width={width}
              >
                <BaseImage
                  height={height}
                  src={src}
                  width={width}
                />
              </ImageWrapper>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SectionInner>
);

export default FullSizeImage;

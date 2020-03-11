import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin } from '@src/styles';

// Components
import { FullScreenModal } from '@src/components/abstract/MediaQuery';
import ImageColumnLayout from '@src/components/concrete/Info/Columns/ImageColumnLayout';
import SectionInner from '@src/components/concrete/Info/Section/SectionInner';
import LinkImage from '@src/components/concrete/Info/Images/LinkImage';
import ColumnImage from '@src/components/concrete/Info/Images/ColumnImage';
import Quote from '@src/components/concrete/Info/Columns/ImageQuote/Quote';

type Props = {
  buttonText?: string;
  height: string;
  href?: string;
  imageFirst?: boolean;
  quoteSubText: string;
  quoteText: string;
  src: string;
  width: string;
};

const ImageQuote = ({ buttonText, height, href, imageFirst, quoteSubText, quoteText, src, width }: Props) => (
  <SectionInner hasHiddenFont={true}>
    <div>
      <FullScreenModal>
        {matches => {
          if (matches) {
            return (
              <React.Fragment>
                {href ? (
                  <LinkImage
                    height={height}
                    href={href}
                    src={src}
                    width={width}
                  />
                ) : (
                  <ColumnImage
                    height={height}
                    src={src}
                    width={width}
                  />
                )}
                <div className={css(margin.top_3)}>
                  <div />
                </div>
                <Quote
                  buttonText={buttonText}
                  href={href}
                  isSmall={true}
                  quoteSubText={quoteSubText}
                  quoteText={quoteText}
                />
              </React.Fragment>
            );
          } else {
            return (
              <ImageColumnLayout
                columnCount={3}
                image={href ? (
                  <LinkImage
                    height={height}
                    href={href}
                    src={src}
                    width={width}
                  />
                ) : (
                  <ColumnImage
                    height={height}
                    src={src}
                    width={width}
                  />
                )}
                imageFirst={imageFirst}
                text={
                  <Quote
                    buttonText={buttonText}
                    href={href}
                    isSmall={true}
                    quoteSubText={quoteSubText}
                    quoteText={quoteText}
                  />
                }
              />
            );
          }
        }}
      </FullScreenModal>
    </div>
  </SectionInner>
);

export default ImageQuote;

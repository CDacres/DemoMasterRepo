import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import { FullScreenModal } from '@src/components/abstract/MediaQuery';
import ImageColumnLayout from '@src/components/concrete/Info/Columns/ImageColumnLayout';
import Title from '@src/components/concrete/Info/Columns/Title';
import SectionInner from '@src/components/concrete/Info/Section/SectionInner';
import ColumnImage from '@src/components/concrete/Info/Images/ColumnImage';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  description: string;
  height: string;
  imageFirst?: boolean;
  src: string;
  title: string;
  width: string;
};

const ImageText = ({ description, height, imageFirst, src, title, width }: Props) => (
  <SectionInner hasHiddenFont={true}>
    <div>
      <FullScreenModal>
        {matches => {
          if (matches) {
            return (
              <React.Fragment>
                <ColumnImage
                  height={height}
                  src={src}
                  width={width}
                />
                <div className={css(margin.top_3)}>
                  <div />
                </div>
                <div>
                  <Title title={title} />
                  <div className={css(pagestyles.description, margin.all_0)}>
                    <div className={css(styles.textWrapper)}>
                      <div>
                        <Translatable content={{ transKey: description }}>
                          <p />
                        </Translatable>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          } else {
            return (
              <ImageColumnLayout
                columnCount={4}
                image={
                  <ColumnImage
                    height={height}
                    src={src}
                    width={width}
                  />
                }
                imageFirst={imageFirst}
                text={
                  <div>
                    <Title title={title} />
                    <div className={css(pagestyles.description, margin.all_0)}>
                      <div className={css(styles.textWrapper)}>
                        <div>
                          <Translatable content={{ transKey: description }}>
                            <p />
                          </Translatable>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              />
            );
          }
        }}
      </FullScreenModal>
    </div>
  </SectionInner>
);

export default ImageText;

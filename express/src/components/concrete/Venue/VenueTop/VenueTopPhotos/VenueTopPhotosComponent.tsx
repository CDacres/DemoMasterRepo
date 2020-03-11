/* tslint:disable:max-line-length */
import * as React from 'react';
import shortid from 'shortid';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import VenueSection from '@src/components/concrete/Venue/VenueSection';
import TopContentWrapper from '@src/components/concrete/Venue/VenueTop/TopContentWrapper';
import { ProductLargeScreen } from '@src/components/abstract/MediaQuery';
import ImageWrapper from '@src/components/concrete/Venue/VenueTop/VenueTopPhotos/ImageWrappers/ImageWrapper';
import MobileImageWrapper from '@src/components/concrete/Venue/VenueTop/VenueTopPhotos/ImageWrappers/MobileImageWrapper';
import AnimationLine from '@src/components/concrete/Venue/VenueTop/VenueTopPhotos/AnimationLine';
import AnimationButton from '@src/components/concrete/Venue/VenueTop/VenueTopPhotos/AnimationButton';
import { Chevron } from '@src/components/concrete/Icons/svgs';
import ProductIconButtons from '@src/components/concrete/ProductIconButtons';
import Button from '@src/components/concrete/Button';

type Props = {
  images: Array<{
    isSmallImage: boolean;
    src: string;
  }>;
  like: boolean;
  likeAction: (e?: any) => void;
  shareAction: (e?: any) => void;
};

const VenueTopPhotosComponent = ({ images, like, likeAction, shareAction }: Props) => (
  <React.Fragment>
    <div className={css(styles.saveIconsWrapper)}>
      <div className={css(styles.saveIconsContainer)}>
        <ProductIconButtons
          action={shareAction}
          icon="share"
        />
        <ProductIconButtons
          action={likeAction}
          icon="heart"
          like={like}
          needsLeftMargin={true}
        />
      </div>
    </div>
    <VenueSection topSection={true}>
      <ProductLargeScreen>
        {matches => {
          if (matches) {
            return (
              <TopContentWrapper images={true}>
                <div className={css(styles.fullScreenInner, padding.top_4)}>
                  {/* TODO: design needed for when there isn't 5 images */}
                  <div className={css(styles.imgWrapper, margin.right_1)}>
                    <ImageWrapper src={images[0].src} />
                  </div>
                  <div className={css(styles.imgWrapper, margin.right_1)}>
                    <ImageWrapper src={images[1].src} />
                  </div>
                  <div className={css(styles.smallImageWrapper)}>
                    <div className={css(styles.topImgWrapper)}>
                      <ImageWrapper src={images[2].src} />
                    </div>
                    <div className={css(margin.top_1)} />
                    <div className={css(styles.topImgWrapper)}>
                      <ImageWrapper src={images[3].src} />
                    </div>
                  </div>
                  <div className={css(styles.imgWrapper, margin.left_1)}>
                    <ImageWrapper src={images[4].src} />
                  </div>
                </div>
              </TopContentWrapper>
            );
          }
          return (
            <div className={css(styles.mobileContainer)}>
              <div className={css(styles.mobileInner)}>
                <aside className={css(styles.mobileOut)}>
                  <div className={css(styles.mobileIn)}>
                    <div className={css(styles.mobileContent)}>
                      {images.map(item => (
                        <MobileImageWrapper
                          key={shortid.generate()}
                          src={item.src}
                        />
                      ))}
                    </div>
                  </div>
                  <div className={css(styles.animationWrapper)}>
                    <div className={css(styles.mobileInner)}>
                      <div className={css(styles.break)} />
                      <div className={css(styles.animationInner)}>
                        <div className={css(styles.buttonsWrapper)}>
                          <div className={css(styles.buttonsContainer)}>
                            <Button stylesArray={[styles.buttonWrapper, styles.buttonLeft, padding.all_0]}>
                              <div className={css(styles.innerWrapper, styles.leftInner)}>
                                <Chevron
                                  direction="left"
                                  stylesArray={[pagestyles.icon, pagestyles.icon19, pagestyles.iconWhite]}
                                />
                              </div>
                            </Button>
                            <Button stylesArray={[styles.buttonWrapper, styles.buttonRight, padding.all_0]}>
                              <div className={css(styles.innerWrapper, styles.rightInner)}>
                                <Chevron
                                  direction="right"
                                  stylesArray={[pagestyles.icon, pagestyles.icon19, pagestyles.iconWhite]}
                                />
                              </div>
                            </Button>
                          </div>
                        </div>
                        <div className={css(styles.bottomElement)}>
                          <div className={css(styles.bottomElementWrapper, padding.all_2)}>
                            <div className={css(styles.bottomBreak)} />
                            <AnimationButton value={{ play: true }} />
                            <div className={css(styles.lineWrapper)}>
                              <div className={css(styles.lineContainer)}>
                                <div className={css(styles.lineInner)}>
                                  {images.map((_, index) => (
                                    <AnimationLine
                                      key={shortid.generate()}
                                      play={index === 0}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          );
        }}
      </ProductLargeScreen>
    </VenueSection>
  </React.Fragment>
);

export default VenueTopPhotosComponent;

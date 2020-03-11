import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import ZipcubeBrand from '@src/components/concrete/ZipcubeBrand';
import Button from '@src/components/concrete/Button';
import { Chevron } from '@src/components/concrete/Icons/svgs';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import GenericHeader from '@src/components/concrete/GenericHeader';

type Props = {
  image: string;
  subtitle?: string;
  title?: string;
  url?: string;
  withZipcubeLogo?: boolean;
};

const FullBanner = ({ image, subtitle, title, url, withZipcubeLogo }: Props) => (
  <div className={css(styles.bannerWrapper)}>
    <div className={css(styles.bannerContainer, margin.all_0, padding.leftright_10)}>
      <div>
        <div>
          <span className={css(pagestyles.hideFont)} />
          <div>
            <div className={css(styles.bannerImageContainer)}>
              <div className={css(styles.bannerInnerWrapper)}>
                <div className={css(styles.bannerImageInner)}>
                  <img
                    className={css(styles.bannerImage)}
                    role="presentation"
                    sizes="100vw"
                    src={image}
                  />
                </div>
              </div>
              <div className={css(styles.bannerInnerWrapper)}>
                <div className={css(styles.bannerTitleWrapper)}>
                  <div className={css(pagestyles.tableCellMiddle)}>
                    <div className={css(pagestyles.centeredText, margin.all_3)}>
                      {title &&
                        <GenericHeader
                          stylesArray={[styles.bannerTitle, margin.all_0, padding.all_0]}
                          tag="h1"
                          text={title}
                        />
                      }
                      {subtitle &&
                        <div className={css(margin.top_1_5, margin.bottom_2)}>
                          <div className={css(pagestyles.text, margin.all_0)}>
                            <div className={css(styles.bannerSubtitleText)}>
                              {subtitle}
                            </div>
                          </div>
                        </div>
                      }
                      {url &&
                        <Button
                          href={`${url}#scroll`}
                          stylesArray={[styles.bannerButton]}
                        >
                          <span className={css(styles.bannerButtonInner, margin.all_0)}>
                            <Translatable content={{ transKey: 'widget.banner_button' }} />
                            <span className={css(styles.bannerButtonIcon, padding.left_0_75)}>
                              <Chevron
                                direction="right"
                                role="img"
                                stylesArray={[styles.icon]}
                              />
                            </span>
                          </span>
                        </Button>
                      }
                      {withZipcubeLogo &&
                        <div className={css(margin.top_1_5, margin.bottom_2)}>
                          <div className={css(pagestyles.text)}>
                            <div className={css(styles.bannerSubtitleText)}>
                              <Translatable content={{ transKey: 'common.by' }} />
                              {' '}
                              <ZipcubeBrand
                                fill="#ffffff"
                                hideSmallScreen={false}
                              />
                            </div>
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default FullBanner;

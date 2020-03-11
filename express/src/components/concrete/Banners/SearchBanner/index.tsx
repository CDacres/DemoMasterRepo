/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import ZipcubeBrand from '@src/components/concrete/ZipcubeBrand';
import Button from '@src/components/concrete/Button';
import { Chevron, PinkLine } from '@src/components/concrete/Icons/svgs';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  image: string;
  subtitle?: string;
  title?: string;
  url?: string;
};

const SearchBanner = ({ image, subtitle, title, url }: Props) => (
  <div className={css(styles.bannerWrapper)}>
    <div className={css(styles.bannerContainer, padding.leftright_3)}>
      <div
        data-container-name="explore"
        itemProp="itemList"
        itemScope={true}
        itemType="http://schema.org/ItemList"
      >
        <div>
          <div className={css(margin.bottom_0)}>
            <div>
              <div>
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
                          <div className={css(styles.bannerTitleInner, pagestyles.pageContainerTextAlignLarge, margin.bottom_8_large, margin.top_8_large)}>
                            <div className={css(styles.bannerTitleIcon)}>
                              <ZipcubeBrand
                                fill="#ffffff"
                                hideSmallScreen={false}
                              />
                            </div>
                            {title &&
                              <section>
                                <div className={css(styles.bannerTitleTextWrapper, padding.topbottom_0_75, padding.all_0_large)}>
                                  <span className={css(pagestyles.inlineBlock, pagestyles.relativePosition, margin.bottom_2, padding.top_7)}>
                                    {title}
                                    <div className={css(styles.bannerTitleLineIconWrapper, padding.all_0)}>
                                      <PinkLine stylesArray={[styles.bannerTitleLineIcon]} />
                                    </div>
                                  </span>
                                </div>
                              </section>
                            }
                            {subtitle &&
                              <div className={css(styles.bannerSubtitleWrapper, margin.bottom_2)}>
                                <div className={css(pagestyles.text, margin.all_0)}>
                                  <div className={css(styles.bannerSubtitleText)}>
                                    {subtitle}
                                  </div>
                                </div>
                              </div>
                            }
                            {url &&
                              <Button
                                href={url}
                                stylesArray={[styles.bannerButton]}
                              >
                                <span className={css(styles.bannerButtonWrapper, padding.topbottom_0)}>
                                  <span className={css(pagestyles.smallSubtitle, pagestyles.fontBlack, margin.all_0)}>
                                    <span className={css(styles.bannerButtonInner, padding.leftright_1)}>
                                      <Translatable content={{ transKey: 'common.learn_more' }} />
                                      <span className={css(styles.bannerButtonIcon, padding.left_0_75)}>
                                        <Chevron
                                          direction="right"
                                          role="img"
                                          stylesArray={[styles.icon]}
                                        />
                                      </span>
                                    </span>
                                  </span>
                                </span>
                              </Button>
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
      </div>
    </div>
  </div>
);

export default SearchBanner;

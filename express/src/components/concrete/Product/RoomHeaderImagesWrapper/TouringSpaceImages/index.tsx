/* tslint:disable:max-line-length */
import * as React from 'react';
import shortid from 'shortid';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import AccentUpperText from '@src/components/concrete/Product/AccentUpperText';
import GenericHeader from '@src/components/concrete/GenericHeader';
import Gallery from '@src/components/abstract/Gallery';
import Button from '@src/components/concrete/Button';
import CloseButton from '@src/components/concrete/Button/CloseButton';

// Types
import { ActionLink } from '@src/typings/types';

type Props = {
  images: { [prop: string]: string };
  likeButtonAction: (e?: any) => void;
  likeIcon: JSX.Element;
  name: string;
  shareButtonAction: (e?: any) => void;
  shareIcon: JSX.Element;
  title: string;
} & ActionLink;

const imagesSizes = [ // images sizes ratios for photos grid
  [[2, 1], [2, 1], [1, 1.02], [2, 1]],
  [[2, 1], [1, 1], [2, 2], [2, 1]],
  [[3, 3.15], [3, 1], [3, 1], [3, 1]],
  [[2, 1], [2, 1], [2, 1], [2, 1]],
];

const preparePhotos = (images) => {
  // TODO: temporary function is for imitation of enough number of photos (replace this with real data)
  const length = 16;
  const photos = [];
  for (let i = 0; i < length; i++) {
    photos.push(images.main);
  }
  const photosGrid = imagesSizes.map(el => {
    return el.map(_ => ({
      src: images.main,
      width: 2,
      height: 1,
      key: shortid.generate(),
    }));
  });
  return photosGrid;
};

const TouringSpaceImages = ({ action, images, likeButtonAction, likeIcon, name, shareButtonAction, shareIcon, title }: Props) => {
  const photos = preparePhotos(images);
  return (
    <div className={css(styles.touringContainer)}>
      <div className={css(styles.touringTopBarContainer)}>
        <div className={css(styles.touringTopBarLeft)}>
          <div className={css(styles.touringTopBarWrapper)}>
            <div className={css(pagestyles.tableCellMiddle)}>
              <div>
                <div>
                  <CloseButton
                    action={action}
                    customStyle={[styles.closeButton]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={css(styles.touringTopBarRight)}>
          <div className={css(styles.touringTopBarWrapper)}>
            <div className={css(pagestyles.tableCellMiddle)}>
              <div className={css(styles.touringRightWrapper)}>
                <div className={css(pagestyles.inlineBlock)}>
                  <Button
                    action={shareButtonAction}
                    stylesArray={[styles.iconButton, margin.all_0, padding.all_0]}
                  >
                    {shareIcon}
                  </Button>
                </div>
                <div className={css(pagestyles.inlineBlock, margin.left_4)}>
                  <Button
                    action={likeButtonAction}
                    stylesArray={[styles.iconButton, margin.all_0, padding.all_0]}
                  >
                    {likeIcon}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={css(styles.touringWrapper)}>
        <div className={css(styles.touringInner1)}>
          <div className={css(styles.touringInner2, padding.bottom_16)}>
            <div className={css(pagestyles.pageContainer, pagestyles.pageContainerAutoWidth, pagestyles.pageContainerChangeableWidthSmall, pagestyles.pageContainerChangeableWidthLarge, pagestyles.pageContainerWithSelectors, pagestyles.pageContainerWithSelectorsWithContent, padding.leftright_1_5, padding.leftright_3_small)}>
              <div className={css(styles.header)}>
                <AccentUpperText text={title} />
                <GenericHeader
                  tag="h2"
                  text={name}
                />
              </div>
              {photos.map((section, index) => {
                if (index === 0) {
                  return (
                    <div
                      className={css(styles.photosBlock)}
                      key={shortid.generate()}
                    >
                      <Gallery
                        first={true}
                        key={shortid.generate()}
                        photos={section}
                      />
                    </div>
                  );
                }
                return (
                  <div
                    className={css(styles.photosBlock)}
                    key={shortid.generate()}
                  >
                    <GenericHeader
                      tag="h2"
                      text="Another section of photos"
                      // TODO: translation key
                    />
                    <Gallery
                      key={shortid.generate()}
                      photos={section}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TouringSpaceImages;

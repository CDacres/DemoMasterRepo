/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import Button from '@src/components/concrete/Button';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import { NineDot, Spacer } from '@src/components/concrete/Icons/svgs';
import TouringSpaceImages from '@src/components/concrete/Product/RoomHeaderImagesWrapper/TouringSpaceImages';
import Stars from '@src/components/concrete/Stars';
import { LargeScreen } from '@src/components/abstract/MediaQuery';
import ProductIconButtons from '@src/components/concrete/ProductIconButtons';
import HeartIcon from '@src/components/concrete/ProductIconButtons/HeartIcon';
import ShareIcon from '@src/components/concrete/ProductIconButtons/ShareIcon';

// Types
import { RoomReviews } from '@src/typings/types';

type Props = {
  images: {
    main: string;
    secondary?: string;
    tertiary?: string;
  };
  name: string;
  openSharing?: (e?: any) => void;
  openTouring?: (e?: any) => void;
  review: RoomReviews.VenueReview;
  title: string;
};

type State = {
  isTouring: boolean;
  like: boolean;
};

class RoomHeaderImagesWrapper extends React.Component<Props, State> {
  state: State = {
    isTouring: false,
    like: false,
  };

  shareButton = () => {
    if (this.props.openSharing) {
      this.props.openSharing();
    }
  }

  likeButton = () => this.setState({
    ...this.state,
    like: !this.state.like,
    // TODO: add favourite to db
  })

  tourThisSpace = () => {
    this.setState({
      ...this.state,
      isTouring: !this.state.isTouring,
    });
    if (this.props.openTouring) {
      this.props.openTouring();
    }
  }

  renderLike = () => {
    const { like } = this.state;
    return (
      <HeartIcon like={like} />
    );
  }

  renderShare = () => (
    <ShareIcon />
  )

  render() {
    const { images, name, review, title } = this.props;
    const { isTouring, like } = this.state;
    return (
      <div className={css(isTouring ? styles.touring : styles.wrapper)}>
        {isTouring ? (
          <TouringSpaceImages
            action={this.tourThisSpace}
            images={images}
            likeButtonAction={this.likeButton}
            likeIcon={this.renderLike()}
            name={name}
            shareButtonAction={this.shareButton}
            shareIcon={this.renderShare()}
            title={title}
          />
        ) : (
          <div className={css(pagestyles.row, pagestyles.clearfix)}>
            <LargeScreen>
              {matches => {
                if (matches) {
                  return (
                    <div className={css(styles.asideImagesContainer, pagestyles.column, pagestyles.thirdColumnLargeScreen, padding.leftright_1)}>
                      {images.tertiary ? (
                        <React.Fragment>
                          <div className={css(styles.asideImageRow)}>
                            <div
                              className={css(styles.image)}
                              onClick={this.tourThisSpace}
                              style={{ backgroundImage: `url(${images.secondary})` }}
                            />
                          </div>
                          <div className={css(styles.asideImageRow)}>
                            <div
                              className={css(styles.image)}
                              onClick={this.tourThisSpace}
                              style={{ backgroundImage: `url(${images.tertiary})` }}
                            />
                          </div>
                        </React.Fragment>
                      ) : (
                        <div className={css(styles.imageWrapper, styles.asideNoImages)}>
                          <div>
                            <Spacer stylesArray={[styles.spacer]} />
                          </div>
                          <div className={css(margin.top_3)}>
                            <span className={css(styles.asideNoImagesTitle)}>
                              {name}
                            </span>
                          </div>
                          {review &&
                            <div className={css(styles.asideNoImagesReview, margin.top_3)}>
                              <span className={css(styles.asideNoImagesReviewText)}>
                                "{review.text.substring(0, 150) + '...'}"
                              </span>
                              {' '}
                              <span className={css(styles.asideNoImagesReviewPerson)}>
                                {review.owner_first_name}
                              </span>
                              <div>
                                <Stars
                                  rating={review.ranking}
                                  size="large"
                                />
                              </div>
                            </div>
                          }
                        </div>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            </LargeScreen>
            <div className={css(styles.mainImage, pagestyles.column, pagestyles.fullColumn, pagestyles.twoThirdsColumnLargeScreen, pagestyles.columnFloat, padding.leftright_1)}>
              <button
                aria-hidden="true"
                className={css(styles.mainImageButton)}
                onClick={this.tourThisSpace}
              >
                <div className={css(styles.imageWrapper)}>
                  <div className={css(styles.imageContainer)}>
                    <div
                      className={css(styles.image)}
                      style={{ backgroundImage: `url(${images.main})` }}
                    />
                  </div>
                </div>
              </button>
              <div className={css(styles.buttonsWrapper)}>
                <div className={css(styles.buttonsContainer)}>
                  <ProductIconButtons
                    action={this.shareButton}
                    icon="share"
                  />
                  <ProductIconButtons
                    action={this.likeButton}
                    icon="heart"
                    like={like}
                    needsLeftMargin={true}
                  />
                </div>
              </div>
              <div className={css(styles.tourThisSpaceBox)}>
                <Button
                  action={this.tourThisSpace}
                  stylesArray={[styles.tourThisSpace]}
                >
                  <span className={css(pagestyles.inlineBlockMiddle, margin.right_1_5)}>
                    <NineDot />
                  </span>
                  <small className={css(styles.buttonText)}>
                    <Translatable content={{ transKey: 'room.tour_this_space' }} />
                  </small>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default RoomHeaderImagesWrapper;

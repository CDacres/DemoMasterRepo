/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import Stars from '@src/components/concrete/Stars';
import CustomerReview from '@src/components/concrete/Product/CustomerReview';
import Pagination from '@src/components/concrete/Pagination';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import GenericHeader from '@src/components/concrete/GenericHeader';

// Types
import { Review, ReviewRating } from '@src/core/domain';

type Props = {
  inVenuePage?: boolean;
  per_page: number;
  rating: ReviewRating;
  reviews: Review[];
};

type State = {
  currentPage: number;
};

class RoomReviews extends React.PureComponent<Props, State> {
  state: State = { currentPage: 0 };

  paginate = (arr: Review[]) => {
    const { per_page } = this.props;
    const start = this.state.currentPage * per_page;
    const end = (this.state.currentPage * per_page) + per_page;
    return arr.slice(start, end);
  }

  render() {
    const { inVenuePage, per_page, rating, reviews } = this.props;
    const { currentPage } = this.state;
    const reviewsToDisplay = this.paginate(reviews);
    const lastPage = Math.ceil(reviews.length / per_page);
    return (
      <React.Fragment>
        {(reviews.length > 0) &&
          <section id="reviews">
            {!inVenuePage &&
              <React.Fragment>
                <div className={css(styles.reviewsContainer)}>
                  <div className={css(pagestyles.tableCellBottom)}>
                    <GenericHeader stylesArray={[styles.title, margin.right_2]}>
                      <Translatable content={{ transKey: 'common.reviews_count', count: rating.count, replacements: { number: rating.count } }} />
                    </GenericHeader>
                    <div className={css(pagestyles.inlineBlock)}>
                      <Stars
                        rating={rating.avg}
                        size="large"
                      />
                    </div>
                  </div>
                </div>
                <ContentSeparator marginNum={2} />
              </React.Fragment>
            }
            {reviewsToDisplay.map(rev => (
              <CustomerReview
                inVenuePage={inVenuePage}
                key={rev.id}
                review={rev}
              />
            ))}
            {lastPage > 1 &&
            <Pagination
              currentPage={currentPage}
              lastPage={lastPage}
            />
            }
          </section>
        }
      </React.Fragment>
    );
  }
}

export default RoomReviews;

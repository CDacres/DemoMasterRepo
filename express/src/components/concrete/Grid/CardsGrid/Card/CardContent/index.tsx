/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin } from '@src/styles';

// Components
import CardCategory from '@src/components/concrete/Grid/CardsGrid/Card/CardContent/CardCategory';
import ReviewsSection from '@src/components/concrete/ReviewsSection';
import BrowserLink from '@src/components/abstract/Link';
import CardTitle from '@src/components/concrete/Grid/CardsGrid/Card/CardContent/CardTitle';

type Props = {
  badge?: string;
  category?: string;
  children: JSX.Element;
  color?: string;
  link?: string;
  newTab?: boolean;
  rating?: number;
  reviewsCount?: number;
  text?: string;
  title?: string;
};

const CardContent: React.FunctionComponent<Props> = ({ badge, category, children, color, link, newTab, rating, reviewsCount, title }) => (
  <BrowserLink
    attributes={{ title: { transKey: title } }}
    className={css(styles.contentAnchor)}
    data-check-info-section="true"
    href={link}
    rel="noopener"
    {...(newTab ? { target: '_blank' } : {})}
  >
    <React.Fragment>
      {category &&
        <CardCategory
          badge={badge}
          category={category}
          color={color}
        />
      }
      {title &&
        <CardTitle title={title} />
      }
      <div className={css(margin.top_0_25)}>
        {children}
      </div>
      {reviewsCount > 0 &&
        <ReviewsSection
          rating={rating}
          reviewsCount={reviewsCount}
        />
      }
    </React.Fragment>
  </BrowserLink>
);

CardContent.defaultProps = { newTab: true };

export default CardContent;

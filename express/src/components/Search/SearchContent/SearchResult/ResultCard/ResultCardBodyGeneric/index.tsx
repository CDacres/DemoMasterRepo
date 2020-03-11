/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import cardStyles from '../styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import CardCategory from '@src/components/concrete/Grid/CardsGrid/Card/CardContent/CardCategory';
import ResultReviews from '@src/components/Search/SearchContent/SearchResult/ResultCard/ResultReviews';
import BrowserLink from '@src/components/abstract/Link';

// Types
import { SearchResult } from '@src/typings/types';

type Props = {
  bottomSection?: JSX.Element;
  data: SearchResult;
  resultUrl: string;
  secondLine: JSX.Element;
  tag: string;
};

const ResultCardBodyGeneric = ({ bottomSection, data: { category, rating, reviewsCount, reviewsCountString, sponsored, title }, resultUrl, secondLine }: Props) => (
  <div className={css(padding.top_1_5)}>
    <BrowserLink
      className={css(cardStyles.resultCardBodyLink, cardStyles.textColor)}
      data-check-info-section="true"
      href={resultUrl}
      rel="noopener"
      target="_blank"
    >
      <div role="text">
        <CardCategory
          category={`${!!sponsored ? 'Ad · ' : ''} ${category}`}
          color="#767676"
        />
        <div className={css(margin.top_0_5)}>
          <div className={css(cardStyles.resultCardBodyTitleContainer, pagestyles.textMap)}>
            <div className={css(cardStyles.resultCardBodyTitleText, cardStyles.textColor, margin.all_0)}>
              <div className={css(cardStyles.resultCardBodyTitleTextInner)}>
                {title}
              </div>
            </div>
          </div>
        </div>
        <div className={css(cardStyles.cardSecondLineContainer, pagestyles.textMap, margin.top_0_25)}>
          <div className={css(cardStyles.cardSecondLineText)}>
            {secondLine &&
              <React.Fragment>
                {secondLine}
              </React.Fragment>
            }
          </div>
        </div>
        {reviewsCount > 0 &&
          <div className={css(margin.top_0_25)}>
            <ResultReviews
              rating={rating}
              reviewsCountString={reviewsCountString}
            />
          </div>
        }
        {bottomSection &&
          <React.Fragment>
            {bottomSection}
          </React.Fragment>
        }
      </div>
    </BrowserLink>
  </div>
);

export default ResultCardBodyGeneric;

/*
 <span className={css(cardStyles.reviewSectionText)}>
  <span aria-hidden="true"> · </span>
  <span>Superhost</span>
</span>
*/

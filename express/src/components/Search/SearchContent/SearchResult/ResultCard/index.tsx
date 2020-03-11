import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import searchResultStyles from '../styles';

// Components
import ResultCardHead from '@src/components/Search/SearchContent/SearchResult/ResultCard/ResultCardHead';
import FavouriteButton from '@src/components/Search/SearchContent/SearchResult/ResultCard/ResultCardHead/FavouriteButton';
import ResultCardBody from '@src/components/Search/SearchContent/SearchResult/ResultCard/ResultCardBody';
import ResultCardBodyOffice from '@src/components/Search/SearchContent/SearchResult/ResultCard/ResultCardBodyOffice';

// Types
import { SearchResult } from '@src/typings/types';

type Props = {
  currencySymbol: string;
  data: SearchResult;
  resultUrl: string;
  tag: string;
};

class ResultCard extends React.PureComponent<Props> {
  handleClick = () => {
    // TODO: add favourite to db
  }

  render() {
    const { currencySymbol, data, data: { id, isFavourite, isOffice }, resultUrl, tag } = this.props;
    return (
      <div
        className={css(searchResultStyles.resultCard)}
        id={`listing-${id}`}
      >
        <div>
          <div>
            <div className={css(searchResultStyles.resultCardHead)}>
              <ResultCardHead
                data={data}
                resultUrl={resultUrl}
              >
                <FavouriteButton
                  isFavourite={isFavourite}
                  onClick={this.handleClick}
                  resultId={`${id}`}
                />
              </ResultCardHead>
              {isOffice ? (
                <ResultCardBodyOffice
                  currencySymbol={currencySymbol}
                  data={data}
                  resultUrl={resultUrl}
                  tag={tag}
                />
              ) : (
                <ResultCardBody
                  currencySymbol={currencySymbol}
                  data={data}
                  resultUrl={resultUrl}
                  tag={tag}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ResultCard;

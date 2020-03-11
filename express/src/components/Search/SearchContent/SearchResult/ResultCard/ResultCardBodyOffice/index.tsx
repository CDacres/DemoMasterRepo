/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Components
import ResultCardBodyGeneric from '@src/components/Search/SearchContent/SearchResult/ResultCard/ResultCardBodyGeneric';
import BottomOffice from '@src/components/Search/SearchContent/SearchResult/ResultCard/ResultCardBodyOffice/BottomOffice';
import ContentSeparator from '@src/components/concrete/ContentSeparator';

// Types
import { SearchResult } from '@src/typings/types';

type Props = {
  currencySymbol: string;
  data: SearchResult;
  resultUrl: string;
  tag: string;
};

const ResultCardBodyOffice = ({ currencySymbol, data, data: { nearbyLocations, officeTypes }, resultUrl, tag }: Props) => (
  <ResultCardBodyGeneric
    bottomSection={
      <React.Fragment>
        {officeTypes.length > 0 &&
          <div>
            <ContentSeparator />
            <div className={css(styles.displayTable)}>
              <BottomOffice
                currencySymbol={currencySymbol}
                item={officeTypes[0]}
              />
              <BottomOffice
                currencySymbol={currencySymbol}
                item={officeTypes.length > 1 ? officeTypes[1] : null}
              />
              <BottomOffice
                currencySymbol={currencySymbol}
                item={officeTypes.length > 2 ? officeTypes[2] : null}
              />
            </div>
          </div>
        }
      </React.Fragment>
    }
    data={data}
    secondLine={
      <React.Fragment>
        {(nearbyLocations && nearbyLocations.length > 0) &&
          <span>
            {nearbyLocations[0]}
          </span>
        }
      </React.Fragment>
    }
    resultUrl={resultUrl}
    tag={tag}
  />
);

export default ResultCardBodyOffice;

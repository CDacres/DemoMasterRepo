/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import ResultCardBodyGeneric from '@src/components/Search/SearchContent/SearchResult/ResultCard/ResultCardBodyGeneric';
import BodySecondLine from '@src/components/Search/SearchContent/SearchResult/ResultCard/ResultCardBody/BodySecondLine';

// Types
import { SearchResult } from '@src/typings/types';

type Props = {
  currencySymbol: string;
  data: SearchResult;
  resultUrl: string;
  tag: string;
};

const ResultCardBody = ({ currencySymbol, data, data: { price }, resultUrl, tag }: Props) => (
  <ResultCardBodyGeneric
    data={data}
    secondLine={
      <React.Fragment>
        {price.hourly &&
          <BodySecondLine
            currencySymbol={currencySymbol}
            isFirst={true}
            price={price.hourly}
            text="common.per_hour"
          />
        }
        {price.daily &&
          <React.Fragment>
            {(price.hourly && (price.hourly * 9) > price.daily) &&
              <BodySecondLine
                currencySymbol={currencySymbol}
                price={(price.hourly * 9)}
                separator={true}
                strikeThrough={true}
              />
            }
            <BodySecondLine
              currencySymbol={currencySymbol}
              isFirst={price.hourly ? false : true}
              price={price.daily}
              separator={(price.hourly && (price.hourly * 9) > price.daily) ? false : true}
              text="common.per_day"
            />
          </React.Fragment>
        }
      </React.Fragment>
    }
    resultUrl={resultUrl}
    tag={tag}
  />
);

export default ResultCardBody;

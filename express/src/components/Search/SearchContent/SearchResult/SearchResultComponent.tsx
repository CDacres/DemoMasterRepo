/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { padding } from '@src/styles';

// Components
import URLGen from '@src/components/abstract/URLGen';

// Types
import { SearchResult } from '@src/typings/types';

type Props = {
  children: JSX.Element;
  data: SearchResult;
  mapIsVisible: boolean;
  position: number;
  resultUrl: string;
};

const SearchResultComponent = ({ children, data: { title }, mapIsVisible, position, resultUrl }: Props) => (
  <div className={css(styles.resultContainer, mapIsVisible ? styles.resultContainerWithMap : styles.resultContainerWithoutMap)}>
    <div className={css(styles.resultContainerInner, padding.top_1, padding.bottom_1_5, padding.leftright_1_small)}>
      <div
        itemProp="itemListElement"
        itemScope={true}
        itemType="http://schema.org/ListItem"
      >
        <meta
          content={title}
          itemProp="name"
        />
        <meta
          content={`${position}`}
          itemProp="position"
        />
        <URLGen url={resultUrl}>
          {fullUrl => (
            <meta
              content={fullUrl}
              itemProp="url"
            />
          )}
        </URLGen>
        <div>
          {children}
        </div>
      </div>
    </div>
  </div>
);

export default SearchResultComponent;

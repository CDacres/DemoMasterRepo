import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { pagestyles } from '@src/styles';

// Components
import ImageCarousel from '@src/components/concrete/ImageCarousel';

// Types
import { SearchResult } from '@src/typings/types';

type Props = {
  children: JSX.Element | JSX.Element[];
  data: SearchResult;
  resultUrl: string;
};

const ResultCardHead = ({ children, data: { images, title }, resultUrl }: Props) => (
  <div className={css(styles.resultCardHead)}>
    <div>
      {children}
      <div
        aria-hidden="false"
        className={css(pagestyles.relativePosition)}
      >
        <ImageCarousel
          images={images}
          linkUrl={resultUrl}
          title={title}
        />
      </div>
    </div>
  </div>
);

export default ResultCardHead;

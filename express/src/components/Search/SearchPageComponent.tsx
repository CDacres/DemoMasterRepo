import * as React from 'react';
// import Head from 'next/head';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { padding, pagestyles } from '@src/styles';

type Props = {
  children: JSX.Element;
  hasMap: boolean;
};

const SearchPageComponent = ({ children, hasMap }: Props) => (
  <React.Fragment>
    {/* <Head>
      <meta name="geo.position" content={`${this.meta.latitude}; ${this.meta.longitude}`} />
      <meta property="og:latitude" content={this.meta.latitude} />
      <meta property="og:longitude" content={this.meta.longitude} />
    </Head> */}
    <main className={css(pagestyles.relativePosition, padding.top_0)}>
      <div className="content-container">
        <div>
          <div {...(hasMap ? { className: css(styles.mapSearch, pagestyles.clearfix) } : {})}>
            {children}
          </div>
        </div>
      </div>
    </main>
  </React.Fragment>
);

export default SearchPageComponent;

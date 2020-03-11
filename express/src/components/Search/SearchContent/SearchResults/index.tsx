import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin } from '@src/styles';

// Components
import SectionHeader from '@src/components/concrete/SectionHeader';

type Props = {
  children: JSX.Element;
  sectionSubtitle?: string;
  sectionTitle?: string;
};

const SearchResults = ({ children, sectionSubtitle, sectionTitle }: Props) => (
  <div>
    <div className={css(margin.topbottom_4, margin.topbottom_5_small)}>
      <div>
        <SectionHeader
          sectionSubtitle={sectionSubtitle}
          sectionTitle={sectionTitle}
        />
      </div>
      <div className={css(margin.bottom_0)}>
        <div>
          <div className={css(styles.itemListContainer)}>
            {children}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SearchResults;

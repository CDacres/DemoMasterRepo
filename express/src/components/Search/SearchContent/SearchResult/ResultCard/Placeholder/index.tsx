import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import resultCardStyles from '../../styles';
import resultCardHeadStyles from '../ResultCardHead/styles';
import styles from './styles';
import { margin } from '@src/styles';

// Components
import PlaceholderItem from '@src/components/Search/SearchContent/SearchResult/ResultCard/Placeholder/PlaceholderItem';

const Placeholder = () => (
  <div className={css(resultCardStyles.resultCard)}>
    <div>
      <div>
        <div className={css(resultCardHeadStyles.resultCardHead)}>
          <div className={css(styles.resultCardChild)}>
            <div className={css(styles.shimmer)}>
              <span
                aria-busy="true"
                className={css(styles.shimmerAnimation, styles.shimmerSpan)}
              />
            </div>
          </div>
          <div className={css(margin.top_1)}>
            <PlaceholderItem width={50} />
          </div>
          <div>
            <PlaceholderItem width={50} />
          </div>
          <div>
            <PlaceholderItem width={20} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Placeholder;

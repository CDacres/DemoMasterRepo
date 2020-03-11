import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import packageCardStyles from '../styles';

const Icon = () => (
  <img
    alt=""
    className={css(packageCardStyles.priceIcon)}
    src="/_express/images/commonsite/daily_deal.gif"
    width="40"
    height="40"
  />
);

export default Icon;

import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding } from '@src/styles';

// Components
import Badge from '@src/components/concrete/Grid/CardsGrid/Card/CardContent/CardCategory/Badge';

type Props = {
  badge?: string;
  category: string;
  color: string;
};

const CardCategory = ({ badge, category, color }: Props) => (
  <React.Fragment>
    <div
      className={css(styles.cardCategoryWrapper, !badge ? margin.bottom_0_25 : null)}
      style={{ color: color }}
    >
      {badge &&
        <Badge
          color={color}
          text={badge}
        />
      }
      <div
        className={css(styles.cardCategory, badge ? padding.left_0_5 : null)}
        style={{ color: color }}
      >
        <span className={css(styles.smallText, margin.all_0)}>
          <span style={{ color: color }}>
            {category}
          </span>
        </span>
      </div>
    </div>
    {badge &&
      <div className={css(styles.cardBodySplit)} />
    }
  </React.Fragment>
);

export default CardCategory;

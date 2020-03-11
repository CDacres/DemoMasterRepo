import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin } from '@src/styles';

// Components
import Button from '@src/components/concrete/Button';
import HeartIcon from '@src/components/concrete/ProductIconButtons/HeartIcon';
import ShareIcon from '@src/components/concrete/ProductIconButtons/ShareIcon';

// Types
import { ActionLink } from '@src/typings/types';

type Props = {
  icon: 'heart' | 'share';
  like?: boolean;
  needsLeftMargin?: boolean;
} & ActionLink;

const ProductIconButtons = ({ action, icon, like, needsLeftMargin }: Props) => (
  <div className={css(styles.buttonWrapper, needsLeftMargin ? margin.left_2 : null)}>
    <Button
      action={action}
      stylesArray={[styles.iconButton]}
    >
      <span className={css(styles.iconBox)}>
        {(icon === 'share') ? (
          <ShareIcon />
        ) : ((icon === 'heart') ? (
          <HeartIcon like={like} />
        ) : (
          null
        ))}
      </span>
    </Button>
  </div>
);

export default ProductIconButtons;

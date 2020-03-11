import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Components
import { Heart } from '@src/components/concrete/Icons/svgs';
import Button from '@src/components/concrete/Button';

type Props = {
  isFavourite?: boolean;
  onClick?: (_: React.MouseEvent<HTMLElement>) => void;
  resultId: string;
};

const FavouriteButton = ({ isFavourite, onClick, resultId }: Props) => (
  <div className={css(styles.favouriteButtonContainer)}>
    <Button
      action={onClick}
      aria-busy="false"
      id={resultId}
      stylesArray={[styles.favouriteButton]}
    >
      <Heart
        aria-label="Add listing to a list"
        fill={isFavourite ? '#00c6ff' : '#484848'}
        fillOpacity={isFavourite ? 1 : 0.5}
        role="img"
        stroke="#ffffff"
        strokeWidth={2.5}
        stylesArray={[styles.icon]}
      />
    </Button>
  </div>
);

export default FavouriteButton;

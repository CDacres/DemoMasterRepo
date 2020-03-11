import * as React from 'react';

// Styles
import styles from './styles';
import { pagestyles } from '@src/styles';

// Components
import EmptyStar from '@src/components/concrete/Stars/EmptyStar';

type Props = {
  handleClick: (rating: number) => void;
  rating: number;
};

const StarsListComponent = ({ handleClick, rating }: Props) => {
  const stars = [];
  for (let i = 1; i <= 5; i += 1) {
    stars.push(
      <EmptyStar
        customStyle={[styles.icon, pagestyles.icon20, rating >= i ? pagestyles.iconBlue : null]}
        key={i}
        onClick={() => handleClick(i)}
      />
    );
  }
  return (
    <React.Fragment>
      {stars}
    </React.Fragment>
  );
};

export default StarsListComponent;

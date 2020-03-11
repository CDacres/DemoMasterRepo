import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { pagestyles } from '@src/styles';

// Components
import { Chevron } from '@src/components/concrete/Icons/svgs';
import Button from '@src/components/concrete/Button';

type Props = {
  direction: string;
  isHovered: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const directions = {
  left: {
    label: 'Previous',
    buttonClass: [styles.carouselButton, styles.carouselButton_prev],
    innerClass: [styles.carouselButtonInner, styles.carouselButtonInner_prev],
    svgComponent: (
      <Chevron
        direction="left"
        role="img"
        stylesArray={[pagestyles.icon, pagestyles.icon24, pagestyles.iconWhite]}
      />
    ),
  },
  right: {
    label: 'Next',
    buttonClass: [styles.carouselButton, styles.carouselButton_next],
    innerClass: [styles.carouselButtonInner, styles.carouselButtonInner_next],
    svgComponent: (
      <Chevron
        direction="right"
        role="img"
        stylesArray={[pagestyles.icon, pagestyles.icon24, pagestyles.iconWhite]}
      />
    ),
  },
};

const CarouselButtonComponent = ({ direction, isHovered, onClick }: Props) => (
  <Button
    action={onClick}
    aria-label={directions[direction].label}
    stylesArray={[...directions[direction].buttonClass, !isHovered && styles.carouselButton_hidden]}
  >
    <div className={css(...directions[direction].innerClass)}>
      {isHovered &&
        <React.Fragment>
          {directions[direction].svgComponent}
        </React.Fragment>
      }
    </div>
  </Button>
);

export default CarouselButtonComponent;

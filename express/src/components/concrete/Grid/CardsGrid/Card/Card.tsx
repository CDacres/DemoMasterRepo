/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import gridStyles from '../../styles';
import { padding, pagestyles } from '@src/styles';

// Components
import CardImage from '@src/components/concrete/Grid/CardsGrid/Card/CardImage';

type Props = {
  cardCount?: 2 | 12 | 'all';
  children: JSX.Element;
  hasCollapse?: boolean;
  image?: string;
  lazyLoadImages?: boolean;
  link?: string;
  newTab?: boolean;
  title?: string;
};

const Card: React.FunctionComponent<Props> = ({ cardCount, children, hasCollapse, image, lazyLoadImages, link, newTab, title }) => {
  let cardStyleArray = [];
  if (cardCount === 2) {
    cardStyleArray = [pagestyles.halfColumn];
  } else if (cardCount === 12) {
    cardStyleArray = [styles.cardContainer_normal];
    if (!hasCollapse) {
      cardStyleArray.push(styles.cardContainer_12_withoutCollapse);
    }
  } else if (cardCount === 'all') {
    cardStyleArray = [styles.cardContainer_all];
  } else {
    cardStyleArray = [styles.cardContainer_normal];
    if (!hasCollapse) {
      cardStyleArray.push(styles.cardContainer_8_withoutCollapse);
    }
  }
  return (
    <div className={css(styles.cardContainer, cardStyleArray)}>
      <div className={css(styles.cardContainerInner)}>
        <div className={css(gridStyles.card)}>
          {image &&
            <CardImage
              cardImage={image}
              cardLink={link}
              cardTitle={title}
              lazyLoadImages={lazyLoadImages}
              newTab={newTab}
            />
          }
          <div className={css(padding.top_1)}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

Card.defaultProps = {
  hasCollapse: false,
  lazyLoadImages: true,
  newTab: true,
};

export default Card;

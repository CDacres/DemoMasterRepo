import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin } from '@src/styles';

// Components
import BrowserLink from '@src/components/abstract/Link';
import { Chevron } from '@src/components/concrete/Icons/svgs';

type Props = {
  link: string;
  text: string;
};

const CardsGridFooter = ({ link, text }: Props) => (
  <div className={css(styles.cardsGridFooterContainer, margin.top_1)}>
    <BrowserLink
      aria-busy="false"
      attributes={{ title: { transKey: text } }}
      className={css(styles.cardsGridFooterButton)}
      href={link}
    >
      <React.Fragment>
        <span className={css(styles.cardsGridFooterButtonText)}>
          {text}
        </span>
        <span className={css(styles.cardsGridFooterButtonCaret)}>
          <Chevron
            direction="right"
            stylesArray={[styles.icon]}
          />
        </span>
      </React.Fragment>
    </BrowserLink>
  </div>
);

export default CardsGridFooter;

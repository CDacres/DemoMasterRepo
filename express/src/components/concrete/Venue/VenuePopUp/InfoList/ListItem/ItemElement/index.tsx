import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import ItemElementText from '@src/components/concrete/Venue/VenuePopUp/InfoList/ListItem/ItemElement/ItemElementText';
import StyledButton from '@src/components/concrete/Button/StyledButton';
import ContentSeparator from '@src/components/concrete/ContentSeparator';

type Props = {
  people: string;
  price: string;
  title: string;
};

const ItemElement = ({ people, price, title }: Props) => (
  <React.Fragment>
    <div className={css(padding.topbottom_3)}>
      <div className={css(styles.infoContainer)}>
        <div>
          <ItemElementText text={title} />
          <ItemElementText text={price} />
          <ItemElementText text={people} />
        </div>
        <div className={css(margin.left_1)}>
          <Translatable content={{ transKey: 'common.choose' }}>
            <StyledButton buttonStyle="updated" />
          </Translatable>
        </div>
      </div>
    </div>
    <ContentSeparator marginNum={0} />
  </React.Fragment>
);

export default ItemElement;

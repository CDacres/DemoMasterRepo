/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Components
import RadioInput from '@src/components/Listing/Form/RadioInput';
import Column from '@src/components/Listing/Layout/Column';
import CardActionArea from '@src/components/Listing/Layout/Cards/ListCard/CardActionArea';
import Spell from '@src/components/Listing/Translate/Spell';

type Props = {
  cardPaddingType?: 'all' | 'right';
  children?: React.ReactNode;
  hasSelectedIndicator?: boolean;
  isDisabled?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  isSelected: boolean;
  name: string;
  onClick: VoidFunction;
  stylesArray?: {
    area?: object[];
    container?: object[];
  };
  text?: string;
};

const ListCard = ({ cardPaddingType, children, hasSelectedIndicator, isDisabled, isFirst, isLast, isSelected, name, onClick, stylesArray, text }: Props) => (
  <div className={css(styles.container, stylesArray ? stylesArray.container : null, isFirst ? styles.first : isLast ? styles.last : null, (hasSelectedIndicator && isSelected) && styles.selected)}>
    <CardActionArea
      disabled={isDisabled}
      hasAllPadding={cardPaddingType === 'all'}
      hasRightPadding={cardPaddingType === 'right'}
      onClick={onClick}
    >
      <div className={css(styles.area, stylesArray ? stylesArray.area : null)}>
        {children}
        {text &&
          <Column
            gap="8px"
            style={{
              alignContent: 'center',
              alignSelf: 'center',
            }}
          >
            <span className={css(styles.text, isDisabled ? styles.disabled : null)}>
              <Spell word={text} />
            </span>
          </Column>
        }
        <RadioInput
          checked={isSelected}
          disabled={isDisabled}
          name={name}
        />
      </div>
    </CardActionArea>
  </div>
);

export default ListCard;

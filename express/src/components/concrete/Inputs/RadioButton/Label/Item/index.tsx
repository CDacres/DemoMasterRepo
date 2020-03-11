/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Components
import ItemHole from '@src/components/concrete/Inputs/RadioButton/Label/Item/ItemHole';
import ItemText from '@src/components/concrete/Inputs/RadioButton/Label/Item/ItemText';

// Types
import { Radio, RadioInput } from '@src/typings/types';

const Item = ({ boldText, handleClick, id, isLarge, learnMoreAction, name, noBorder, radioPosition, selectedOption, subtext, text, value }: Radio & RadioInput) => (
  <div className={css(styles.textContent)}>
    {radioPosition === 'left' ? (
      <React.Fragment>
        <ItemHole
          handleClick={handleClick}
          id={id}
          isLarge={isLarge}
          name={name}
          noBorder={noBorder}
          radioPosition={radioPosition}
          selectedOption={selectedOption}
          value={value}
        />
        <ItemText
          boldText={boldText}
          learnMoreAction={learnMoreAction}
          radioPosition={radioPosition}
          subtext={subtext}
          text={text}
        />
      </React.Fragment>
    ) : (
      <React.Fragment>
        <ItemText
          boldText={boldText}
          learnMoreAction={learnMoreAction}
          radioPosition={radioPosition}
          subtext={subtext}
          text={text}
        />
        <ItemHole
          handleClick={handleClick}
          id={id}
          isLarge={isLarge}
          name={name}
          noBorder={noBorder}
          radioPosition={radioPosition}
          selectedOption={selectedOption}
          value={value}
        />
      </React.Fragment>
    )}
  </div>
);

export default Item;

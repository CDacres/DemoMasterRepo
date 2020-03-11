/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { padding } from '@src/styles';

// Components
import EnclosingLabel from '@src/components/concrete/EnclosingLabel';
import Item from '@src/components/concrete/Inputs/RadioButton/Label/Item';
import ContentSeparator from '@src/components/concrete/ContentSeparator';

// Types
import { Radio, RadioInput } from '@src/typings/types';

const Label = ({ boldText, handleClick, id, interiorPadding, isLarge, itemBorder, learnMoreAction, name, noBorder, radioPosition, selectedOption, subtext, text, value }: Radio & RadioInput) => {
  let paddingBottom, paddingTop;
  if (interiorPadding) {
    paddingBottom = (interiorPadding.bottom) ? `bottom_${interiorPadding.bottom}` : null;
    paddingTop = (interiorPadding.top) ? `top_${interiorPadding.top}` : null;
  }
  return (
    <React.Fragment>
      <EnclosingLabel id={id}>
        {interiorPadding ? (
          <div className={css(padding[paddingTop], padding[paddingBottom])}>
            <Item
              boldText={boldText}
              handleClick={handleClick}
              id={id}
              isLarge={isLarge}
              learnMoreAction={learnMoreAction}
              name={name}
              noBorder={noBorder}
              radioPosition={radioPosition}
              selectedOption={selectedOption}
              subtext={subtext}
              text={text}
              value={value}
            />
          </div>
        ) : (
          <Item
            boldText={boldText}
            handleClick={handleClick}
            id={id}
            isLarge={isLarge}
            learnMoreAction={learnMoreAction}
            name={name}
            noBorder={noBorder}
            radioPosition={radioPosition}
            selectedOption={selectedOption}
            subtext={subtext}
            text={text}
            value={value}
          />
        )}
      </EnclosingLabel>
      {itemBorder &&
        <ContentSeparator />
      }
    </React.Fragment>
  );
};

export default Label;

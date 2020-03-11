/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin } from '@src/styles';

// Components
import Bordered from '@src/components/concrete/Inputs/RadioButton/Bordered';
import Label from '@src/components/concrete/Inputs/RadioButton/Label';

// Types
import { Radio, RadioExtraText, RadioInput } from '@src/typings/types';

type Props = {
  selected: string;
} & Radio & RadioExtraText & RadioInput;

const RadioButtonComponent = ({ boldText, extraText, handleClick, id, interiorPadding, isLarge, itemBorder, learnMoreAction, name, noBorder, radioPosition, selected, subtext, text, value }: Props) => {
  const selectedOption = (selected === id);
  return (
    <div className={css(margin.bottom_1, margin.right_0)}>
      {noBorder ? (
        <Label
          boldText={boldText}
          handleClick={handleClick}
          id={id}
          interiorPadding={interiorPadding}
          isLarge={isLarge}
          itemBorder={itemBorder}
          learnMoreAction={learnMoreAction}
          name={name}
          noBorder={noBorder}
          radioPosition={radioPosition}
          selectedOption={selectedOption}
          subtext={subtext}
          text={text}
          value={value}
        />
      ) : (
        <Bordered
          extraText={extraText}
          radioPosition={radioPosition}
          selectedOption={selectedOption}
        >
          <Label
            boldText={boldText}
            handleClick={handleClick}
            id={id}
            interiorPadding={interiorPadding}
            isLarge={isLarge}
            itemBorder={itemBorder}
            learnMoreAction={learnMoreAction}
            name={name}
            noBorder={noBorder}
            radioPosition={radioPosition}
            selectedOption={selectedOption}
            subtext={subtext}
            text={text}
            value={value}
          />
        </Bordered>
      )}
    </div>
  );
};

export default RadioButtonComponent;

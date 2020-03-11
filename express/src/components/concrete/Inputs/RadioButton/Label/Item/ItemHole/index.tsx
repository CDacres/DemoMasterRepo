/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import { RadioEllipsis } from '@src/components/concrete/Icons/svgs';

// Types
import { Radio } from '@src/typings/types';

type Props = {
  id: string;
  name: string;
  value: string;
} & Radio;

const ItemHole = ({ handleClick, id, isLarge, name, noBorder, radioPosition, selectedOption, value }: Props) => {
  let style;
  if (radioPosition === 'left') {
    if (noBorder) {
      style = [margin.left_0, margin.right_1_5];
    } else {
      style = [margin.top_0_25];
    }
  } else {
    style = [margin.left_1_5];
  }
  return (
    <div className={css(pagestyles.tableCellTop)}>
      <div className={css(style)}>
        <div className={css(pagestyles.inlineBlock, pagestyles.relativePosition)}>
          <input
            aria-invalid="false"
            checked={selectedOption}
            className={css(styles.input, margin.all_0)}
            id={id}
            name={name}
            onChange={handleClick}
            type="radio"
            value={value}
          />
          <div
            className={css(styles.iconWrapper, isLarge ? styles.iconLarge : [styles.iconSmall, margin.top_0_25])}
            data-fake-radio="true"
            data-style-select="false"
            data-style-default="true"
          >
            {selectedOption &&
              <div className={css(styles.iconContainer)}>
                <RadioEllipsis />
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemHole;

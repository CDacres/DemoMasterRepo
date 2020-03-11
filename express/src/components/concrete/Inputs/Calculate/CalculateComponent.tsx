/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import IconButton from '@src/components/concrete/Inputs/Calculate/IconButton';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import { MinusLine, PlusLine } from '@src/components/concrete/Icons/svgs';

type Props = {
  addDisabled?: boolean;
  count: number;
  handleAdd?: () => void;
  handleSubtract?: () => void;
  label: string;
  price?: string;
  subtractDisabled?: boolean;
  transKey: string;
};

const CalculateComponent = ({ addDisabled, count, handleAdd, handleSubtract, label, price, subtractDisabled, transKey }: Props) => (
  <div className={css(margin.topbottom_2)}>
    <div className={css(pagestyles.noBottomBorder, padding.topbottom_0)}>
      <div>
        <div className={css(styles.content)}>
          <div className={css(pagestyles.fullColumn, pagestyles.tableCellMiddle)}>
            <div className={css(pagestyles.table, margin.right_1_5)}>
              <Translatable content={{ transKey: label }}>
                <div className={css(pagestyles.text, pagestyles.fontMedium, margin.all_0)} />
              </Translatable>
              {price &&
                <div className={css(styles.priceWrapper, padding.topbottom_0_5)}>
                  <Translatable content={{ transKey: price }}>
                    <div className={css(pagestyles.smallText, margin.all_0)} />
                  </Translatable>
                </div>
              }
            </div>
          </div>
          <div className={css(pagestyles.tableCellMiddle)}>
            <div className={css(styles.buttonContainer)}>
              <div className={css(pagestyles.tableCellMiddle, pagestyles.leftText)}>
                <IconButton
                  action={handleSubtract}
                  disabled={subtractDisabled}
                >
                  <MinusLine />
                </IconButton>
              </div>
              <div className={css(pagestyles.tableCellMiddle, pagestyles.centeredText)}>
                <div className={css(pagestyles.text, pagestyles.fontMedium, margin.all_0)}>
                  {count}
                </div>
                <Translatable content={{ transKey: transKey, count: count, replacements: { number: count } }}>
                  <span className={css(pagestyles.hiddenText)} />
                </Translatable>
              </div>
              <div className={css(pagestyles.tableCellMiddle, pagestyles.rightText)}>
                <IconButton
                  action={handleAdd}
                  disabled={addDisabled}
                >
                  <PlusLine />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CalculateComponent;

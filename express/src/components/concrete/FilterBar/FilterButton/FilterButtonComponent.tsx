/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import Button from '@src/components/concrete/Button';
import { ProductLargeScreen } from '@src/components/abstract/MediaQuery';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  buttonText: string;
  canClear: boolean;
  children: JSX.Element;
  isActive: boolean;
  onClick: () => void;
};

const FilterButtonComponent = ({ buttonText, canClear, children, isActive, onClick }: Props) => (
  <ProductLargeScreen>
    {matches => {
      if (matches) {
        return (
          <div className={css(pagestyles.inlineBlock)}>
            <span className={css(pagestyles.hideFont)} />
            <div className={css(pagestyles.inlineBlock, pagestyles.relativePosition, margin.topbottom_0, margin.right_0_5, margin.left_1)}>
              <div>
                <Button
                  action={onClick}
                  aria-haspopup="true"
                  aria-expanded={isActive ? 'true' : 'false'}
                  stylesArray={[styles.filterButton, (canClear || isActive) && styles.filterButtonActive]}
                >
                  <Translatable content={{ transKey: buttonText }}>
                    <div className={css(pagestyles.tableCellMiddle, (canClear || isActive) && styles.filterButtonTextActive)} />
                  </Translatable>
                </Button>
                {isActive &&
                  children
                }
              </div>
            </div>
          </div>
        );
      }
      return (
        <Button
          action={onClick}
          aria-haspopup="true"
          aria-expanded={isActive ? 'true' : 'false'}
          stylesArray={[styles.filterButton, styles.filterButtonSmall, (canClear || isActive) && styles.filterButtonActive]}
        >
          <Translatable content={{ transKey: buttonText }}>
            <span className={css(styles.filterButtonTextSmall, (canClear || isActive) && styles.filterButtonTextActive)} />
          </Translatable>
        </Button>
      );
    }}
  </ProductLargeScreen>
);

export default FilterButtonComponent;

/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import Button from '@src/components/concrete/Button';
import { Chevron } from '@src/components/concrete/Icons/svgs';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  children: JSX.Element;
  count: number;
  onClick: () => void;
  showPopup: boolean;
  transKey: string;
};

const DropDownComponent = ({ children, count, onClick, showPopup, transKey }: Props) => (
  <div className={css(pagestyles.relativePosition)}>
    <div className={css(styles.container)}>
      <Button
        action={onClick}
        aria-expanded={showPopup}
        stylesArray={[styles.dropdownButton, padding.all_1, showPopup ? styles.dropdownExpanded : styles.dropdownReduced]}
      >
        <div className={css(margin.leftright_1)}>
          <div className={css(pagestyles.text, margin.all_0)}>
            <div className={css(styles.buttonInnerCount)}>
              <div className={css(pagestyles.fullColumn, pagestyles.tableCellMiddle)}>
                <div className={css(styles.countContainer, margin.right_2)}>
                  <Translatable content={{ transKey: transKey, count: count, replacements: { number: count } }}>
                    <span className={css(pagestyles.inlineBlock, padding.topbottom_0_5, showPopup ? [styles.countInnerPopup, margin.all_0, padding.leftright_1] : null)} />
                  </Translatable>
                </div>
              </div>
              <div className={css(pagestyles.tableCellMiddle)}>
                <Chevron stylesArray={[pagestyles.icon, pagestyles.icon16, showPopup && styles.chevron_collapse]} />
              </div>
            </div>
          </div>
        </div>
      </Button>
      <div>
        {showPopup &&
          <div className={css(styles.dropDownWrapper, margin.bottom_2, padding.leftright_2)}>
            <div className={css(margin.topbottom_2)}>
              {children}
              <div className={css(pagestyles.flexWrapper)}>
                <div className={css(pagestyles.flexContainer)} />
                <div className={css(pagestyles.inlineBlockMiddle)}>
                  <div className={css(pagestyles.text, pagestyles.fontMedium, margin.all_0)}>
                    <Translatable content={{ transKey: 'common.close' }}>
                      <Button
                        action={onClick}
                        stylesArray={[styles.closeButton, padding.all_0]}
                      />
                    </Translatable>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  </div>
);

export default DropDownComponent;

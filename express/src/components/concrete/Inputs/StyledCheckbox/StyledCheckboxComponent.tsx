/* tslint:disable:max-line-length */
import * as React from 'react';
import isMobile from 'ismobilejs';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { Check } from '@src/components/concrete/Icons/svgs';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import EnclosingLabel from '@src/components/concrete/EnclosingLabel';

// Types
import { StyledCheckboxProps } from '@src/typings/types';

type Props = {
  onToggle: () => void;
} & StyledCheckboxProps;

const StyledCheckboxComponent = ({ checked, disabled, id, label, name, onToggle, sublabel, value }: Props) => {
  if (isMobile.any) {
    return (
      <div className={css(styles.labelInnerWrapper)}>
        <div className={css(pagestyles.fullColumn, pagestyles.tableCellMiddle)}>
          <EnclosingLabel id={id}>
            <div className={css(styles.labelInnerWrapper)}>
              {label &&
                <div className={css(pagestyles.fullColumn, pagestyles.tableCellTop)}>
                  <div className={css(styles.labelCellInner, padding.left_0, padding.right_2)}>
                    <Translatable content={{ transKey: label }}>
                      <span className={css(styles.labelTextMobileWrapper)} />
                    </Translatable>
                    {sublabel &&
                      <span className={css(styles.labelSubtext, padding.top_0_5)}>
                        {sublabel}
                      </span>
                    }
                  </div>
                </div>
              }
              <div className={css(pagestyles.tableCellTop)}>
                <div className={css(styles.labelInputWrapper)}>
                  <span className={css(styles.labelInputContainer, padding.all_0)}>
                    <input
                      aria-invalid="false"
                      checked={checked}
                      className={css(styles.checkboxInput)}
                      disabled={disabled}
                      id={id}
                      name={name}
                      onChange={onToggle}
                      type="checkbox"
                      value={value}
                    />
                    <span
                      className={css(styles.fakeCheckbox, styles.fakeMobileCheckbox, checked && styles.fakeCheckboxChecked, disabled && styles.fakeCheckBoxDisabled)}
                      data-fake-checkbox="true"
                      data-style-default="true"
                      data-style-select="false"
                    >
                      {(checked || disabled ) &&
                        <span className={css(styles.fakeCheckboxCheckmark, padding.top_0_25)}>
                          <Check
                            stroke={disabled ? '#d8d8d8' : '#ffffff'}
                            stylesArray={[styles.fakeCheckboxCheckmarkSvg]}
                          />
                        </span>
                      }
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </EnclosingLabel>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <EnclosingLabel id={id}>
          <div className={css(styles.labelInnerWrapper)}>
            <div className={css(pagestyles.tableCellTop)}>
              <div className={css(styles.labelInputWrapper)}>
                <span className={css(styles.labelInputContainer, padding.all_0)}>
                  <input
                    aria-invalid="false"
                    checked={checked}
                    className={css(styles.checkboxInput)}
                    disabled={disabled}
                    id={id}
                    name={name}
                    onChange={onToggle}
                    type="checkbox"
                  />
                  <span
                    className={css(styles.fakeCheckbox, checked && styles.fakeCheckboxChecked, disabled && styles.fakeCheckBoxDisabled)}
                    data-fake-checkbox="true"
                    data-style-default="true"
                    data-style-select="false"
                  >
                    {(checked || disabled ) &&
                      <span className={css(styles.fakeCheckboxCheckmark)}>
                        <Check
                          stroke={disabled ? '#d8d8d8' : '#ffffff'}
                          stylesArray={[styles.fakeCheckboxCheckmarkSvg]}
                        />
                      </span>
                    }
                  </span>
                </span>
              </div>
            </div>
            {label &&
              <div className={css(pagestyles.fullColumn, pagestyles.tableCellTop)}>
                <div className={css(styles.labelCellInner, padding.left_1)}>
                  <span className={css(styles.labelTextWrapper)}>
                    <div className={css(pagestyles.text, pagestyles.fontMedium, margin.all_0)}>
                      <Translatable content={{ transKey: label }}>
                        <span className={css(pagestyles.smallText, pagestyles.fontMedium, margin.all_0)} />
                      </Translatable>
                    </div>
                  </span>
                  {sublabel &&
                    <span className={css(styles.labelSubtext, padding.top_0_5)}>
                      {sublabel}
                    </span>
                  }
                </div>
              </div>
            }
          </div>
        </EnclosingLabel>
      </div>
    );
  }
};

export default StyledCheckboxComponent;

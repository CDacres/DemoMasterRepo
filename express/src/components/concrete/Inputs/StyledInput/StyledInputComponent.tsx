/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import { Chevron } from '@src/components/concrete/Icons/svgs';
import StyledLabel from '@src/components/concrete/Inputs/StyledLabel';

// Types
import { StyledInputProps, StyledLabelProps } from '@src/typings/types';

type Props = {
  focused: boolean;
  onBlur: () => void;
  onFocus: () => void;
} & StyledInputProps & StyledLabelProps;

const StyledInputComponent = ({ boldLabel, children, defaultOptionText, focused, hiddenLabel, icon, id, isBig, label, name, noMargin, noBorder, onBlur, onChange, onFocus, placeholder, required, selectOptions, smallText, type, value }: Props) => {
  const style = [styles.inputInnerWrapper, styles.inputText, noBorder ? styles.hiddenBorder : [styles.withBorder, focused && styles.focused], !noMargin && margin.bottom_1];
  return (
    <div className={css(styles.inputWrapper)}>
      {label &&
        <StyledLabel
          boldLabel={boldLabel}
          hiddenLabel={hiddenLabel}
          id={id}
          label={label}
          required={required}
        />
      }
      {React.Children.count(children) > 0 ? (
        <div dir="ltr">
          <div className={css(style)}>
            <div className={css(styles.inputInnerContainer)}>
              {children}
            </div>
          </div>
        </div>
      ) : (selectOptions ? (
        <div className={css(style)}>
          <div className={css(styles.selectContainer)}>
            <select
              aria-label={label}
              className={css(styles.select, styles.inputText, margin.all_0, smallText && styles.smallText)}
              id={id}
              name={name}
              onBlur={onBlur}
              onChange={onChange}
              onFocus={onFocus}
              placeholder={placeholder}
              required={required}
            >
              {defaultOptionText &&
                <option value="">
                  {defaultOptionText}
                </option>
              }
              {selectOptions.map(item => (
                <option
                  key={item.value}
                  selected={value === item.value}
                  value={item.value}
                >
                  {item.text}
                </option>
              ))}
            </select>
          </div>
          <span className={css(styles.selectIconWrapper)}>
            <Chevron stylesArray={[pagestyles.icon, pagestyles.icon16, pagestyles.iconBlack]} />
          </span>
        </div>
      ) : (
        <div dir="ltr">
          <div className={css(style, styles.inputContainerInput)}>
            {icon &&
              <div className={css(pagestyles.columnFloat)}>
                <div className={css(styles.iconContainer)}>
                  <div className={css(styles.iconInner)}>
                    <div className={css(pagestyles.tableCellMiddle)}>
                      {icon}
                    </div>
                  </div>
                </div>
              </div>
            }
            <div className={css(styles.inputInnerContainer)}>
              {isBig ? (
                <textarea
                  aria-label={label}
                  autoComplete="off"
                  className={css(styles.input, styles.inputText, margin.all_0, smallText && styles.smallText)}
                  id={id}
                  name={name}
                  onBlur={onBlur}
                  onChange={onChange}
                  onFocus={onFocus}
                  placeholder={placeholder}
                  required={required}
                  rows={6}
                  value={value}
                />
              ) : (
                <input
                  aria-label={label}
                  autoComplete="off"
                  className={css(styles.input, styles.inputText, margin.all_0, smallText && styles.smallText)}
                  id={id}
                  name={name}
                  onBlur={onBlur}
                  onChange={onChange}
                  onFocus={onFocus}
                  placeholder={placeholder}
                  required={required}
                  type={type ? type : 'text'}
                  value={value}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StyledInputComponent;

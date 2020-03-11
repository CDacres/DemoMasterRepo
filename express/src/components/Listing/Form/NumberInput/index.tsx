/* tslint:disable:max-line-length */
import * as React from 'react';
import NumberFormat from 'react-number-format';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Components
import Error from '@src/components/Listing/Icons/Error';
import Strip from '@src/components/Listing/Layout/Strip';

// Interfaces
import { NumberFormatValue } from '@src/components/Listing/Form';

type Props = {
  decimalScale?: number;
  decimalSeparator?: boolean | string;
  errors?: string[];
  fixedDecimalScale?: boolean;
  leading?: React.ReactNode;
  name: string;
  onBlur?: React.ChangeEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onEnter?: VoidFunction;
  onValueChange?: (values: NumberFormatValue) => void;
  placeholder?: React.ReactNode;
  trailing?: React.ReactNode;
  value: number | string;
};

class NumberInput extends React.Component<Props> {

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      this.emitOnEnter();
    }
  }

  emitOnEnter = () => {
    if (this.props.onEnter) {
      this.props.onEnter();
    }
  }

  render() {
    const { decimalScale, decimalSeparator, errors, fixedDecimalScale, leading, name, onBlur, onChange, onValueChange, placeholder, trailing, value } = this.props;
    const hasError = errors && errors.length > 0;
    const hasLeading = !!leading;
    const actualDecimalScale = (decimalScale === undefined || decimalScale === null) ? 2 : decimalScale;
    return (
      <Strip
        className={css(styles.container, hasError && styles.containerError)}
        cols="auto 1fr auto auto"
        itemsHorz="stretch"
        itemsVert="stretch"
      >
        <Strip>
          {leading}
        </Strip>
        <Strip
          className={css(styles.inputCell, !hasLeading && styles.noLeadingInputCell)}
          itemsVert="stretch"
          vert="stretch"
        >
          <NumberFormat
            allowNegative={false}
            className={css(styles.input)}
            decimalScale={actualDecimalScale}
            decimalSeparator={decimalSeparator}
            fixedDecimalScale={fixedDecimalScale}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            onKeyDown={this.handleKeyDown}
            onValueChange={onValueChange}
            value={!!value && value || ''}
          />
          <Strip
            col="1"
            row="1"
            style={{ pointerEvents: 'none' }}
          >
            {(!value && !!placeholder) &&
              <span className={css(styles.placeholder)}>
                {placeholder || '0'}
              </span>
            }
          </Strip>
        </Strip>
        <Strip itemsHorz="stretch">
          {trailing}
        </Strip>
        <Strip {...(hasError ? { margin: '0px 8px' } : {})}>
          {hasError &&
            <Error />
          }
        </Strip>
      </Strip>
    );
  }
}

export default NumberInput;

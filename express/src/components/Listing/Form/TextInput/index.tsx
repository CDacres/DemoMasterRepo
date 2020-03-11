import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Components
import Strip from '@src/components/Listing/Layout/Strip';
import Error from '@src/components/Listing/Icons/Error';

type Props = {
  errors?: string[];
  forwardedRef?: React.RefObject<HTMLInputElement>;
  leading?: React.ReactNode;
  name: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onEnter?: (value: string) => void;
  placeholder?: React.ReactNode;
  trailing?: React.ReactNode;
  value: string | number | string[];
};

class TextInput extends React.Component<Props> {
  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      this.emitOnEnter(e.target && (e.target as HTMLInputElement).value);
    }
  }

  emitOnEnter = (value: string) => {
    if (this.props.onEnter) {
      this.props.onEnter(value);
    }
  }

  render() {
    const { errors, forwardedRef, leading, name, onBlur, onChange, placeholder, trailing, value } = this.props;
    const hasError = errors && errors.length > 0;
    const hasLeading = !!leading;
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
          <input
            className={css(styles.input)}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            onKeyDown={this.handleKeyDown}
            ref={forwardedRef}
            value={!!value && value || ''}
          />
          <Strip
            col="1"
            row="1"
            style={{ pointerEvents: 'none' }}
          >
            {(!value && !!placeholder) &&
              <span className={css(styles.placeholder)}>
                {placeholder}
              </span>
            }
          </Strip>
        </Strip>
        <Strip
          itemsHorz="stretch"
          itemsVert="stretch"
        >
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

export default React.forwardRef((props: Props, ref: React.RefObject<HTMLInputElement>) => {
  return (
    <TextInput
      {...props}
      forwardedRef={ref}
    />
  );
});

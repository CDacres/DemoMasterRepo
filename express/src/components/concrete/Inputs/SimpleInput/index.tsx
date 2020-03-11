import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import inputStyles from '../styles';

type Props = {
  id?: string;
  label?: string;
  name?: string;
  onChange?: (e?: any) => void;
  value?: string;
};

type State = {
  value?: string;
};

class SimpleInput extends React.PureComponent<Props, State> {
  onChange = (e?: React.ChangeEvent<HTMLInputElement>): void => this.setState({ value: e.target.value });
  click = (e?: any): void => {
    e.target.value = '';
  }
  render() {
    const { id, label, name, onChange, value } = this.props;
    return (
      <div className={css(inputStyles.inputWrapper)}>
        <div className={css(inputStyles.inputContainer)}>
          <input
            aria-label={label}
            autoComplete="off"
            className={css(inputStyles.input)}
            id={id}
            name={name}
            onChange={onChange}
            onClick={this.click}
            placeholder={label}
            value={value}
          />
        </div>
      </div>
    );
  }
}

export default SimpleInput;

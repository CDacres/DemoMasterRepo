/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import StyledInputComponent from '@src/components/concrete/Inputs/StyledInput/StyledInputComponent';

// Types
import { StyledInputProps, StyledLabelProps } from '@src/typings/types';

type State = {
  focused: boolean;
  value: string;
};

class StyledInputContainer extends React.Component<StyledInputProps & StyledLabelProps, State> {
  constructor(props: StyledInputProps & StyledLabelProps) {
    super(props);
    this.state = {
      focused: false,
      value: '',
    };
  }

  componentDidMount() {
    this.setState({ value: this.props.value });
  }

  handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => {
    if (this.props.onChange) {
      this.setState({ value: value }, () => {
        this.props.onChange(value);
      });
    } else {
      this.setState({ value: value });
    }
  }

  handleFocus = () => {
    this.setState({ focused: !this.state.focused });
  }

  handleBlur = () => {
    this.setState({ focused: false });
  }

  render() {
    const { boldLabel, children, defaultOptionText, hiddenLabel, icon, id, isBig, label, name, noBorder, noMargin, placeholder, required, selectOptions, smallText, type } = this.props;
    const { focused, value } = this.state;
    return (
      <StyledInputComponent
        boldLabel={boldLabel}
        defaultOptionText={defaultOptionText}
        focused={focused}
        hiddenLabel={hiddenLabel}
        icon={icon}
        id={id}
        isBig={isBig}
        label={label}
        name={name}
        noBorder={noBorder}
        noMargin={noMargin}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        placeholder={placeholder}
        required={required}
        selectOptions={selectOptions}
        smallText={smallText}
        type={type}
        value={value}
      >
        {children}
      </StyledInputComponent>
    );
  }
}

export default StyledInputContainer;

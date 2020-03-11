import * as React from 'react';

class SelectOption extends React.PureComponent<React.OptionHTMLAttributes<HTMLOptionElement>> {
  render() {
    const { children } = this.props;
    return (
      <option {...this.props}>
        {children}
      </option>
    );
  }
}

export default SelectOption;

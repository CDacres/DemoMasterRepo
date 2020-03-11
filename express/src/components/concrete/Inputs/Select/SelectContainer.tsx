import * as React from 'react';
import shortid from 'shortid';

// Components
import SelectComponent from '@src/components/concrete/Inputs/Select/SelectComponent';
import Option from '@src/components/concrete/Inputs/Select/Option';

// Types
import { SelectOption } from '@src/typings/types';

type Props = {
  defaultText?: string;
  id?: string;
  name?: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  value: string | number;
};

class SelectContainer extends React.Component<Props> {
  static defaultProps = {
    defaultText: 'Select...', // TODO: translation key
    id: 'select',
    name: 'select',
  };

  protected options: SelectOption[];

  constructor(props: Props) {
    super(props);
    this.options = this.renderOptions(props.options);
  }

  handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.onChange(event.target.value);
  }

  renderOptions = options => options.map(option => (
    <Option
      key={shortid.generate()}
      option={option}
    />
  ))

  render() {
    const { defaultText, id, name, value } = this.props;
    return (
      <SelectComponent
        defaultText={defaultText}
        id={id}
        name={name}
        onChange={this.handleChange}
        options={this.options}
        value={value}
      />
    );
  }
}

export default SelectContainer;

import * as React from 'react';

// Core
import { timeString } from '@src/core';

// Components
import SelectInput from '@src/components/Listing/Form/SelectInput';
import SelectOption from '@src/components/Listing/Form/SelectInput/SelectOption';

type Props = {
  errors?: string[];
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  since?: number;
  spanUnit?: number;
  until?: number;
  value: number;
};

class TimeInput extends React.Component<Props> {

  renderOption = (i: number, k: number) => (
    <SelectOption
      key={k}
      value={i}
    >
      {timeString(i)}
    </SelectOption>
  )

  renderTimes = () => {
    const spanUnit = this.props.spanUnit || 30;
    const since = this.props.since || 0;
    const until = this.props.until || 24 * 60;

    const options = [];
    for (let i = since; i <= until; i += spanUnit) {
      options.push(i);
    }

    const v = this.props.value || 0;
    if (options.indexOf(v) === -1) {
      options.push(v);
    }

    return options.map((i, k) => this.renderOption(i, k));
  }

  render() {
    const { errors, onChange, value } = this.props;
    return (
      <SelectInput
        errors={errors}
        name="time"
        onChange={onChange}
        value={value}
      >
        {this.renderTimes()}
      </SelectInput>
    );
  }
}

export default TimeInput;

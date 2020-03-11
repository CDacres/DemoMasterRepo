import * as React from 'react';
import { observer } from 'mobx-react';

// Core
import { Span } from '@src/core/domain';

// Components
import FormFieldError from '@src/components/Listing/Form/FormFieldError';
import TimeInput from '@src/components/Listing/Form/TimeInput';
import Editor from '@src/components/Listing/Editor';
import Strip from '@src/components/Listing/Layout/Strip';
import ValidationWrapper from '@src/components/Listing/Form/ValidationWrapper';

type Props = {
  errors?: string[];
  span: Span;
};

@observer
class DaySpanEdit extends Editor<Props> {
  render() {
    const { errors, span } = this.props;
    return (
      <ValidationWrapper errors={errors}>
        <Strip
          colGap="8px"
          cols="1fr 1fr"
        >
          <TimeInput
            errors={errors}
            onChange={this.onInputIntChange(span, 'start', false)}
            value={span.start}
          />
          <TimeInput
            errors={errors}
            onChange={this.onInputIntChange(span, 'end', false)}
            value={span.end}
          />
        </Strip>
        <FormFieldError errors={errors} />
      </ValidationWrapper>
    );
  }
}

export default DaySpanEdit;

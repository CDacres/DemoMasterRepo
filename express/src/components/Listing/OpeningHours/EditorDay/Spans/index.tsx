import * as React from 'react';

// Core
import { DailyHours } from '@src/core/domain';

// Components
import Editor from '@src/components/Listing/Editor';
import Column from '@src/components/Listing/Layout/Column';
import DaySpanEdit from '@src/components/Listing/OpeningHours/EditorDay/Spans/DaySpanEdit';

type Props = {
  day: DailyHours;
  errors: errorProps;
};

type errorProps = Array<{
  day: DailyHours;
  result: string[];
  span: number;
}>;

class Spans extends Editor<Props> {
  render() {
    const { day, errors, model } = this.props;
    let hourErrors: errorProps;
    if (errors !== null) {
      const errorList = errors.filter(e => e.day === day);
      if (errorList.length) {
        hourErrors = errorList;
      }
    }
    return (
      <Column gap="8px">
        {day.spans.map((s, sk) => {
          const dayErrors: string[] = [];
          if (hourErrors) {
            hourErrors.forEach(error => {
              if (error.span === sk) {
                error.result.forEach(result => {
                  dayErrors.push(result);
                });
              }
            });
          }
          return (
            <DaySpanEdit
              errors={dayErrors}
              key={sk}
              model={model}
              span={s}
            />
          );
        })}
      </Column>
    );
  }
}

export default Spans;

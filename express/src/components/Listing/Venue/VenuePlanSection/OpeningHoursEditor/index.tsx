import * as React from 'react';
import { observer } from 'mobx-react';
import { css } from 'aphrodite/no-important';

// Core
import { DailyHours, dayIs247, dayIsClosed, dayIsSplit } from '@src/core/domain';

// Styles
import styles from './styles';

// Components
import CheckboxInput from '@src/components/Listing/Form/CheckboxInput';
import Editor from '@src/components/Listing/Editor';
import EditorDay from '@src/components/Listing/OpeningHours/EditorDay';
import Cell from '@src/components/Listing/OpeningHours/EditorDay/Cell';
import Spans from '@src/components/Listing/OpeningHours/EditorDay/Spans';
import Spell from '@src/components/Listing/Translate/Spell';

// Models
import { VenuePlanModel } from '@src/components/Listing/Models';

type Props = {
  days: DailyHours[];
};

@observer
class OpeningHoursEditor extends Editor<Props, {}, VenuePlanModel> {
  render() {
    const { days, model, model: { openingHoursErrors } } = this.props;
    return (
      <div className={css(styles.container)}>
        <div>
          <Spell word="listing.opening_hours_days" />
        </div>
        <div>
          <Spell word="listing.opening_hours_hours" />
        </div>
        <div>
          <Spell word="listing.opening_hours_split" />
        </div>
        <div>
          <Spell word="listing.opening_hours_24_hours" />
        </div>
        <div>
          <Spell word="common.closed" />
        </div>
        <div className={css(styles.dividerLine)} />
        {days.map((d, dk) => {
          const isSplit = dayIsSplit(d);
          const is247 = dayIs247(d);
          const isClosed = dayIsClosed(d);
          return (
            <EditorDay
              checks={
                <React.Fragment>
                  <Cell span={1}>
                    <CheckboxInput
                      checked={isSplit}
                      name="split"
                      onChange={() => model.dayToggleSplit(d)}
                    />
                  </Cell>
                  <Cell span={1}>
                    <CheckboxInput
                      checked={is247}
                      name="week_long"
                      onChange={() => model.dayToggle247(d)}
                    />
                  </Cell>
                  <Cell span={1}>
                    <CheckboxInput
                      checked={isClosed}
                      name="closed"
                      onChange={() => model.dayToggleOpen(d)}
                    />
                  </Cell>
                </React.Fragment>
              }
              day={d}
              is247={is247}
              isClosed={isClosed}
              isLabelled={is247 || isClosed}
              key={dk}
              spans={
                <Spans
                  day={d}
                  errors={openingHoursErrors}
                  model={model}
                />
              }
              type="venue"
            />
          );
        })}
      </div>
    );
  }
}

export default OpeningHoursEditor;

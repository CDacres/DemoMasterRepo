import * as React from 'react';
import { observer } from 'mobx-react';
import { css } from 'aphrodite/no-important';

// Core
import { DailyHours, dayIs247, dayIsClosed } from '@src/core/domain';

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
import { SpacePriceModel } from '@src/components/Listing/Models';

type Props = {
  days: DailyHours[];
};

@observer
class OpeningHoursEditor extends Editor<Props, {}, SpacePriceModel> {
  render() {
    const { days, model, model: { priceScheduleErrors } } = this.props;
    return (
      <div className={css(styles.container)}>
        <div>
          <Spell word="listing.opening_hours_days" />
        </div>
        <div>
          <Spell word="listing.opening_hours_hours" />
        </div>
        <div>
          <Spell word="common.closed" />
        </div>
        <div className={css(styles.dividerLine)} />
        {days.map((d, dk) => {
          const is247 = dayIs247(d);
          const isClosed = dayIsClosed(d);
          return (
            <EditorDay
              checks={
                <Cell span={1}>
                  <CheckboxInput
                    checked={isClosed}
                    name="closed"
                    onChange={() => model.dayToggleOpen(d)}
                  />
                </Cell>
              }
              day={d}
              is247={is247}
              isClosed={isClosed}
              isLabelled={is247 || isClosed}
              key={dk}
              spans={
                <Spans
                  day={d}
                  errors={priceScheduleErrors}
                  model={model}
                />
              }
              type="space"
            />
          );
        })}
      </div>
    );
  }
}

export default OpeningHoursEditor;

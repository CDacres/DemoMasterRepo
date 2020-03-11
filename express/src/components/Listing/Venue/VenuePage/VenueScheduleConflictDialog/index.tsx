/* tslint:disable:max-line-length */
import * as React from 'react';
import { toJS } from 'mobx';
import { css } from 'aphrodite/no-important';

// Core
import { range } from '@src/core';
import { applySpanAction, DailyHours, dayIsOpen, planString, PriceCoverage, SpanAction, spanString, weekArray } from '@src/core/domain';

// Styles
import styles from './styles';

// Components
import Button from '@src/components/Listing/Buttons/Button';
import OptionButton from '@src/components/Listing/Buttons/OptionButton';
import OptionButtonItem from '@src/components/Listing/Buttons/OptionButton/OptionButtonItem';
import Column from '@src/components/Listing/Layout/Column';
import Divider from '@src/components/Listing/Layout/Divider';
import Strip from '@src/components/Listing/Layout/Strip';
import Dialog from '@src/components/Listing/Dialog';
import DialogActionSection from '@src/components/Listing/Dialog/DialogActionSection';
import DialogContentSection from '@src/components/Listing/Dialog/DialogContentSection';
import DialogTitleSection from '@src/components/Listing/Dialog/DialogTitleSection';
import Spell from '@src/components/Listing/Translate/Spell';
import PlanTitle from '@src/components/Listing/OpeningHours/PlanTitle';

// Models
import { VenueModel } from '@src/components/Listing/Models';

// Types
import { currencySymbol } from '@src/components/Listing/Form';

type Props = {
  model: VenueModel;
  onClose: VoidFunction;
  onSubmit: VoidFunction;
  open: boolean;
};

class VenueScheduleConflictDialog extends React.Component<Props> {

  options = (target: DailyHours, price: DailyHours): SpanAction[] => {
    const actions: SpanAction[] = [];
    const strip = Array.from(range(24 * 60)).map(() => 0);
    for (const span of target.spans) {
      for (let si = span.start; si < span.end; si++) {
        strip[si] = 1;
      }
    }
    // console.log({ ns: strip, venue: venue.spans });
    for (const ps of price.spans) {
      // intersection
      const psStrip = strip.slice(ps.start + 1, ps.end - 1);
      const duration = ps.end - ps.start;
      const left = psStrip.indexOf(1);
      if (left !== -1) {
        if (left === 0) {
          const right = psStrip.lastIndexOf(1);
          if (right < duration - 2) {
            actions.push({ kind: 'SHIFT_RIGHT', delta: right });
          } else {
            // yield { kind: 'DELETE' };
          }
        } else if (left === duration) {
          // yield { kind: 'DELETE' };
        }
      } else {

        const leftIndex = strip.slice(0, ps.start).lastIndexOf(1);
        const rightIndex = strip.indexOf(1, ps.end + 1);
        const leftDistance = ps.start - leftIndex - 1;
        const rightDistance = rightIndex - ps.end;

        if (leftIndex !== -1 && rightIndex !== -1) {
          if (leftDistance < rightDistance) {
            actions.push({ kind: 'SHIFT_LEFT', delta: leftDistance });
            actions.push({ kind: 'STRETCH_LEFT', delta: leftDistance });
          } else if (leftDistance > rightDistance) {
            actions.push({ kind: 'SHIFT_RIGHT', delta: rightDistance });
            actions.push({ kind: 'STRETCH_RIGHT', delta: rightDistance });
          } else { // equal
            actions.push({ kind: 'SHIFT_LEFT', delta: leftDistance });
            actions.push({ kind: 'STRETCH_LEFT', delta: leftDistance });

            actions.push({ kind: 'SHIFT_RIGHT', delta: rightDistance });
            actions.push({ kind: 'STRETCH_RIGHT', delta: rightDistance });
          }
        } else if (leftIndex !== -1 && leftDistance !== 0) {
          actions.push({ kind: 'SHIFT_LEFT', delta: leftDistance });
          actions.push({ kind: 'STRETCH_LEFT', delta: leftDistance });
        } else if (rightIndex !== -1 && rightDistance !== 0) {
          actions.push({ kind: 'SHIFT_RIGHT', delta: rightDistance });
          actions.push({ kind: 'STRETCH_RIGHT', delta: rightDistance });
        }
      }
    }
    return actions;
  }

  handleChooseTimeframe = () => {
    // TODO
  }

  render() {
    const { model: { spaces, venue }, onClose, onSubmit, open } = this.props;
    const def = toJS(venue.openingHours);
    if (!def) {
      return null;
    }
    const openingHours = planString(def);
    const venuePlan = def.filter(dayIsOpen).mapBy(x => x.day);
    const sections = toJS(spaces).many(s => s.prices.filter(x => !!x.parameters.schedule).map(price => {
      const p = price.parameters;
      return {
        space: s,
        price: p,
        days: p.schedule.days.filter(dayIsOpen).filter(x => !!venuePlan[x.day]).groupBy(d => spanString(d.spans)).map(({ items }) => ({
          items,
          openHours: [
            {
              days: weekArray(items.map(x => x.day)),
              time: spanString(items.first().spans),
            },
          ],
        })),
      };
    })).many(({ space, price, days }) =>
      days.map(group => ({
        space,
        price,
        group,
        first: group.items.first(),
      }))).map((a) => ({
        ...a,
        options: this.options(venuePlan[a.first.day], a.first).orderBy(o => applySpanAction(a.first.spans.first(), o).start),
      }));
    return (
      <Dialog
        onClose={onClose}
        open={open}
      >
        <DialogTitleSection
          onClose={onClose}
          title="listing.outside_opening_hours"
        />
        <DialogContentSection isLarge={true}>
          <Column gap="24px">
            <span>
              <span className={css(styles.text)}>
                <Spell word="listing.new_opening_hours" />
              </span>
              <span className={css(styles.text)}>
                {'  |  '}
              </span>
              <span className={css(styles.title)}>
                {openingHours &&
                  <PlanTitle
                    limit={0}
                    openingHours={openingHours}
                  />
                }
              </span>
            </span>
            {sections.map((section, k) => (
              <React.Fragment key={k}>
                <Divider />
                <Strip
                  cols="1fr auto"
                  itemsVert="flex-start"
                >
                  <Column gap="8px">
                    <span>
                      <span className={css(styles.text)}>
                        {section.space.name}
                      </span>
                      <span className={css(styles.text)}>
                        {'  |  '}
                      </span>
                      <span className={css(styles.sectionTitle)}>
                        <PlanTitle
                          limit={0}
                          openingHours={section.group.openHours}
                        />
                      </span>
                    </span>
                    <div>
                      <span className={css(styles.price)}>
                        {(section.price.coverage === PriceCoverage.MINIMUMSPEND) ? (
                          <React.Fragment>
                            {currencySymbol(section.price.constraints.spend.minSpendAmount.currency)}{section.price.constraints.spend.minSpendAmount.value}
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            {currencySymbol(section.price.unitPrice.currency)}{section.price.unitPrice.value}
                          </React.Fragment>
                        )}
                      </span>
                    </div>
                  </Column>
                  <div>
                    <span className={css(styles.changeText)}>
                      <Spell word="listing.change_to" />
                    </span>
                    <OptionButton>
                      {section.options.map((i, index) => (
                        <OptionButtonItem
                          key={index}
                          onClick={this.handleChooseTimeframe}
                        >
                          {spanString(applySpanAction(section.first.spans.first(), i))}
                        </OptionButtonItem>
                      ))}
                    </OptionButton>
                  </div>
                </Strip>
              </React.Fragment>
            ))}
          </Column>
        </DialogContentSection>
        <DialogActionSection>
          <Button onClick={onClose}>
            <Spell word="common.cancel" />
          </Button>
          <Button
            color="primary"
            onClick={onSubmit}
          >
            <Spell word="common.save" />
          </Button>
        </DialogActionSection>
      </Dialog>
    );
  }
}

export default VenueScheduleConflictDialog;

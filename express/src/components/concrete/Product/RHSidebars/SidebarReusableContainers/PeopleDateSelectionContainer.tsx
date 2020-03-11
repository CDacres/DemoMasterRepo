/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';
import moment from 'moment';

// Styles
import sidebarStyles from '../styles';

// Connectors
import { useConfig } from '@src/store/connectors';

// Components
import Label from '@src/components/concrete/Label';
import OptionGroup from '@src/components/concrete/Dropdown/OptionGroup';
import Select from '@src/components/concrete/Dropdown/Select';
import DatepickerSingle from '@src/components/concrete/Datepicker/DatepickerSingle';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

// Types
import { Store } from '@src/typings/types';

type Props = {
  config: Store.Config;
  max?: number;
  min?: number;
  select?: (prop?: any, e?: any) => void;
  stepBack?: () => void;
};

type State = {
  allSelected: boolean;
  date: null | moment.Moment;
  people: any;
};

class PeopleDateSelectionContainer extends React.PureComponent<Props, State> {

  state: State = {
    allSelected: false,
    date: null,
    people: this.props.min || 0,
  };

  protected defaultState = { ...this.state };

  goToNextStep = (): void => {
    if (this.state.people && this.state.date) {
      this.props.select('peopleDate', { people: this.state.people, date: this.state.date });
    }
  }

  back = () => {
    this.setState({ ...this.defaultState });
    this.props.stepBack();
  }

  changeState = (prop: string, e: any): void => {
    this.setState({
      ...this.state,
      [prop]: e,
      allSelected: (prop === 'people' ? this.state.date : this.state.people) && true,
    }, () => this.goToNextStep());
  }

  dateSelect = (e: object): void => this.changeState('date', e);
  peopleSelect = (e: string | number): void => this.changeState('people', e);

  render() {
    const { config: { datepickerLang }, max, min } = this.props;
    const { allSelected, date, people } = this.state;
    const capacityValues = [];
    for (let i = min; i <= max; ++i) {
      capacityValues.push({ value: i + '', label: i + '' });
    }
    return (
      <div>
        <Label>
          <Translatable content={{ transKey: 'room.date_people' }} />
        </Label>
        {allSelected ? (
          <Select action={this.back}>
            <span>
              <Translatable content={{ transKey: 'common.people_count', count: people, replacements: { number: people } }} />, {date && date.format('ddd DD MMM YY')}
            </span>
          </Select>
        ) : (
          <React.Fragment>
            {people ? (
              <Select action={this.peopleSelect}>
                <span>
                  <Translatable content={{ transKey: 'common.people_count', count: people, replacements: { number: people } }} />
                </span>
              </Select>
            ) : (
              <OptionGroup
                chosen={this.peopleSelect}
                options={capacityValues.map((el: any) => {
                  return { title: el };
                })}
              />
            )}
            <div className={css(sidebarStyles.datepicker)}>
              <DatepickerSingle
                date={date}
                datepickerLang={datepickerLang}
                onChange={this.dateSelect}
              />
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default useConfig(PeopleDateSelectionContainer);

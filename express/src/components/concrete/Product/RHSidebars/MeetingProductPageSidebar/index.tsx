/*tslint:disable:max-line-length*/
import * as React from 'react';
import * as moment from 'moment';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import InfoPhrase from '@src/components/concrete/Product/InfoPhrase';
import StyledButton from '@src/components/concrete/Button/StyledButton';
import Times from '@src/components/concrete/Product/RHSidebars/MeetingProductPageSidebar/TimesContainer';
import Selection from '@src/components/concrete/Product/RHSidebars/SidebarReusableContainers/PeopleDateSelectionContainer';
import SidebarTemplate from '@src/components/concrete/Product/RHSidebars/SidebarReusableContainers/SidebarTemplate';
import Summary from '@src/components/concrete/Product/RHSidebars/SidebarReusableContainers/SummaryCostsContainer';
import Time from '@src/components/concrete/Product/RHSidebars/SidebarReusableContainers/SingleTimeSelectionContainer';
import Type from '@src/components/concrete/Product/RHSidebars/SidebarReusableContainers/TypesSelectionContainer';

// Connectors
import { useBooking } from '@src/store/connectors';

// Types
import { Currency } from '@src/typings/types';

type Props = {
  booking?: (e?: any) => void;
  currency: Currency;
  maxCapacity?: number;
  minCapacity?: number;
  price?: {
    daily?: number;
    hourly?: number;
    monthly?: number;
  };
  rating?: number;
  reviews?: number;
  types: Array<{
    options: string[];
    price?: {
      amount: string;
      discounted: number;
    };
    price_person?: number;
    subtitle?: string;
    title: string;
    type: string;
  }>;
};

type State = {
  ddr?: any;
  peopleDate?: {
    people: number;
    date?: moment.Moment;
  };
  step: number;
  time: any;
  total: number;
  type: string;
};

class MeetingProductPageSidebar extends React.PureComponent<Props, State> {
  state: State = {
    ddr: null,
    peopleDate: null,
    step: 1,
    time: null,
    total: 0,
    type: this.props.types[0].type,
  };

  select = (prop: string, e: any): void => {
    this.setState({
      ...this.state,
      step: (this.state.step === 3) ? this.state.step : ++this.state.step,
      [prop]: e,
      total: (prop === 'time') ? this.calcConditionsForTotal(prop, e) : null,
    });
  }

  typeSelect = (prop: string, e: any) => {
    if (e.type.includes('DDR')) {
      const ddr = this.props.types.find(el => el.type === e.type);
      this.setState({
        ...this.state,
        step: ++this.state.step,
        [prop]: e.type,
        ddr,
      });
      return;
    }
    this.select(prop, e.type);
  }

  dateSelect = (prop: string, e: any): void => {
    const step = ((this.state.type && (this.state.type === 'hour' || this.state.type === '1/2 day')) ? 2 : 3 );
    this.setState({
      ...this.state,
      step,
      [prop]: e,
      total: this.calcConditionsForTotal(prop, e),
    });
  }

  timeSelect = (e: any) => {
    this.select('time', e);
  }

  stepBack = (step: number, pos?: number): void => {
    const newState = { ...this.state };
    Object.keys(this.state).map((key, index) => {
      if (index > (pos ? pos : step)) {
        newState[key] = null;
      }
    });
    this.setState({
      ...newState,
      step,
    });
  }

  backToTypes = (): void => this.stepBack(0);
  backToDates = (): void => this.stepBack(1);
  backToTimes = (): void => this.stepBack(2);

  calcTotalSum = (ddr?: any, arg?: any): number => {
    if (ddr) {
      return Math.round(ddr.price_person * arg.people);
    }
    const chosenType = this.state.type && this.props.types.find(el => el.type === this.state.type);
    if (chosenType.type && chosenType.type === 'hour') {
      return Math.round(+this.props.price.hourly * (arg.length / 2)); // TODO: implement discounted price
    }
    if (chosenType.type && chosenType.type === '1/2 day') {
      return Math.round(this.props.price.daily / 2);
    }
    return this.props.price.daily;
  }

  calcConditionsForTotal = (prop: string, e: any): number => {
    if (prop === 'time') {
      return this.calcTotalSum(null, e.time);
    }
    if (prop === 'type' && e === 'Daily') {
      return this.calcTotalSum();
    }
    if (prop === 'peopleDate') {
      return this.calcTotalSum(this.state.ddr, e);
    }
    return null;
  }

  book = (): void => {
    const { ddr, peopleDate, time, total, type } = this.state;
    if (type && peopleDate) {
      this.props.booking({
        type,
        people: peopleDate.people,
        date: peopleDate.date,
        time: time || 'no time',
        package: ddr || 'no package',
        totalCost: total,
      });
    }
  }

  render() {
    const { currency, maxCapacity, minCapacity, price, rating, reviews, types } = this.props;
    const { ddr, peopleDate, step, time, total, type } = this.state;
    const chosenType = types.find(el => el.type === type);
    const hourlyPrices = {
      amount: price.hourly,
      discounted: null, // TODO: implement discounted price
    };
    const currentPrice = type === 'Daily' ? price.daily : hourlyPrices.discounted ? hourlyPrices.discounted : hourlyPrices.amount;
    return (
      <SidebarTemplate
        currency={currency.currency_symbol_left}
        price={price}
        rating={rating}
        reviews={reviews}
      >
        {step >= 0 &&
          <Type
            select={this.typeSelect}
            stepBack={this.backToTypes}
            title={chosenType ? chosenType.title : null}
            type={type}
            types={types}
          />
        }
        {step >= 1 &&
          <Selection
            max={maxCapacity}
            min={minCapacity}
            select={this.dateSelect}
            stepBack={this.backToDates}
          />
        }
        {(step >= 2 && type === 'hour') &&
          <Times
            currency={currency.currency_symbol_left}
            price={hourlyPrices}
            select={this.timeSelect}
            timeConfig="doubleTime"
          />
        }
        {(step >= 2 && type === '1/2 day') &&
          <Time
            select={this.select}
            stepBack={this.backToTimes}
            time={time}
            timeConfig="halfDay"
          />
        }
        {step === 3 &&
          <Summary
            currency={currency.currency_symbol_left}
            ddr={ddr}
            people={peopleDate.people}
            price={currentPrice}
            time={time}
            total={total ? total : currentPrice}
            type={type}
          />
        }
        <div className={css(margin.top_3)}>
          <Translatable content={{ transKey: 'room.book' }}>
            <StyledButton
              action={this.book}
              buttonColor="primary"
              customStyle={[pagestyles.fullColumn]}
            />
          </Translatable>
        </div>
        <InfoPhrase>
          <Translatable content={{ transKey: 'room.not_charged_yet' }} />
        </InfoPhrase>
      </SidebarTemplate>
    );
  }
}

export default useBooking(MeetingProductPageSidebar);

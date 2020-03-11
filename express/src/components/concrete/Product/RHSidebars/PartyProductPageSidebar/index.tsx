import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import InfoPhrase from '@src/components/concrete/Product/InfoPhrase';
import StyledButton from '@src/components/concrete/Button/StyledButton';
import Message from '@src/components/concrete/Product/RHSidebars/SidebarReusableContainers/MessageContainer';
import Selection from '@src/components/concrete/Product/RHSidebars/SidebarReusableContainers/PeopleDateSelectionContainer';
import SidebarTemplate from '@src/components/concrete/Product/RHSidebars/SidebarReusableContainers/SidebarTemplate';
import Summary from '@src/components/concrete/Product/RHSidebars/SidebarReusableContainers/SummaryCostsContainer';
import Type from '@src/components/concrete/Product/RHSidebars/SidebarReusableContainers/TypesSelectionContainer';
import Time from '@src/components/concrete/Product/RHSidebars/SidebarReusableContainers/SingleTimeSelectionContainer';

// Connectors
import { useBooking, useMsg } from '@src/store/connectors';

// Types
import { Currency } from '@src/typings/types';

type Props = {
  booking?: (e?: any) => void;
  currency: Currency;
  maxCapacity?: number;
  minCapacity?: number;
  orderMsg?: (e?: any) => void;
  price?: {
    daily?: number;
    hourly?: number;
    monthly?: number;
  };
  rating?: number;
  reviews?: number;
  types: Array<{
    deposit?: number;
    price?: { amount: string };
    price_person?: number;
    subtitle?: string;
    title: string;
    totalPrice?: number;
    type: string;
  }>;
};

type State = {
  ddr: any;
  message: string;
  peopleDate: null | any;
  step: number;
  time: any;
  total: number;
  type: string;
};

class PartyProductPageSidebar extends React.PureComponent<Props, State> {

  state: State = {
    ddr: null,
    message: null,
    peopleDate: null,
    step: 0,
    time: null,
    total: 0,
    type: null,
  };

  select = (prop: string, e: any): void => {
    this.setState({
      ...this.state,
      step: (prop === 'message') ? this.state.step : ++this.state.step,
      [prop]: e,
      total: (prop === 'time' || prop === 'message') ? this.calcTotalCost() : null,
    });
  }

  selectType = (prop: string, e: any) => {
    if (e.type.indexOf('package') >= 0) {
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

  stepBack = (step: number): void => {
    if (step === 2) {
      this.setState({
        ...this.state,
        step,
        time: null,
      });
      return;
     }
    const newState = { ...this.state };
    Object.keys(this.state).map((key, index) => {
      if (index > step) {
        newState[key] = null;
      }
    });
    this.setState({
      ...newState,
      step,
    });
  }

  backToSelection = (): void => this.stepBack(0);
  backType = (): void => this.stepBack(1);
  backTime = (): void => {
    if (this.state.step === 4) {
      this.stepBack(3);
      return;
    }
    this.stepBack(2);
  }

  calcTotalCost = (): number => {
    if (this.state.ddr) {
      return Math.round(this.state.ddr.price_person * this.state.peopleDate.people);
    }
    const chosenType = this.props.types.find(el => el.type === this.state.type);
    if (chosenType.type === 'Book Table') {
      return Math.round(chosenType.deposit * this.state.peopleDate.people);
    }
    return chosenType.totalPrice;
  }

  messageText = (e: React.ChangeEvent<HTMLTextAreaElement>) => this.select('message', e.target.value);

  sendEnquiry = (): void => {
    const { message, step } = this.state;
    if (step === 3) {
      this.setState({
        ...this.state,
        step: 4,
      });
      return;
    }
    if (step === 4 && message) {
      const { ddr, peopleDate, time, total, type } = this.state;
      this.props.orderMsg({
        message,
        subjectDetails: {type,
          people: peopleDate.people,
          date: peopleDate.date,
          arrivalTime: time,
          package: ddr || 'no package',
          totalCost: total,
        },
      });
    }
  }

  book = (): void => {
    const { ddr, peopleDate, time, total, type } = this.state;
    if (time) {
      this.props.booking({
        type,
        people: peopleDate.people,
        date: peopleDate.date,
        arrivalTime: time,
        package: ddr || 'no package',
        totalCost: total,
      });
    }
  }

  render() {
    const { currency, maxCapacity, minCapacity, price, rating, reviews, types } = this.props;
    const { ddr, peopleDate, step, time, total, type } = this.state;
    const chosenType = types.find(el => el.type === type);
    return (
      <SidebarTemplate
        currency={currency.currency_symbol_left}
        price={price}
        rating={rating}
        reviews={reviews}
      >
        {step >= 0 &&
          <Selection
            max={maxCapacity}
            min={minCapacity}
            select={this.select}
            stepBack={this.backToSelection}
          />
        }
        {step >= 1 &&
          <Type
            select={this.selectType}
            stepBack={this.backType}
            title={chosenType ? chosenType.title : null}
            type={type}
            types={types}
          />
        }
        {step >= 2 &&
          <Time
            label="room.arrival_time"
            select={this.select}
            stepBack={this.backTime}
            time={time}
          />
        }
        {step === 3 &&
          <Summary
            currency={currency.currency_symbol_left}
            ddr={ddr}
            people={peopleDate.people}
            total={total}
            type={type}
          />
        }
        {step === 4 &&
          <Message messageText={this.messageText} />
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
        <div className={css(margin.top_3)}>
          <Translatable content={{ transKey: step >= 4 ? 'room.not_ready_yet' : 'room.send_enquiry' }}>
            <StyledButton
              action={this.sendEnquiry}
              buttonColor="grey"
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

export default useBooking(useMsg(PartyProductPageSidebar));

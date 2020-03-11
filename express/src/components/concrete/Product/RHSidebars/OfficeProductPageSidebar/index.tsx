import * as React from 'react';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import InfoPhrase from '@src/components/concrete/Product/InfoPhrase';
import SidebarTemplate from '@src/components/concrete/Product/RHSidebars/SidebarReusableContainers/SidebarTemplate';
import Type from '@src/components/concrete/Product/RHSidebars/SidebarReusableContainers/TypesSelectionContainer';
import Time from '@src/components/concrete/Product/RHSidebars/SidebarReusableContainers/SingleTimeSelectionContainer';
import DateContainer from '@src/components/concrete/Product/RHSidebars/OfficeProductPageSidebar/DateContainer';
import ButtonContainer from '@src/components/concrete/Product/RHSidebars/OfficeProductPageSidebar/ButtonContainer';
import Message from '@src/components/concrete/Product/RHSidebars/OfficeProductPageSidebar/ReqContainer';

// Connectors
import { useViewing, useMsg } from '@src/store/connectors';

// Types
import { Currency } from '@src/typings/types';

type Props = {
  currency: Currency;
  orderMsg?: (e?: any) => void;
  price?: {
    daily?: number;
    hourly?: number;
    monthly?: number;
  };
  rating?: number;
  reviews?: number;
  viewing?: (e?: any) => void;
  types: Array<{
    price?: { amount: string };
    subtitle?: string;
    title: string;
    type: string;
  }>;
};

type State = {
  date: any;
  msg: any;
  requestInfo: any;
  step: number;
  time: any;
  toConfirm: any;
  type: string;
};

class OfficeProductPageSidebar extends React.PureComponent<Props, State> {

  state: State = {
    date: null,
    msg: null,
    requestInfo: null,
    step: 0,
    time: null,
    toConfirm: null,
    type: null,
  };

  selectType = (prop: string, e: any) => {
    this.select(prop, e.type);
  }

  select = (prop: string, e: any): void => {
    this.setState({
      ...this.state,
      step: ++this.state.step,
      [prop]: e,
    });
  }

  handleButton = (): void => {
    if (!this.state.toConfirm && this.state.type) {
      this.setState({
        ...this.state,
        step: this.state.step + 1,
        toConfirm: true,
      });
      return;
     }
    if (this.state.time) {
      const { date, time, type } = this.state;
      const dataToState = { date, time, type };
      this.props.viewing(dataToState);
    }
  }

  requestInfo = (): void => {
    if (!this.state.requestInfo) {
      this.setState({ requestInfo: true });
      return;
    }
    const { msg, type } = this.state;
    this.props.orderMsg({ type, msg });
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

  backToTypes = () => this.stepBack(0);
  backFromMsg = () => this.stepBack(1);
  backFromTime = () => this.stepBack(3, 4);

  userMessage = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    this.setState({ msg: e.target.value });
  }

  render() {
    const { currency, price, rating, reviews, types } = this.props;
    const { date, requestInfo, step, time, toConfirm, type } = this.state;
    const chosenType = types.find(el => el.type === type);
    return (
      <SidebarTemplate
        currency={currency.currency_symbol_left}
        price={price}
        rating={rating}
        reviews={reviews}
      >
        {step >= 0 &&
          <Type
            select={this.selectType}
            stepBack={this.backToTypes}
            title={chosenType ? chosenType.title : null}
            type={type}
            types={types}
          />
        }
        {requestInfo &&
          <Message
            back={this.backFromMsg}
            userMessage={this.userMessage}
          />
        }
        {(toConfirm && step >= 2) &&
          <DateContainer
            date={date}
            select={this.select}
            stepBack={this.stepBack}
          />
        }
        {(toConfirm && step >= 3) &&
          <Time
            select={this.select}
            stepBack={this.backFromTime}
            time={time}
          />
        }
        <ButtonContainer
          handleButton={this.handleButton}
          request={this.requestInfo}
          requestInfo={requestInfo}
          toConfirm={toConfirm}
        />
        <InfoPhrase>
          <Translatable content={{ transKey: 'room.not_charged_yet' }} />
        </InfoPhrase>
      </SidebarTemplate>
    );
  }
}

export default useMsg(useViewing(OfficeProductPageSidebar));

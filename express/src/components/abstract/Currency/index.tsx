import * as React from 'react';

// Helpers
import { CurrencyHelper } from '@src/helpers';

type Props = {
  countryCode?: string;
  currency?: string;
  value: number;
};

class Currency extends React.Component<Props> {
  fetchCurrencySymbol = () => {
    const { countryCode, currency } = this.props;
    const currencyHelper = new CurrencyHelper();
    if (countryCode) {
      currencyHelper.setCurrencyByCountryCode(countryCode);
    } else if (currency) {
      currencyHelper.setCurrencyByCode(currency);
    }
    return currencyHelper.getSymbol();
  }

  render() {
    const { value } = this.props;
    return (
      <React.Fragment>
        {this.fetchCurrencySymbol()}
        {value}
      </React.Fragment>
    );
  }
}

export default Currency;

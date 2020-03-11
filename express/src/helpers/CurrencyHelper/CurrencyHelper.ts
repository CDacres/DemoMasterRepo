import * as Countries from './countries/dist/countries.json';
import * as Currencies from './world-currencies/currencies.json';

export default class CurrencyHelper {
  protected countries;
  protected currency;
  protected currencies;

  constructor() {
    this.countries = Countries;
    this.currencies = Currencies;
    this.currency = this.currencies.find(currency => currency.cc === 'GBP');
  }

  setCurrencyByCode(currencyCode: string) {
    this.currency = this.currencies.find(
      currency => currency.cc === currencyCode
    );
  }

  setCurrencyByCountryCode(countryCode: string) {
    const country = this.countries.find(c => c.cca2 === countryCode);
    if (!country) {
      throw new Error(
        `Country is ${country} and countryCode is ${countryCode}`
      );
    }
    this.findCurrency(country.currency);
  }

  findCurrency(currencies: string[], key: number = 0) {
    this.currency = this.currencies.find(c => c.cc === currencies[key]);
    if (typeof this.currency === 'undefined' && currencies.length > 0 && key < currencies.length) {
      this.findCurrency(currencies, ++key);
    }
  }

  getSymbol() {
    return this.currency.symbol;
  }
}

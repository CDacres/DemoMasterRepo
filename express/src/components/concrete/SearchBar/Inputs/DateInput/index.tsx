import * as React from 'react';
import { css } from 'aphrodite/no-important';
import moment from 'moment';

// Styles
import searchBarStyles from '../../styles';
import { pagestyles } from '@src/styles';

// Connectors
import { useConfig, useLang } from '@src/store/connectors';

// Helpers
import { TranslationHelper } from '@src/helpers';

// Components
import StatefulComponent, { StatefulProps } from '@src/components/base/StatefulComponent';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import Datepicker from '@src/components/concrete/Datepicker';

// Types
import { Store } from '@src/typings/types';

type Props = StatefulProps & {
  config: Store.Config;
  date: moment.Moment;
  datepickerLang: any;
  lang: Store.Lang;
  selectDate: (date: moment.Moment) => any;
};

type State = {
  machine: {
    focused: boolean;
  };
  name: string;
  value: string | moment.Moment;
};

class DateInput extends StatefulComponent<Props, State> {
  protected translationHelper = new TranslationHelper({ messages: this.props.lang });
  protected placeholder = this.translationHelper.get('common.when');

  constructor(props: Props) {
    super(props);
    this.state = {
      machine: this.generateState('default'),
      name: 'default',
      value: props.date,
    };
  }

  generateState(stateName: string) {
    switch (stateName) {
      case 'focused':
        return {
          focused: true,
        };
      default:
        return {
          focused: false,
        };
    }
  }

  handleBlur = () => {
    this.goToState('default');
  }

  handleChange = date => {
    this.setState({ value: date }, () => {
      this.goToState('default');
    });
    this.props.selectDate(date);
  }

  handleFocus = () => {
    this.goToState('focused');
  }

  render() {
    const { config: { datepickerLang, domain } } = this.props;
    const { machine: { focused }, value } = this.state;
    return (
      <div className={css(searchBarStyles.searchBarInputContainer_borderLeftRight, pagestyles.tableCellMiddle)}>
        <Translatable content={{ transKey: 'common.when' }}>
          <div className={css(searchBarStyles.searchBarInputLabel)} />
        </Translatable>
        <div className={css(searchBarStyles.searchBarGeoInputContainer)}>
          <div className={css(pagestyles.relativePosition)}>
            <div className={css(searchBarStyles.searchBarBlockFullWidth)}>
              <Translatable content={{ transKey: 'common.when' }}>
                <label
                  className={css(searchBarStyles.visuallyHidden)}
                  htmlFor="GeocompleteController-via-SearchBarLarge"
                />
              </Translatable>
              <div className={css(searchBarStyles.searchBarInputContainer_borderless)}>
                <Datepicker
                  datepickerLang={datepickerLang}
                  domain={domain}
                  initialDate={value ? moment(value) : null}
                  noBorder={true}
                  onBlur={this.handleBlur}
                  onChange={this.handleChange}
                  onFocus={this.handleFocus}
                  placeholder={this.placeholder}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className={css(searchBarStyles.searchBarFocusUnderline)}
          style={focused ? { opacity: 1 } : null}
        />
      </div>
    );
  }
}

export default useConfig(useLang(DateInput));

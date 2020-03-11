import * as React from 'react';
import { css } from 'aphrodite/no-important';
import ReactTelInput from 'react-telephone-input';

// Styles
// tslint:disable-next-line
import './styles.css';
import inputStyles from '../styles';
import { pagestyles } from '@src/styles';

// Connectors
import { useConfig } from '@src/store/connectors';

// Components
import Icon from '@src/components/concrete/Inputs/Icon';
import Label from '@src/components/concrete/Inputs/Label';
import { Phone } from '@src/components/concrete/Icons/svgs';

const PhoneInput = (props) => {
  const { config: { countryCode }, id, label, name, onChange, value } = props;
  return (
    <React.Fragment>
      {label &&
        <Label text={label} />
      }
      <Icon>
        <Phone stylesArray={[pagestyles.icon, pagestyles.iconGrey]} />
      </Icon>
      <div className={css(inputStyles.inputWrapper)}>
        <ReactTelInput
          defaultCountry={countryCode}
          flagsImagePath="/_express/images/utils/flags.png"
          id={id}
          name={name}
          onChange={onChange}
          value={value}
        />
      </div>
    </React.Fragment>
  );
};

export default useConfig(PhoneInput);

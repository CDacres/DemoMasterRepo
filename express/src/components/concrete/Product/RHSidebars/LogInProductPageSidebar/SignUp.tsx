import * as React from 'react';

// Components
import SimpleInput from '@src/components/concrete/Inputs/SimpleInput';
import PhoneInput from '@src/components/concrete/Inputs/PhoneInput';
import GenericHeader from '@src/components/concrete/GenericHeader';
import Label from '@src/components/concrete/Label';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type State = {
  firstName: null | string;
  lastName: null | string;
  phone: null | string;
};

class SignUp extends React.PureComponent<{}, State> {

  state: State = {
    firstName: null,
    lastName: null,
    phone: null,
  };

  changeState = (prop: string, e: string | number): void => this.setState({
    ...this.state,
    [prop]: e,
  })

  firstName = (e: React.ChangeEvent<HTMLInputElement>): void => this.changeState('firstName', e.target.value);
  lastName = (e: React.ChangeEvent<HTMLInputElement>): void => this.changeState('lastName', e.target.value);
  phone = (e: string | number): void => this.changeState('phone', e);

  render() {
    return (
      <div>
        <GenericHeader text="room.welcome" />
        <Label>
          <Translatable content={{ transKey: 'users.first_name' }} />
        </Label>
        <SimpleInput onChange={this.firstName} />
        <Label>
          <Translatable content={{ transKey: 'users.last_name' }} />
        </Label>
        <SimpleInput onChange={this.lastName} />
        <Label>
          <Translatable content={{ transKey: 'users.phone_number' }} />
        </Label>
        <PhoneInput onChange={this.phone} />
      </div>
    );
  }
}

export default SignUp;

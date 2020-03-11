/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import sidebarStyles from '../styles';
import { padding, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import GenericHeader from '@src/components/concrete/GenericHeader';
import SimpleInput from '@src/components/concrete/Inputs/SimpleInput';
import Label from '@src/components/concrete/Label';
import BrowserLink from '@src/components/abstract/Link';

type Props = {
  firstName?: string;
  isEmail?: boolean;
};

type State = {
  value: string;
};

class SignIn extends React.PureComponent<Props, State> {

  state: State = { value: '' };

  onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ value: e.target.value });
  }

  render() {
    const { firstName, isEmail } = this.props;
    return (
      <div>
        {isEmail &&
          <Translatable attributes={{ text: { transKey: 'room.welcome_back', count: 1, replacements: { name: firstName } } }}>
            <GenericHeader />
          </Translatable>
        }
        <Label>
          <span>
            <Translatable content={{ transKey: isEmail ? 'users.password' : 'users.email' }} />:
          </span>
        </Label>
        <SimpleInput
          onChange={this.onChange}
          value={this.state.value}
        />
        {isEmail &&
          <div className={css(pagestyles.centeredText)}>
            <BrowserLink
              attributes={{ title: { transKey: 'users.forgot_password' } }}
              className={css(sidebarStyles.forgotLink, pagestyles.link, padding.all_0)}
              href="/" // TODO: correct link
            >
              <Translatable content={{ transKey: 'users.forgot_password' }} />
            </BrowserLink>
          </div>
        }
      </div>
    );
  }
}

export default SignIn;

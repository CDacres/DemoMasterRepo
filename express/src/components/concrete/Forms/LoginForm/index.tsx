import * as React from 'react';
import { css } from 'aphrodite/no-important';
import { toast } from 'react-toastify';
import axios from 'axios';
import qs from 'qs';

// Styles
import { margin, pagestyles } from '@src/styles';

// Components
import BrowserLink from '@src/components/abstract/Link';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import FacebookLogin from '@src/components/concrete/Forms/social/FacebookLogin';
import GoogleLogin from '@src/components/concrete/Forms/social/GoogleLogin';
import StyledButton from '@src/components/concrete/Button/StyledButton';
import EmailInput from '@src/components/concrete/Inputs/EmailInput';
import PasswordInput from '@src/components/concrete/Inputs/PasswordInput';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import LoadingAnimation from '@src/components/concrete/LoadingAnimation';

type State = {
  email: string;
  loading: boolean;
  password: string;
};

class LoginForm extends React.PureComponent<{}, State> {
  state: State = {
    email: '',
    loading: false,
    password: '',
  };

  handleEmailChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ email: value });
  }

  handlePasswordChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ password: value });
  }

  validateLogin = () => {
    const validation = {
      pass: true,
      message: '',
    };
    const { email, password } = this.state;
    const emailReg = /^([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)?$/;
    if (email === '' || !emailReg.test(email.toLowerCase())) {
      validation.pass = false;
      validation.message = 'Please enter a valid email address';
    }
    if (password.length < 8) {
      validation.pass = false;
      validation.message = 'Your password must be at least 8 characters long';
      if (password === '') {
        validation.message = 'Please enter a password';
      }
    }
    return validation;
  }

  handleLogin = (e) => {
    if (e !== null) {
      e.preventDefault();
    }
    const validation = this.validateLogin();
    if (!validation.pass) {
      return toast.error(validation.message);
    } else {
      this.setState({ loading: !this.state.loading });
      axios({
        method: 'post',
        url: '/users/new_signin',
        data: qs.stringify({
          username: this.state.email,
          password: this.state.password,
        }),
        validateStatus: status => status > 0,
      }).then(response => {
        if (response.data.error && response.data.error.occurred) {
          this.setState({ loading: !this.state.loading });
          return toast.error(response.data.error.message);
        }
        return window.location.reload();
      }).catch(error => {
        throw new Error(error);
      });
    }
  }

  render() {
    const { email, loading, password } = this.state;
    return (
      <React.Fragment>
        <div className={css(margin.top_0, margin.leftright_0, margin.bottom_1)}>
          <FacebookLogin langKey="users.login_with_facebook" />
        </div>
        <div className={css(margin.top_0, margin.leftright_0, margin.bottom_1)}>
          <GoogleLogin langKey="users.login_with_google" />
        </div>
        {/* <div className={css(margin.top_0, margin.leftright_0, margin.bottom_1)}>
          <LinkedInLogin langKey="users.login_with_linkedin" />
        </div> */}
        <ContentSeparator marginNum={2}>
          <Translatable content={{ transKey: 'common.or' }} />
        </ContentSeparator>
        <div>
          <div className={css(margin.top_0, margin.leftright_0, margin.bottom_2)}>
            <Translatable attributes={{ label: { transKey: 'users.email_address' } }}>
              <EmailInput
                id="email"
                name="email"
                onChange={this.handleEmailChange}
                onCommit={() => this.handleLogin(null)}
                value={email}
              />
            </Translatable>
          </div>
          <div className={css(margin.top_0, margin.leftright_0, margin.bottom_2)}>
            <Translatable attributes={{ label: { transKey: 'users.password' } }}>
              <PasswordInput
                id="password"
                name="password"
                onChange={this.handlePasswordChange}
                onCommit={() => this.handleLogin(null)}
                value={password}
              />
            </Translatable>
          </div>
          <div className={css(pagestyles.centerActions)}>
            <div className={css(pagestyles.tableCellMiddle, pagestyles.rightText, pagestyles.halfColumn)}>
              <BrowserLink
                attributes={{ title: { transKey: 'users.forgot_password' } }}
                className={css(pagestyles.link)}
                href="/request-new-password"
                prefetch={true}
              >
                <Translatable content={{ transKey: 'users.forgot_password' }} />
              </BrowserLink>
            </div>
          </div>
          {!loading ? (
            <Translatable content={{ transKey: 'common.login' }}>
              <StyledButton
                action={this.handleLogin}
                buttonColor="primary"
                customStyle={[pagestyles.fullColumn]}
              />
            </Translatable>
          ) : (
            <StyledButton
              buttonColor="primary"
              customStyle={[pagestyles.fullColumn]}
            >
              <LoadingAnimation
                smallDot={true}
                spacing="dotsWrapperButton"
                whiteDot={true}
              />
            </StyledButton>
          )}
        </div>
        <ContentSeparator marginNum={2} />
        <div className={css(pagestyles.centerActions)}>
          <div className={css(pagestyles.tableCellMiddle, pagestyles.leftText, pagestyles.halfColumn)}>
            <Translatable content={{ transKey: 'users.not_registered_yet' }} />
          </div>
          <div className={css(pagestyles.tableCellMiddle, pagestyles.rightText, pagestyles.halfColumn)}>
            <Translatable content={{ transKey: 'common.sign_up' }}>
              <StyledButton href="/users/signup" />
            </Translatable>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginForm;

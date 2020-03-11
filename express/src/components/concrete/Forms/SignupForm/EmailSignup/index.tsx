/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';
import { toast } from 'react-toastify';
import axios from 'axios';
import qs from 'qs';
import { isValidNumber } from 'libphonenumber-js';
import docCookies from 'doc-cookies';

// Styles
import { margin, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import FacebookLogin from '@src/components/concrete/Forms/social/FacebookLogin';
import GoogleLogin from '@src/components/concrete/Forms/social/GoogleLogin';
import StyledButton from '@src/components/concrete/Button/StyledButton';
import EmailInput from '@src/components/concrete/Inputs/EmailInput';
import PasswordInput from '@src/components/concrete/Inputs/PasswordInput';
import PhoneInput from '@src/components/concrete/Inputs/PhoneInput';
import UserInput from '@src/components/concrete/Inputs/UserInput';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import LoadingAnimation from '@src/components/concrete/LoadingAnimation';
import TermsSection from '@src/components/concrete/Forms/SignupForm/EmailSignup/TermsSection';
import AlreadyUser from '@src/components/concrete/Forms/SignupForm/AlreadyUser';

type State = {
  email: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
  loading: boolean;
  password: string;
  phone_number: string;
  [propName: string]: any;
};

class EmailSignup extends React.PureComponent<{}, State> {
  state: State = {
    email: '',
    confirm_password: '',
    first_name: '',
    last_name: '',
    loading: false,
    password: '',
    phone_number: '',
  };

  protected neverBounceForm;

  constructor(props: {}) {
    super(props);
    this.neverBounceForm = React.createRef();
  }

  validateSignup = () => {
    const validation = {
      pass: true,
      message: '',
    };
    const { email, password, confirm_password, first_name, last_name, phone_number } = this.state;
    const emailReg = /^([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)?$/;
    if (email === '' || !emailReg.test(email.toLowerCase())) {
      validation.pass = false;
      validation.message = 'Please enter a valid email address';
    }
    if (first_name === '') {
      validation.pass = false;
      validation.message = 'Please enter your first name';
    }
    if (last_name === '') {
      validation.pass = false;
      validation.message = 'Please enter your last name';
    }
    if (phone_number === '' || !isValidNumber(phone_number)) {
      validation.pass = false;
      validation.message = 'Please enter a valid phone number';
    }
    if (password.length < 8) {
      validation.pass = false;
      validation.message = 'Your password must be at least 8 characters long';
      if (password === '') {
        validation.message = 'Please enter a password';
      }
    }
    if (password !== confirm_password) {
      validation.pass = false;
      validation.message = 'Password and password confirmation do not match';
    }
    return validation;
  }

  handleSignup = e => {
    if (e !== null) {
      e.preventDefault();
    }
    const validation = this.validateSignup();
    if (!validation.pass) {
      return toast.error(validation.message);
    } else {
      this.setState({ loading: !this.state.loading });
      const { email, password, confirm_password, first_name, last_name, phone_number } = this.state;
      let neverBounceStatus = '';
      if (this.neverBounceForm.current.children.namedItem('nb-result') !== null) {
        neverBounceStatus = this.neverBounceForm.current.children.namedItem('nb-result').value;
      }
      axios({
        method: 'post',
        url: '/api/v1/users',
        data: qs.stringify({
          email,
          first_name,
          last_name,
          phone_number,
          password,
          confirm_password,
          token: docCookies.getItem('zc_tc'),
          never_bounce_status: neverBounceStatus,
        }),
        validateStatus: status => status > 0,
      }).then(response => {
        if (response.status === 201) {
          this.handleLogin();
        } else {
          this.setState({ loading: !this.state.loading });
          return toast.error(response.data);
        }
      }).catch(error => {
        throw new Error(error);
      });
    }
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  handlePhoneChange = value => {
    this.setState({ phone_number: value });
  }

  handleLogin = () => {
    axios({
      method: 'post',
      url: '/users/remote_signin',
      data: qs.stringify({
        zc_login_user_name: this.state.email,
        zc_login_password: this.state.password,
      }),
      validateStatus: status => status > 0,
    }).then(response => {
      if (response.data.error.occurred) {
        this.setState({ loading: !this.state.loading });
        return toast.error(response.data.error.message);
      }
      return window.location.reload();
    }).catch(error => {
      throw new Error(error);
    });
  }

  render() {
    const { email, confirm_password, first_name, last_name, loading, password, phone_number } = this.state;
    return (
      <React.Fragment>
        <div className={css(pagestyles.centerActions)}>
          <div className={css(pagestyles.tableCellMiddle, pagestyles.centeredText)}>
            <FacebookLogin
              langKey="Facebook"
              link={true}
            />
            {' '}
            <Translatable content={{ transKey: 'common.or' }} />
            {' '}
            <GoogleLogin
              langKey="Google"
              link={true}
            />
            {/* {' '}
            <Translatable content={{ transKey: 'common.or' }} />
            {' '}
            <LinkedInLogin
              langKey="LinkedIn"
              link
            /> */}
          </div>
        </div>
        <ContentSeparator marginNum={2}>
          <Translatable content={{ transKey: 'common.or' }} />
        </ContentSeparator>
        <div>
          <form ref={this.neverBounceForm}>
            <div className={css(margin.top_0, margin.leftright_0, margin.bottom_2)}>
              <Translatable attributes={{ label: { transKey: 'users.email_address' } }}>
                <EmailInput
                  hasNeverBounceValidation={true}
                  id="email"
                  name="email"
                  onChange={this.handleChange}
                  onCommit={() => this.handleSignup(null)}
                  value={email}
                />
              </Translatable>
            </div>
            <div className={css(margin.top_0, margin.leftright_0, margin.bottom_2)}>
              <Translatable attributes={{ label: { transKey: 'users.first_name' } }}>
                <UserInput
                  id="first_name"
                  name="first_name"
                  onChange={this.handleChange}
                  onCommit={() => this.handleSignup(null)}
                  value={first_name}
                />
              </Translatable>
            </div>
            <div className={css(margin.top_0, margin.leftright_0, margin.bottom_2)}>
              <Translatable attributes={{ label: { transKey: 'users.last_name' } }}>
                <UserInput
                  id="last_name"
                  name="last_name"
                  onChange={this.handleChange}
                  onCommit={() => this.handleSignup(null)}
                  value={last_name}
                />
              </Translatable>
            </div>
            <div className={css(margin.top_0, margin.leftright_0, margin.bottom_2)}>
              <Translatable attributes={{ label: { transKey: 'users.phone_number' } }}>
                <PhoneInput
                  id="phone_number"
                  name="phone_number"
                  onChange={this.handlePhoneChange}
                  value={phone_number}
                />
              </Translatable>
            </div>
            <div className={css(margin.top_0, margin.leftright_0, margin.bottom_2)}>
              <Translatable attributes={{ label: { transKey: 'users.password' } }}>
                <PasswordInput
                  id="password"
                  name="password"
                  onChange={this.handleChange}
                  onCommit={() => this.handleSignup(null)}
                  value={password}
                />
              </Translatable>
            </div>
            <div className={css(margin.top_0, margin.leftright_0, margin.bottom_2)}>
              <Translatable attributes={{ label: { transKey: 'users.confirm_password' } }}>
                <PasswordInput
                  id="confirm_password"
                  name="confirm_password"
                  onChange={this.handleChange}
                  onCommit={() => this.handleSignup(null)}
                  value={confirm_password}
                />
              </Translatable>
            </div>
            <div className={css(pagestyles.centerActions)}>
              <TermsSection />
            </div>
            {!loading ? (
              <Translatable content={{ transKey: 'common.sign_up' }}>
                <StyledButton
                  action={this.handleSignup}
                  buttonColor="primary"
                  customStyle={[pagestyles.fullColumn]}
                  id="sign_up"
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
          </form>
        </div>
        <ContentSeparator marginNum={2} />
        <AlreadyUser />
      </React.Fragment>
    );
  }
}

export default EmailSignup;

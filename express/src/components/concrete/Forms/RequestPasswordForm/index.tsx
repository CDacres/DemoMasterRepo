import * as React from 'react';
import { css } from 'aphrodite/no-important';
import { toast } from 'react-toastify';
import axios from 'axios';
import qs from 'qs';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import GenericHeader from '@src/components/concrete/GenericHeader';
import StyledButton from '@src/components/concrete/Button/StyledButton';
import EmailInput from '@src/components/concrete/Inputs/EmailInput';
import LoadingAnimation from '@src/components/concrete/LoadingAnimation';

type State = {
  email: string;
  loading: boolean;
};

class RequestPasswordForm extends React.PureComponent<{}, State> {
  state: State = {
    email: '',
    loading: false,
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ email: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.email) {
      this.setState({ loading: !this.state.loading });
      axios({
        method: 'post',
        url: '/users/forgot_password',
        data: qs.stringify({
          email: this.state.email,
        }),
        validateStatus: status => status > 0,
      }).then(response => {
        this.setState({ loading: !this.state.loading });
        if (!response.data.error.occurred) {
          this.setState({ email: '' });
          return toast.success(response.data.error.message);
        }
        return toast.error(response.data.error.message);
      }).catch(error => {
        throw new Error(error);
      });
    } else {
      return toast.error('Please enter an email.');
    }
  }

  render() {
    const { email, loading } = this.state;
    return (
      <React.Fragment>
        <GenericHeader
          stylesArray={[pagestyles.h1Small]}
          tag="h1"
          text="users.request_new_password"
        />
        <Translatable content={{ transKey: 'users.request_new_password_text' }}>
          <p />
        </Translatable>
        <div>
          <div className={css(margin.top_0, margin.leftright_0, margin.bottom_2)}>
            <Translatable attributes={{ label: { transKey: 'users.email_address' } }}>
              <EmailInput
                id="email"
                name="email"
                onChange={this.handleChange}
                onCommit={() => this.handleSubmit(null)}
                value={email}
              />
            </Translatable>
          </div>
          <div className={css(pagestyles.centerActions)}>
            <div className={css(pagestyles.tableCellMiddle, pagestyles.centeredText)}>
              {!loading ? (
                <Translatable content={{ transKey: 'users.request' }}>
                  <StyledButton action={this.handleSubmit} />
                </Translatable>
              ) : (
                <StyledButton customStyle={[styles.button]}>
                  <LoadingAnimation
                    smallDot={true}
                    spacing="dotsWrapperButton"
                  />
                </StyledButton>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default RequestPasswordForm;

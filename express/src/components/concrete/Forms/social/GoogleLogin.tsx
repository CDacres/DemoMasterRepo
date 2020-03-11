import * as React from 'react';
import { css } from 'aphrodite/no-important';
import axios from 'axios';
import qs from 'qs';
import ReactGoogleLogin from 'react-google-login';

// Styles
import styles from './styles';
import { pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import Button from '@src/components/concrete/Button';
import { Google } from '@src/components/concrete/Icons/svgs';
import LoadingAnimation from '@src/components/concrete/LoadingAnimation';

type Props = {
  langKey: string;
  link?: boolean;
};

type State = {
  loading: boolean;
};

class GoogleLogin extends React.PureComponent<Props, State> {
  static defaultProps = { link: false };

  state: State = { loading: false };

  handleFailure = error => {
    console.log(error); // tslint:disable-line
  }

  handleGoogleLogin = response => {
    this.setState({ loading: !this.state.loading });
    axios({
      method: 'POST',
      url: '/api/v1/auth/google',
      data: qs.stringify({
        id_token: response.tokenId,
      }),
      validateStatus: () => true,
    }).then(ourResponse => {
      if (ourResponse.data.success) {
        return window.location.reload();
      }
      this.setState({ loading: !this.state.loading });
    }).catch(error => {
      console.log(error); // tslint:disable-line
    });
  }

  renderGoogle = (renderProps): JSX.Element => {
    const { langKey, link } = this.props;
    const { loading } = this.state;
    return (
      <React.Fragment>
        {link ? (
          <React.Fragment>
            {!loading ? (
              <Translatable content={{ transKey: langKey }}>
                <span
                  className={css(pagestyles.link)}
                  onClick={renderProps.onClick}
                />
              </Translatable>
            ) : (
              <LoadingAnimation spacing="dotsWrapperSmall" />
            )}
          </React.Fragment>
        ) : (
          <Button
            action={renderProps.onClick}
            stylesArray={[styles.googleButton]}
          >
            {!loading ? (
              <React.Fragment>
                <span className={css(styles.buttonIcon, styles.googleIcon)}>
                  <Google stylesArray={[pagestyles.icon, pagestyles.icon18, pagestyles.iconGrey]} />
                </span>
                <Translatable content={{ transKey: langKey }} />
              </React.Fragment>
            ) : (
              <LoadingAnimation spacing="dotsWrapperButton" />
            )}
          </Button>
        )}
      </React.Fragment>
    );
  }

  render() {
    return (
      <ReactGoogleLogin
        clientId={`${process.env.GOOGLE_CLIENT_ID}.apps.googleusercontent.com`}
        cookiePolicy="single_host_origin"
        onFailure={this.handleFailure}
        onSuccess={this.handleGoogleLogin}
        render={this.renderGoogle}
        tag="div"
      />
    );
  }
}

export default GoogleLogin;

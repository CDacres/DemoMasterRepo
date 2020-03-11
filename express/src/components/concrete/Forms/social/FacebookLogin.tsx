import * as React from 'react';
import { css } from 'aphrodite/no-important';
import axios from 'axios';
import qs from 'qs';
import ReactFacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

// Styles
import styles from './styles';
import { pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import Button from '@src/components/concrete/Button';
import { Facebook } from '@src/components/concrete/Icons/svgs';
import LoadingAnimation from '@src/components/concrete/LoadingAnimation';

type Props = {
  langKey: string;
  link?: boolean;
};

type State = {
  loading: boolean;
};

class FacebookLogin extends React.PureComponent<Props, State> {
  static defaultProps = { link: false };

  state: State = { loading: false };

  doFacebookLogin = (response): void => {
    if (typeof response.accessToken !== 'undefined') {
      this.setState({ loading: !this.state.loading });
      axios({
        method: 'POST',
        url: '/api/v1/auth/facebook',
        data: qs.stringify({
          accessToken: response.accessToken,
        }),
        validateStatus: () => true,
      }).then(ourResponse => {
        if (ourResponse.data.success) {
          return window.location.reload();
        }
        this.setState({ loading: !this.state.loading });
      }).catch(error => {
        throw new Error(error);
      });
    }
  }

  renderFacebook = (renderProps): JSX.Element => {
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
            stylesArray={[styles.facebookButton]}
          >
            {!loading ? (
              <React.Fragment>
                <span className={css(styles.buttonIcon, styles.facebookIcon)}>
                  <Facebook stylesArray={[pagestyles.icon, pagestyles.icon18, pagestyles.iconWhite]} />
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
      <ReactFacebookLogin
        appId={process.env.FACEBOOK_APP_ID}
        callback={this.doFacebookLogin}
        cookie={true}
        fields="id,first_name,last_name,email"
        render={this.renderFacebook}
        version="2.8"
        xfbml={true}
      />
    );
  }
}

export default FacebookLogin;

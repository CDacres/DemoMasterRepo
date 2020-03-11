import * as React from 'react';
import { css } from 'aphrodite/no-important';
import axios from 'axios';
import qs from 'qs';

// Styles
import styles from './styles';
import { pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import Button from '@src/components/concrete/Button';
import { LinkedIn } from '@src/components/concrete/Icons/svgs';
import LoadingAnimation from '@src/components/concrete/LoadingAnimation';

type Props = {
  langKey: string;
  link?: boolean;
};

type State = {
  loading: boolean;
};

declare const window: {
  IN: any;
  location: any;
};

class LinkedInLogin extends React.PureComponent<Props, State> {
  static defaultProps = { link: false };

  state: State = { loading: false };

  handleAuthorize = () => {
    window.IN.User.authorize(this.callBack, '');
  }

  callBack = () => {
    this.setState({ loading: true });
    window.IN.API.Raw(`/people/~${':(id,first-name,last-name,email-address)'}`).result(r => {
      this.doLinkedInLogin(r);
    });
  }

  doLinkedInLogin = (response): void => {
    axios({
      method: 'POST',
      url: '/api/v1/auth/linkedin',
      data: qs.stringify({ response }),
      validateStatus: () => true,
    }).then(ourResponse => {
      if (ourResponse.data.success) {
        window.location.reload();
      }
    }).catch(error => {
      throw new Error(error);
    });
  }

  render() {
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
                  onClick={this.handleAuthorize}
                />
              </Translatable>
            ) : (
              <LoadingAnimation spacing="dotsWrapperSmall" />
            )}
          </React.Fragment>
        ) : (
          <Button
            action={this.handleAuthorize}
            stylesArray={[styles.linkedinButton]}
          >
            {!loading ? (
              <React.Fragment>
                <span className={css(styles.buttonIcon, styles.linkedinIcon)}>
                  <LinkedIn stylesArray={[pagestyles.icon, pagestyles.icon18, pagestyles.iconGrey]} />
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
}

export default LinkedInLogin;

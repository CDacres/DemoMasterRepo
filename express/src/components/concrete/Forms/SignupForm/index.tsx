import * as React from 'react';

// Components
import SocialSignup from '@src/components/concrete/Forms/SignupForm/SocialSignup';
import EmailSignup from '@src/components/concrete/Forms/SignupForm/EmailSignup';

type State = {
  socialSignup: boolean;
};

class SignupForm extends React.PureComponent<{}, State> {
  state: State = { socialSignup: true };

  switchForm = () => {
    this.setState({ socialSignup: false });
  }

  render() {
    const { socialSignup } = this.state;
    return (
      <React.Fragment>
        {socialSignup ? (
          <SocialSignup switchForm={this.switchForm} />
        ) : (
          <EmailSignup />
        )}
      </React.Fragment>
    );
  }
}

export default SignupForm;

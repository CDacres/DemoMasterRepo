/*tslint:disable:max-line-length*/
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import sidebarStyles from '../styles';
import { margin, pagestyles } from '@src/styles';

// Components
import InfoPhrase from '@src/components/concrete/Product/InfoPhrase';
import Button from '@src/components/concrete/Button';
import StyledButton from '@src/components/concrete/Button/StyledButton';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import { Arrow } from '@src/components/concrete/Icons/svgs';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import SignUp from '@src/components/concrete/Product/RHSidebars/LogInProductPageSidebar/SignUp';
import SignIn from '@src/components/concrete/Product/RHSidebars/LogInProductPageSidebar/SignIn';

// Connectors
import { useAuthUser, useViewing } from '@src/store/connectors';

// Types
import { Store } from '@src/typings/types';

type State = {
  email: string;
  isEmail: boolean;
  newUser: boolean | object;
  pass?: string;
};

type Props = {
  backToViewing?: (e?: any) => void;
  fetchUserAccountSuccess?: (e?: any) => void;
  user?: Store.User;
};

class LogInProductPageSidebar extends React.PureComponent<Props, State> {

  state: State = {
    email: '',
    isEmail: false,
    newUser: false,
  };

  public inputRef: React.RefObject<SignIn> = React.createRef();
  public newUserRef: React.RefObject<SignUp> = React.createRef();

  goBack = (): void => {
    if (this.state.email && !this.state.newUser) {
      this.setState({
        ...this.state,
        isEmail: false,
      });
      return;
    }
    if (this.state.newUser) {
      this.setState({
        ...this.state,
        newUser: false,
      });
      return;
    }
    this.props.backToViewing();
  }

  compareEmail = (): void => {
    const emailReg = /^([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)?$/;
    const input = this.inputRef.current.state.value;
    if (!emailReg.test(input.toLowerCase())) {
      this.inputRef.current.setState({ value: 'Email is not valid'});
      return;
    }
    if (this.props.user.email && this.props.user.email === this.inputRef.current.state.value) {
      this.setState({
        ...this.state,
        email: input,
        isEmail: true,
      });
      this.inputRef.current.setState({ value: '' });
      return;
    }
    if (this.props.user.email && this.props.user.email !== this.inputRef.current.state.value) {
      this.setState({
        ...this.state,
        newUser: true,
      });
      return;
    }
  }

  next = () => {
    if (!this.state.newUser && !this.state.isEmail) {
      this.compareEmail();
      return;
    }
    if (this.state.isEmail) {
      const input = this.inputRef.current.state.value;
      this.setState({
        ...this.state,
        pass: input,
      });
      // then axios request to api for password check
      // temporary below is just one of actions to test going through forms
      this.props.fetchUserAccountSuccess();
    }
    if (this.state.newUser) {
      const user = { ...this.newUserRef.current.state };
      this.setState({
        ...this.state,
        newUser: user,
      });
      // then axios request to api for adding new user
      // temporary below is just one of actions to test going through forms
      this.props.fetchUserAccountSuccess();
    }
  }

  render() {
    const { user: { firstName } } = this.props;
    const { isEmail, newUser } = this.state;
    return (
      <React.Fragment>
        <div>
          <Button
            action={this.goBack}
            stylesArray={[sidebarStyles.arrowButton]}
          >
            <Arrow
              direction="left"
              stylesArray={[pagestyles.icon, pagestyles.icon19, pagestyles.iconGrey]}
            />
          </Button>
        </div>
        <ContentSeparator marginNum={2} />
        {newUser ? (
          <SignUp ref={this.newUserRef} />
        ) : (
          <SignIn
            firstName={firstName}
            isEmail={isEmail}
            ref={this.inputRef}
          />
        )}
        <div className={css(margin.top_3)}>
          <Translatable content={{ transKey: 'common.next' }}>
            <StyledButton
              action={this.next}
              buttonColor="primary"
              customStyle={[pagestyles.fullColumn]}
            />
          </Translatable>
        </div>
        <InfoPhrase>
          <Translatable content={{ transKey: 'room.never_give_data' }} />
        </InfoPhrase>
      </React.Fragment>
    );
  }
}

export default useAuthUser(useViewing(LogInProductPageSidebar));

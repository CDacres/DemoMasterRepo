import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import FacebookLogin from '@src/components/concrete/Forms/social/FacebookLogin';
import GoogleLogin from '@src/components/concrete/Forms/social/GoogleLogin';
import StyledButton from '@src/components/concrete/Button/StyledButton';
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import AlreadyUser from '@src/components/concrete/Forms/SignupForm/AlreadyUser';
import { Envelope } from '@src/components/concrete/Icons/svgs';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  switchForm: (e: any) => void;
};

const SocialSignup = ({ switchForm }: Props) => (
  <React.Fragment>
    <div className={css(margin.top_0, margin.leftright_0, margin.bottom_1)}>
      <FacebookLogin langKey="users.signup_with_facebook" />
    </div>
    <div className={css(margin.top_0, margin.leftright_0, margin.bottom_1)}>
      <GoogleLogin langKey="users.signup_with_google" />
    </div>
    {/* <div className={css(margin.top_0, margin.leftright_0, margin.bottom_1)}>
      <LinkedInLogin langKey="users.signup_with_linkedin" />
    </div> */}
    <ContentSeparator marginNum={2}>
      <Translatable content={{ transKey: 'common.or' }} />
    </ContentSeparator>
    <div className={css(margin.top_0, margin.leftright_0, margin.bottom_1)}>
      <StyledButton
        action={switchForm}
        buttonColor="primary"
        customStyle={[pagestyles.fullColumn]}
        id="email_login_button"
      >
        <span className={css(styles.buttonSpan)}>
          <Envelope
            outline={true}
            stylesArray={[pagestyles.icon, pagestyles.iconWhite]}
          />
        </span>
        <Translatable content={{ transKey: 'users.signup_with_email' }} />
      </StyledButton>
    </div>
    <ContentSeparator marginNum={2} />
    <AlreadyUser />
  </React.Fragment>
);

export default SocialSignup;

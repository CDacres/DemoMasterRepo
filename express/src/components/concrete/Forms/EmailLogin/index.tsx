/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import GenericHeader from '@src/components/concrete/GenericHeader';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import PasswordInput from '@src/components/concrete/Inputs/PasswordInput';
import GoogleLogin from '@src/components/concrete/Forms/social/GoogleLogin';
import Avatar from '@src/components/concrete/Avatar';
import Button from '@src/components/concrete/Button';
import StyledButton from '@src/components/concrete/Button/StyledButton';
import LoadingAnimation from '@src/components/concrete/LoadingAnimation';
import InteractionLink from '@src/components/concrete/InteractionLink';

type Props = {
  buttonOnClick: () => void;
  email: string;
  firstName: string;
  footerOnClick: () => void;
  googleLogin: boolean;
  lastName: string;
  src?: string;
};

type State = {
  loading: boolean;
  password: string;
};

class EmailLogin extends React.Component<Props, State> {

  state: State = {
    loading: false,
    password: '',
  };

  handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ password: value });
  }

  render() {
    const { buttonOnClick, email, firstName, footerOnClick, googleLogin, lastName, src } = this.props;
    const { loading, password } = this.state;
    return (
      <section>
        <section>
          <div className={css(pagestyles.centeredText)}>
            <div className={css(margin.bottom_3)}>
              <GenericHeader
                stylesArray={[pagestyles.defaultTitle]}
                tag="h2"
              >
                <Translatable content={{ transKey: 'users.welcome' }}>
                  <div className={css(pagestyles.title, pagestyles.fontBlack, margin.all_0, padding.topbottom_0_25)} />
                </Translatable>
              </GenericHeader>
            </div>
            <div className={css(margin.bottom_1)}>
              <div className={css(styles.imgContainer)}>
                <Avatar
                  customStyle={styles.avatar}
                  height="120px"
                  name={{
                    firstName: firstName,
                    lastName: lastName,
                  }}
                  needsMargin={false}
                  src={src}
                  width="120px"
                />
              </div>
            </div>
          </div>
          <div className={css(margin.bottom_3)}>
            <div className={css(pagestyles.row, pagestyles.clearfix)}>
              <div className={css(styles.formInner, pagestyles.column, pagestyles.fullColumn, pagestyles.columnFloat, padding.leftright_1)}>
                {!googleLogin ? (
                  <form>
                    <div className={css(margin.bottom_3)}>
                      <div className={css(pagestyles.centeredText)}>
                        <div className={css(pagestyles.text, margin.all_0)}>
                          {email}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className={css(margin.bottom_2)}>
                        <Translatable attributes={{ label: { transKey: 'users.password' } }}>
                          <PasswordInput
                            id="password"
                            name="password"
                            onChange={this.handleChange}
                            value={password}
                          />
                        </Translatable>
                      </div>
                      <div className={css(margin.bottom_2)}>
                        {!loading ? (
                          <Translatable content={{ transKey: 'users.continue_name', count: 1, replacements: { firstname: firstName } }}>
                            <StyledButton
                              action={buttonOnClick}
                              buttonColor="primary"
                              buttonStyle="updated"
                              customStyle={[pagestyles.fullColumn]}
                            />
                          </Translatable>
                        ) : (
                          <LoadingAnimation spacing="dotsWrapperSmall" />
                        )}
                      </div>
                      <div>
                        <div className={css(pagestyles.text, margin.all_0)}>
                          <div className={css(pagestyles.smallText, pagestyles.fontMedium, margin.all_0)}>
                            <InteractionLink
                              // action={this.handleClick} // TODO: make this a proper action
                              className={css(pagestyles.link, pagestyles.linkUnderlined)}
                            >
                              <Translatable content={{ transKey: 'users.forgot_password' }} />
                            </InteractionLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                ) : (
                  <Translatable attributes={{ langKey: { transKey: 'users.continue_name', count: 1, replacements: { firstname: firstName } } }}>
                    <GoogleLogin langKey="" />
                  </Translatable>
                )}
              </div>
            </div>
          </div>
          <ContentSeparator marginNum={2} />
          <div className={css(margin.bottom_3)}>
            <div>
              <span>
                <Translatable content={{ transKey: 'users.not_name', count: 1, replacements: { firstname: firstName } }}>
                  <span className={css(pagestyles.text, margin.all_0)} />
                </Translatable>
                <div className={css(pagestyles.inlineBlock, margin.leftright_1)}>
                  <span className={css(pagestyles.text, pagestyles.fontMedium, margin.all_0)}>
                    <Translatable content={{ transKey: 'users.use_another_account' }}>
                      <Button
                        action={footerOnClick}
                        stylesArray={[pagestyles.link, pagestyles.linkUnderlined, padding.all_0]}
                      />
                    </Translatable>
                  </span>
                </div>
              </span>
            </div>
          </div>
        </section>
      </section>
    );
  }
}

export default EmailLogin;

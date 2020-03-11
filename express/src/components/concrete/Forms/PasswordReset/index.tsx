import * as React from 'react';
import { css } from 'aphrodite/no-important';
import { toast } from 'react-toastify';
import axios from 'axios';
import qs from 'qs';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import EnclosingLabel from '@src/components/concrete/EnclosingLabel';
import { Chevron } from '@src/components/concrete/Icons/svgs';
import EmailInput from '@src/components/concrete/Inputs/EmailInput';
import StyledButton from '@src/components/concrete/Button/StyledButton';
import GenericHeader from '@src/components/concrete/GenericHeader';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import InteractionLink from '@src/components/concrete/InteractionLink';
import LoadingAnimation from '@src/components/concrete/LoadingAnimation';

type State = {
  email: string;
  loading: boolean;
};

class PasswordReset extends React.Component<{}, State> {
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
        <header className={css(pagestyles.block, pagestyles.fontMedium)}>
          <div className={css(pagestyles.noBottomBorder, padding.top_0, padding.bottom_3)}>
            <GenericHeader
              stylesArray={[pagestyles.defaultTitle]}
              tag="h1"
            >
              <Translatable content={{ transKey: 'users.reset_password' }}>
                <div className={css(pagestyles.title, pagestyles.fontBlack, padding.topbottom_0_25)} />
              </Translatable>
            </GenericHeader>
            <div className={css(margin.top_1)}>
              <Translatable content={{ transKey: 'users.reset_email_text' }}>
                <div className={css(pagestyles.text, margin.all_0)} />
              </Translatable>
            </div>
          </div>
        </header>
        <section>
          <div>
            <form>
              <div>
                <div className={css(styles.inputWrapper)}>
                  <div className={css(margin.bottom_1)}>
                    <EnclosingLabel id="email">
                      <Translatable attributes={{ label: { transKey: 'users.email_address' } }}>
                        <div className={css(pagestyles.text, pagestyles.fontMedium, margin.all_0)} />
                      </Translatable>
                    </EnclosingLabel>
                  </div>
                  <EmailInput
                    id="email"
                    name="email"
                    onChange={this.handleChange}
                    value={email}
                  />
                </div>
              </div>
              <div className={css(margin.top_3, margin.bottom_2)}>
                <div>
                  <div />
                </div>
              </div>
              <div className={css(pagestyles.flexWrapper)}>
                <div className={css(pagestyles.flexContainer)}>
                  <div className={css(margin.top_1)}>
                    <div className={css(pagestyles.text, pagestyles.fontMedium, margin.all_0)}>
                      <InteractionLink
                        // action={this.handleClick} // TODO: make this a proper action
                        className={css(pagestyles.link, pagestyles.linkUnderlined)}
                      >
                        <div className={css(styles.linkContent)}>
                          <div className={css(styles.innerWrapper)}>
                            <div className={css(margin.right_1)}>
                              <Chevron
                                direction="left"
                                stylesArray={[pagestyles.icon]}
                              />
                            </div>
                          </div>
                          <div className={css(styles.innerWrapper)}>
                            <Translatable content={{ transKey: 'users.back_to_login' }}>
                              <div />
                            </Translatable>
                          </div>
                        </div>
                      </InteractionLink>
                    </div>
                  </div>
                </div>
                {!loading ? (
                  <div className={css(pagestyles.inlineBlockMiddle)}>
                    <div className={css(margin.top_1)}>
                      <Translatable content={{ transKey: 'users.request' }}>
                        <StyledButton action={this.handleSubmit} />
                      </Translatable>
                    </div>
                  </div>
                ) : (
                  <LoadingAnimation spacing="dotsWrapperSmall" />
                )}
              </div>
            </form>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default PasswordReset;

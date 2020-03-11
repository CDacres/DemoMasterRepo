import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { LoginSecurity as LoginSecurityIcon } from '@src/components/concrete/Icons/svgs';
import SidebarSimple from '@src/components/concrete/Dashboard/Sidebar/SidebarSimple';
import DashboardWrapper from '@src/components/concrete/Dashboard/DashboardWrapper';
import ListItem from '@src/components/concrete/Dashboard/DashboardWrapper/ListItem';
import DashboardTemplate from '@src/components/concrete/Dashboard/DashboardTemplate';
import LoginHistory from '@src/components/concrete/Dashboard/DashboardWrapper/SecurityItem/LoginHistory';
import SocialAccount from '@src/components/concrete/Dashboard/DashboardWrapper/SecurityItem/SocialAccount';
import Subtitle from '@src/components/concrete/Dashboard/Subtitle';
import StyledInput from '@src/components/concrete/Inputs/StyledInput';

// Data
import { breadcrumbs } from '@src/data/dashboard/breadcrumbs';
import { securityPageData } from '@src/data/dashboard/page';

type State = {
  facebook: boolean;
  google: boolean;
};

class LoginSecurity extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      facebook: false,
      google: false,
    };
  }

  handleConnect = (name: string): void => {
    this.setState({ [name]: !this.state[name] } as State);
  }

  handleLogout = (): void => {
    // console.log("logged out");
  }

  render() {
    const { facebook, google } = this.state;
    return (
      <DashboardTemplate>
        <DashboardWrapper
          breadcrumbItems={breadcrumbs.login_security}
          sideBar={
            <SidebarSimple
              icon={<LoginSecurityIcon stylesArray={[pagestyles.icon, pagestyles.icon40, pagestyles.iconBlue]} />}
              text="dashboard.login_security_box_description"
              title="dashboard.login_security_box_title"
            />
          }
          title="dashboard.login_security_personal_title"
        >
          <section>
            <Subtitle
              needsBottomSpace={true}
              text="common.login"
            />
            <ListItem
              buttonText="common.update"
              formButtonText="common.update_password"
              item={securityPageData.password_last_changed}
              title="users.password"
            >
              <div className={css(margin.bottom_2)}>
                <div className={css(pagestyles.row, pagestyles.clearfix)}>
                  <div className={css(pagestyles.fullColumn, padding.leftright_1)}>
                    <StyledInput
                      id="current_password"
                      label="users.current_password"
                      name="current_password"
                      type="password"
                    />
                  </div>
                  <div className={css(pagestyles.fullColumn, padding.leftright_1)}>
                    <StyledInput
                      id="new_password"
                      label="users.new_password"
                      name="new_password"
                      type="password"
                    />
                  </div>
                  <div className={css(pagestyles.fullColumn, padding.leftright_1)}>
                    <StyledInput
                      id="confirm_password"
                      label="users.confirm_password"
                      name="confirm_password"
                      type="password"
                    />
                  </div>
                </div>
              </div>
            </ListItem>
          </section>
          <section>
            <Subtitle
              needsBottomSpace={true}
              text="dashboard.social_accounts"
            />
            <SocialAccount
              connected={facebook}
              label="Facebook"
              onConnect={() => this.handleConnect('facebook')}
            />
            <SocialAccount
              connected={google}
              label="Google"
              onConnect={() => this.handleConnect('google')}
            />
          </section>
          <section>
            <Subtitle
              needsBottomSpace={true}
              text="dashboard.device_history"
            />
            <LoginHistory
              currentSession={true}
              onLogout={this.handleLogout}
              subtitle={securityPageData.login_history_current}
            />
            <LoginHistory
              onLogout={this.handleLogout}
              subtitle={securityPageData.login_history_other}
            />
          </section>
        </DashboardWrapper>
      </DashboardTemplate>
    );
  }
}

export default LoginSecurity;

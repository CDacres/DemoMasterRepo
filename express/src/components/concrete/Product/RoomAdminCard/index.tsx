/* tslint:disable:max-line-length */
import * as React from 'react';
import shortid from 'shortid';
import Collapse from 'react-collapse';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import AccentUpperText from '@src/components/concrete/Product/AccentUpperText';
import GenericCard from '@src/components/concrete/GenericCard';
import { Chevron } from '@src/components/concrete/Icons/svgs';
import BrowserLink from '@src/components/abstract/Link';
import AdminInfo from '@src/components/concrete/Product/RoomAdminCard/AdminInfo';
import ControlItem from '@src/components/concrete/Product/RoomAdminCard/ControlItem';
import ToggleSwitch from '@src/components/concrete/Inputs/ToggleSwitch';
import InteractionLink from '@src/components/concrete/InteractionLink';

// Types
import { Store } from '@src/typings/types';

export type RoomAdminCardProps = {
  adminInfo: Store.AdminInfo;
  info: Store.RoomInfo;
};

type State = {
  agreeToList: boolean;
  isCollapsed: boolean;
};

class RoomAdminCard extends React.PureComponent<RoomAdminCardProps, State> {
  state: State = {
    agreeToList: false,
    isCollapsed: false,
  };

  handleClick = e => {
    e.preventDefault();
    this.setState(prevState => ({ isCollapsed: !prevState.isCollapsed }));
  }

  handleAgreeToList = () => {
    this.setState(prevState => ({ agreeToList: !prevState.agreeToList }));
  }

  render() {
    const { adminInfo, info } = this.props;
    const { agreeToList, isCollapsed } = this.state;
    return (
      <section id="admin">
        <div className={css(margin.bottom_3)}>
          <GenericCard boxShadow="none">
            <AccentUpperText text="room.admin_info" />
            <AdminInfo
              customStyle={styles.agree}
              transKey="room.agree_to_list"
            >
              <span className={css(margin.left_0_5)}>
                <ToggleSwitch
                  label="agree_to_list"
                  name="agree_to_list"
                  onChange={this.handleAgreeToList}
                  value={agreeToList}
                />
                {/* TODO: get correct agree to list value */}
              </span>
            </AdminInfo>
            <div className={css(margin.top_1_5)}>
              <AdminInfo
                text={info.venue_name}
                transKey="common.venue_name"
              />
              <AdminInfo transKey="listing.website">
                <a
                  aria-busy="false"
                  className={css(styles.link, pagestyles.link, margin.left_0_5)}
                  href={adminInfo.website}
                  rel="noopener"
                  target="_blank"
                >
                  {adminInfo.website}
                </a>
              </AdminInfo>
              <AdminInfo
                text={`${adminInfo.first_name} ${adminInfo.last_name}`}
                transKey="room.main_contact"
              />
              <AdminInfo transKey="users.email">
                <React.Fragment>
                  <span className={css(margin.left_0_5)}>
                    {adminInfo.email}
                  </span>
                  {' · '}
                  <BrowserLink
                    attributes={{ title: { transKey: 'nav.admin_adopt' } }}
                    className={css(styles.link, pagestyles.link)}
                    href="/administrator/spoof/engage"
                  >
                    <Translatable content={{ transKey: 'nav.admin_adopt' }} />
                  </BrowserLink>
                </React.Fragment>
              </AdminInfo>
              <AdminInfo
                text={adminInfo.phone}
                transKey="users.phone_number"
              />
              <div className={css(styles.infoControls)}>
                <div className={css(styles.infoControlsInner)}>
                  <ControlItem
                    href="/"  // TODO: correct link
                    transKey="common.edit"
                  />
                  {' · '}
                  <ControlItem
                    href="/"  // TODO: correct link
                    transKey="room.schedule_task"
                  />
                  {' · '}
                  <ControlItem
                    href="/"  // TODO: correct link
                    transKey="room.call"
                  />
                  {' · '}
                  <ControlItem
                    href="/"  // TODO: correct link
                    transKey="users.email"
                  />
                </div>
                {(adminInfo.other_contact && adminInfo.other_contact.length > 0) &&
                  <div className={css(margin.topbottom_1)}>
                    <Collapse isOpened={isCollapsed}>
                      <div className={css(isCollapsed ? padding.top_0_5 : pagestyles.none)}>
                        <div>
                          <Translatable content={{ transKey: 'room.other_contact' }}>
                            <span className={css(styles.semiBold)} />
                          </Translatable>:
                        </div>
                        {adminInfo.other_contact.map(el => (
                          <div
                            className={css(padding.bottom_3)}
                            key={shortid.generate()}
                          >
                            <AdminInfo
                              text={el.name}
                              transKey="common.name"
                            />
                            <AdminInfo
                              text={el.email}
                              transKey="users.email"
                            />
                            <AdminInfo
                              text={el.phone}
                              transKey="users.phone_number"
                            />
                          </div>
                        ))}
                      </div>
                    </Collapse>
                    <InteractionLink
                      action={this.handleClick}
                      className={css(styles.link, styles.collapsable, pagestyles.link)}
                    >
                      <Translatable content={{ transKey: 'room.other_contact' }} />
                      <Chevron stylesArray={[styles.chevron, margin.left_0_5, isCollapsed && styles.chevron_collapse]} />
                    </InteractionLink>
                  </div>
                }
              </div>
            </div>
          </GenericCard>
        </div>
      </section>
    );
  }
}

export default RoomAdminCard;

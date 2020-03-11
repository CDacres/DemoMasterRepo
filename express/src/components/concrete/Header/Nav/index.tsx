/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding } from '@src/styles';

// Mungers
import { returnDropdownLinkGroups } from '@src/mungers/navigation';

// Data
import { linkGroups as getLinkGroups } from '@src/data/navigation';

// Components
import AdminNonSpoof from '@src/components/abstract/Permissions/AdminNonSpoof';
import EagleVision from '@src/components/abstract/Permissions/EagleVision';
import LoggedIn from '@src/components/abstract/Permissions/LoggedIn';
import NonLoggedIn from '@src/components/abstract/Permissions/NonLoggedIn';
import NonVenueOwner from '@src/components/abstract/Permissions/NonVenueOwner';
import SpoofOrNonAdmin from '@src/components/abstract/Permissions/SpoofOrNonAdmin';
import VenueOwner from '@src/components/abstract/Permissions/VenueOwner';
import BrowserLink from '@src/components/abstract/Link';
import InteractionLink from '@src/components/concrete/InteractionLink';
import { Dot } from '@src/components/concrete/Icons/svgs';
import Avatar from '@src/components/concrete/Header/Nav/Avatar';
import Dropdown from '@src/components/concrete/Header/Nav/Dropdown';
import NavItem from '@src/components/concrete/Header/Nav/NavItem';
import NavLinkItem from '@src/components/concrete/Header/Nav/NavLinkItem';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

// Types
import { Nav, Store } from '@src/typings/types';

type Props = {
  adminHelpDropdown: Nav.Dropdown;
  config: Store.Config;
  dropdown: Nav.Dropdown;
  helpDropdown: Nav.Dropdown;
  inventDropdown: Nav.Dropdown;
  invoiceDropdown: Nav.Dropdown;
  perfDropdown: Nav.Dropdown;
  toggleDropdown: (dropdownName: string) => void;
  user: Store.Auth.User;
  venueDropdown: Nav.Dropdown;
};

class Navigation extends React.Component<Props> {
  _adminHelpDropdownLinkGroups = [];
  _dropdownLinkGroups = [];
  _helpDropdownLinkGroups = [];
  _inventDropdownLinkGroups = [];
  _invoiceDropdownLinkGroups = [];
  _perfDropdownLinkGroups = [];
  _venueDropdownLinkGroups = [];

  constructor(props: Props) {
    super(props);
    const { adminHelpDropdown, config, dropdown, helpDropdown, inventDropdown, invoiceDropdown, perfDropdown, venueDropdown } = this.props;

    const linkGroups = getLinkGroups(config);

    if (dropdown && dropdown.linkGroups) {
      this._dropdownLinkGroups = returnDropdownLinkGroups(dropdown, linkGroups);
    }
    if (helpDropdown && dropdown.linkGroups) {
      this._helpDropdownLinkGroups = returnDropdownLinkGroups(helpDropdown, linkGroups);
    }
    if (venueDropdown && dropdown.linkGroups) {
      this._venueDropdownLinkGroups = returnDropdownLinkGroups(venueDropdown, linkGroups);
    }
    if (perfDropdown && dropdown.linkGroups) {
      this._perfDropdownLinkGroups = returnDropdownLinkGroups(perfDropdown, linkGroups);
    }
    if (invoiceDropdown && dropdown.linkGroups) {
      this._invoiceDropdownLinkGroups = returnDropdownLinkGroups(invoiceDropdown, linkGroups);
    }
    if (inventDropdown && dropdown.linkGroups) {
      this._inventDropdownLinkGroups = returnDropdownLinkGroups(inventDropdown, linkGroups);
    }
    if (adminHelpDropdown && dropdown.linkGroups) {
      this._adminHelpDropdownLinkGroups = returnDropdownLinkGroups(adminHelpDropdown, linkGroups);
    }
  }

  handleToggle = (dropdown, dropdownName): void => {
    const { toggleDropdown } = this.props;
    if (!dropdown.isVisible) {
      toggleDropdown(dropdownName);
    }
  }

  render() {
    const { adminHelpDropdown, dropdown, helpDropdown, inventDropdown, invoiceDropdown, perfDropdown, venueDropdown, toggleDropdown, user } = this.props;
    return (
      <div>
        <div className={css(styles.navContainer)}>
          <nav>
            <ul className={css(styles.navList, margin.all_0, padding.all_0)}>
              <EagleVision>
                <NavItem>
                  <SpoofOrNonAdmin>
                    <BrowserLink
                      attributes={{ title: { transKey: 'nav.admin_unadopt' } }}
                      className={css(styles.navLink)}
                      href="/administrator/spoof/disengage"
                    >
                      <NavLinkItem>
                        <Translatable content={{ transKey: 'nav.admin_unadopt' }} />
                      </NavLinkItem>
                    </BrowserLink>
                  </SpoofOrNonAdmin>
                  <AdminNonSpoof>
                    <BrowserLink
                      attributes={{ title: { transKey: 'nav.admin_adopt' } }}
                      className={css(styles.navLink)}
                      href="/administrator/spoof/engage"
                    >
                      <NavLinkItem>
                        <Translatable content={{ transKey: 'nav.admin_adopt' }} />
                      </NavLinkItem>
                    </BrowserLink>
                  </AdminNonSpoof>
                </NavItem>
              </EagleVision>
              <AdminNonSpoof>
                <NavItem>
                  <BrowserLink
                    attributes={{ title: { transKey: 'nav.bookings' } }}
                    className={css(styles.navLink)}
                    href="/administrator/payments/bookings/1"
                  >
                    <NavLinkItem>
                      <Translatable content={{ transKey: 'nav.bookings' }} />
                    </NavLinkItem>
                  </BrowserLink>
                </NavItem>
                <NavItem>
                  <BrowserLink
                    attributes={{ title: 'Enquiries' }}
                    className={css(styles.navLink)}
                    href="/administrator/enquiries/index/pending"
                  >
                    <NavLinkItem>
                      <span>
                        Enquiries
                      </span>
                    </NavLinkItem>
                  </BrowserLink>
                </NavItem>
                <NavItem>
                  <InteractionLink
                    action={() => this.handleToggle(perfDropdown, 'perfDropdown')}
                    className={css(styles.navLink)}
                  >
                    <NavLinkItem>
                      <Translatable content={this._perfDropdownLinkGroups[0].title} />
                    </NavLinkItem>
                  </InteractionLink>
                  {(perfDropdown && perfDropdown.isVisible) &&
                    <Dropdown
                      clickOutsideActive={true}
                      dropdown={perfDropdown}
                      dropdownLinkGroups={this._perfDropdownLinkGroups}
                      dropdownName="perfDropdown"
                      onToggleDropdown={toggleDropdown}
                    />
                  }
                </NavItem>
                <NavItem>
                  <InteractionLink
                    action={() => this.handleToggle(invoiceDropdown, 'invoiceDropdown')}
                    className={css(styles.navLink)}
                  >
                    <NavLinkItem>
                      <Translatable content={this._invoiceDropdownLinkGroups[0].title} />
                    </NavLinkItem>
                  </InteractionLink>
                  {(invoiceDropdown && invoiceDropdown.isVisible) &&
                    <Dropdown
                      clickOutsideActive={true}
                      dropdown={invoiceDropdown}
                      dropdownLinkGroups={this._invoiceDropdownLinkGroups}
                      dropdownName="invoiceDropdown"
                      onToggleDropdown={toggleDropdown}
                    />
                  }
                </NavItem>
                <NavItem>
                  <InteractionLink
                    action={() => this.handleToggle(inventDropdown, 'inventDropdown')}
                    className={css(styles.navLink)}
                  >
                    <NavLinkItem>
                      <Translatable content={this._inventDropdownLinkGroups[0].title} />
                    </NavLinkItem>
                  </InteractionLink>
                  {(inventDropdown && inventDropdown.isVisible) &&
                    <Dropdown
                      clickOutsideActive={true}
                      dropdown={inventDropdown}
                      dropdownLinkGroups={this._inventDropdownLinkGroups}
                      dropdownName="inventDropdown"
                      onToggleDropdown={toggleDropdown}
                    />
                  }
                </NavItem>
                <NavItem>
                  <BrowserLink
                    attributes={{ title: 'Users' }}
                    className={css(styles.navLink)}
                    href="/administrator/members/users"
                  >
                    <NavLinkItem>
                      <span>
                        Users
                      </span>
                    </NavLinkItem>
                  </BrowserLink>
                </NavItem>
                <NavItem>
                  <InteractionLink
                    action={() => this.handleToggle(adminHelpDropdown, 'adminHelpDropdown')}
                    className={css(styles.navLink)}
                  >
                    <NavLinkItem>
                      <Translatable content={this._adminHelpDropdownLinkGroups[0].title} />
                    </NavLinkItem>
                  </InteractionLink>
                  {(adminHelpDropdown && adminHelpDropdown.isVisible) &&
                    <Dropdown
                      clickOutsideActive={true}
                      dropdown={adminHelpDropdown}
                      dropdownLinkGroups={this._adminHelpDropdownLinkGroups}
                      dropdownName="adminHelpDropdown"
                      onToggleDropdown={toggleDropdown}
                    />
                  }
                </NavItem>
              </AdminNonSpoof>
              <SpoofOrNonAdmin>
                <VenueOwner>
                  <NavItem>
                    <BrowserLink
                      attributes={{ title: { transKey: 'nav.add_new_listing' } }}
                      className={css(styles.navLink)}
                      href="/dashboard/listings"
                    >
                      <NavLinkItem>
                        <Translatable content={{ transKey: 'nav.add_new_listing' }} />
                      </NavLinkItem>
                    </BrowserLink>
                  </NavItem>
                  <NavItem>
                    <InteractionLink
                      action={() => this.handleToggle(venueDropdown, 'venueDropdown')}
                      className={css(styles.navLink)}
                    >
                      <NavLinkItem>
                        <Translatable content={this._venueDropdownLinkGroups[0].title} />
                      </NavLinkItem>
                    </InteractionLink>
                    {(venueDropdown && venueDropdown.isVisible) &&
                      <Dropdown
                        clickOutsideActive={true}
                        dropdown={venueDropdown}
                        dropdownLinkGroups={this._venueDropdownLinkGroups}
                        dropdownName="venueDropdown"
                        onToggleDropdown={toggleDropdown}
                      />
                    }
                  </NavItem>
                </VenueOwner>
                <NonVenueOwner>
                  <NavItem>
                    <NonLoggedIn>
                      <BrowserLink
                        attributes={{ title: { transKey: 'nav.list_your_space' } }}
                        className={css(styles.navLink)}
                        href="/get-started"
                      >
                        <NavLinkItem>
                          <Translatable content={{ transKey: 'nav.list_your_space' }} />
                        </NavLinkItem>
                      </BrowserLink>
                    </NonLoggedIn>
                    <LoggedIn>
                      <BrowserLink
                        attributes={{ title: { transKey: 'nav.list_your_space' } }}
                        className={css(styles.navLink)}
                        href="/venues/new"
                      >
                        <NavLinkItem>
                          <Translatable content={{ transKey: 'nav.list_your_space' }} />
                        </NavLinkItem>
                      </BrowserLink>
                    </LoggedIn>
                  </NavItem>
                  <LoggedIn>
                    <NavItem>
                      <BrowserLink
                        attributes={{ title: { transKey: 'nav.favourites' } }}
                        className={css(styles.navLink)}
                        href="/dashboard/favourites"
                      >
                        <NavLinkItem>
                          <Translatable content={{ transKey: 'nav.favourites' }} />
                        </NavLinkItem>
                      </BrowserLink>
                    </NavItem>
                  </LoggedIn>
                </NonVenueOwner>
                <VenueOwner>
                  <NavItem>
                    <BrowserLink
                      attributes={{ title: { transKey: 'nav.schedule' } }}
                      className={css(styles.navLink)}
                      href="/dashboard/schedule"
                    >
                      <NavLinkItem>
                        <Translatable content={{ transKey: 'nav.schedule' }} />
                      </NavLinkItem>
                    </BrowserLink>
                  </NavItem>
                </VenueOwner>
                <LoggedIn>
                  <NavItem>
                    <VenueOwner>
                      <BrowserLink
                        attributes={{ title: { transKey: 'nav.bookings' } }}
                        className={css(styles.navLink)}
                        href="/dashboard/venue-bookings"
                      >
                        <NavLinkItem>
                          <Translatable content={{ transKey: 'nav.bookings' }} />
                        </NavLinkItem>
                      </BrowserLink>
                    </VenueOwner>
                    <NonVenueOwner>
                      <BrowserLink
                        attributes={{ title: { transKey: 'nav.bookings' } }}
                        className={css(styles.navLink)}
                        href="/dashboard/bookings"
                      >
                        <NavLinkItem>
                          <Translatable content={{ transKey: 'nav.bookings' }} />
                        </NavLinkItem>
                      </BrowserLink>
                    </NonVenueOwner>
                  </NavItem>
                  <NavItem>
                    <BrowserLink
                      attributes={{ title: { transKey: 'nav.inbox' } }}
                      className={css(styles.navLink)}
                      href="/dashboard/inbox"
                    >
                      <NavLinkItem>
                        <React.Fragment>
                          <Translatable content={{ transKey: 'nav.inbox' }} />
                          <Dot stylesArray={[styles.notificationBadge]} />
                        </React.Fragment>
                      </NavLinkItem>
                    </BrowserLink>
                  </NavItem>
                </LoggedIn>
                <VenueOwner>
                  <NavItem>
                    <BrowserLink
                      attributes={{ title: { transKey: 'nav.widget' } }}
                      className={css(styles.navLink)}
                      href="/dashboard/widget"
                    >
                      <NavLinkItem>
                        <React.Fragment>
                          <Translatable content={{ transKey: 'nav.widget' }} />
                          {' '}
                          <Translatable content={{ transKey: 'nav.new' }}>
                            <span className={css(styles.newText)} />
                          </Translatable>
                        </React.Fragment>
                      </NavLinkItem>
                    </BrowserLink>
                  </NavItem>
                </VenueOwner>
                <NavItem>
                  <InteractionLink
                    action={() => this.handleToggle(helpDropdown, 'helpDropdown')}
                    className={css(styles.navLink)}
                  >
                    <NavLinkItem>
                      <Translatable content={this._helpDropdownLinkGroups[0].title} />
                    </NavLinkItem>
                  </InteractionLink>
                  {(helpDropdown && helpDropdown.isVisible) &&
                    <Dropdown
                      clickOutsideActive={true}
                      dropdown={helpDropdown}
                      dropdownLinkGroups={this._helpDropdownLinkGroups}
                      dropdownName="helpDropdown"
                      onToggleDropdown={toggleDropdown}
                    />
                  }
                </NavItem>
              </SpoofOrNonAdmin>
              <NonLoggedIn>
                <NavItem>
                  <BrowserLink
                    attributes={{ title: { transKey: 'common.sign_up' } }}
                    className={css(styles.navLink)}
                    href="/users/signup"
                    prefetch={true}
                  >
                    <NavLinkItem>
                      <Translatable content={{ transKey: 'common.sign_up' }} />
                    </NavLinkItem>
                  </BrowserLink>
                </NavItem>
              </NonLoggedIn>
              <LoggedIn>
                {dropdown &&
                  <NavItem isLast={true}>
                    <Avatar
                      dropdown={dropdown}
                      dropdownLinkGroups={this._dropdownLinkGroups}
                      dropdownName="dropdown"
                      onToggleDropdown={toggleDropdown}
                      user={user}
                    />
                  </NavItem>
                }
              </LoggedIn>
              <NonLoggedIn>
                <NavItem isLast={true}>
                  <BrowserLink
                    attributes={{ title: { transKey: 'common.login' } }}
                    className={css(styles.navLink)}
                    href="/users/signin"
                    prefetch={true}
                  >
                    <NavLinkItem>
                      <Translatable content={{ transKey: 'common.login' }} />
                    </NavLinkItem>
                  </BrowserLink>
                </NavItem>
              </NonLoggedIn>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default Navigation;

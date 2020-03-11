/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';
import shortid from 'shortid';

// Styles
import styles from './styles';

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
import FlyoutNavDropdownItem from '@src/components/concrete/Header/FlyoutMenu/FlyoutNav/FlyoutNavDropdownItem';
import FlyoutNavLine from '@src/components/concrete/Header/FlyoutMenu/FlyoutNav/FlyoutNavLine';
import FlyoutNavLink from '@src/components/concrete/Header/FlyoutMenu/FlyoutNav/FlyoutNavLink';
import { Heart, Message } from '@src/components/concrete/Icons/svgs';

// Types
import { Nav, Store } from '@src/typings/types';

type Props = {
  config: Store.Config;
  mobAdminHelpDropdown: Nav.Dropdown;
  mobDropdown: Nav.Dropdown;
  mobHelpDropdown: Nav.Dropdown;
  mobInventDropdown: Nav.Dropdown;
  mobInvoiceDropdown: Nav.Dropdown;
  mobPerfDropdown: Nav.Dropdown;
  mobVenueDropdown: Nav.Dropdown;
};

class FlyoutNav extends React.Component<Props> {
  _mobAdminHelpDropdownLinkGroups = [];
  _mobDropdownLinkGroups = [];
  _mobHelpDropdownLinkGroups = [];
  _mobInventDropdownLinkGroups = [];
  _mobInvoiceDropdownLinkGroups = [];
  _mobPerfDropdownLinkGroups = [];
  _mobVenueDropdownLinkGroups = [];

  componentWillMount() {
    const { config, mobAdminHelpDropdown, mobDropdown, mobHelpDropdown, mobInventDropdown, mobInvoiceDropdown, mobPerfDropdown, mobVenueDropdown } = this.props;

    const linkGroups = getLinkGroups(config);

    if (mobAdminHelpDropdown) {
      this._mobAdminHelpDropdownLinkGroups = returnDropdownLinkGroups(mobAdminHelpDropdown, linkGroups);
    }
    if (mobDropdown) {
      this._mobDropdownLinkGroups = returnDropdownLinkGroups(mobDropdown, linkGroups);
    }
    if (mobHelpDropdown) {
      this._mobHelpDropdownLinkGroups = returnDropdownLinkGroups(mobHelpDropdown, linkGroups);
    }
    if (mobInventDropdown) {
      this._mobInventDropdownLinkGroups = returnDropdownLinkGroups(mobInventDropdown, linkGroups);
    }
    if (mobInvoiceDropdown) {
      this._mobInvoiceDropdownLinkGroups = returnDropdownLinkGroups(mobInvoiceDropdown, linkGroups);
    }
    if (mobPerfDropdown) {
      this._mobPerfDropdownLinkGroups = returnDropdownLinkGroups(mobPerfDropdown, linkGroups);
    }
    if (mobVenueDropdown) {
      this._mobVenueDropdownLinkGroups = returnDropdownLinkGroups(mobVenueDropdown, linkGroups);
    }
  }

  render() {
    return (
      <nav
        className={css(styles.childContainer)}
        role="menu"
        tabIndex={-1}
      >
        <ul className={css(styles.container)}>
          <FlyoutNavLink
            title={{ transKey: 'common.home' }}
            url="/"
          />
          <EagleVision>
            <FlyoutNavLine />
            <SpoofOrNonAdmin>
              <FlyoutNavLink
                color="#a52903"
                title={{ transKey: 'nav.admin_unadopt' }}
                url="/administrator/spoof/disengage"
              />
            </SpoofOrNonAdmin>
            <AdminNonSpoof>
              <FlyoutNavLink
                color="#a52903"
                title={{ transKey: 'nav.admin_adopt' }}
                url="/administrator/spoof/engage"
              />
            </AdminNonSpoof>
          </EagleVision>
          <FlyoutNavLine />
          <AdminNonSpoof>
            <FlyoutNavLink
              title={{ transKey: 'nav.bookings' }}
              url="/administrator/payments/bookings/1"
            />
            <FlyoutNavLink
              title={{ transKey: 'Enquiries' }}
              url="/administrator/enquiries/index/pending"
            />
            <FlyoutNavLine />
            {this._mobPerfDropdownLinkGroups[0].links.map(link => (
              <FlyoutNavLink
                key={shortid.generate()}
                title={link.title}
                url={link.url}
              />
            ))}
            <FlyoutNavLine />
            {this._mobInvoiceDropdownLinkGroups[0].links.map(link => (
              <FlyoutNavLink
                key={shortid.generate()}
                title={link.title}
                url={link.url}
              />
            ))}
            <FlyoutNavLine />
            {this._mobInventDropdownLinkGroups[0].links.map(link => (
              <FlyoutNavLink
                key={shortid.generate()}
                title={link.title}
                url={link.url}
              />
            ))}
            <FlyoutNavLine />
            <FlyoutNavLink
              title={{ transKey: 'Users' }}
              url="/administrator/members/users"
            />
            <FlyoutNavLine />
            {this._mobAdminHelpDropdownLinkGroups[0].links.map(link => (
              <FlyoutNavLink
                key={shortid.generate()}
                title={link.title}
                url={link.url}
              />
            ))}
          </AdminNonSpoof>
          <LoggedIn>
            <SpoofOrNonAdmin>
              <VenueOwner>
                <FlyoutNavLink
                  title={{ transKey: 'nav.bookings' }}
                  url="/dashboard/venue-bookings"
                />
              </VenueOwner>
              <NonVenueOwner>
                <FlyoutNavLink
                  title={{ transKey: 'nav.bookings' }}
                  url="/dashboard/bookings"
                />
              </NonVenueOwner>
              <FlyoutNavLink
                icon={<Message />}
                title={{ transKey: 'nav.inbox' }}
                url="/dashboard/inbox"
              />
              <NonVenueOwner>
                <FlyoutNavLink
                  icon={<Heart />}
                  title={{ transKey: 'nav.favourites' }}
                  url="/dashboard/favourites"
                />
              </NonVenueOwner>
              <FlyoutNavLine />
              <VenueOwner>
                <FlyoutNavDropdownItem dropdownLink={this._mobVenueDropdownLinkGroups[0].links[0]} />
                <FlyoutNavLink
                  title={{ transKey: 'nav.schedule' }}
                  url="/dashboard/schedule"
                />
                <FlyoutNavDropdownItem dropdownLink={this._mobVenueDropdownLinkGroups[0].links[1]} />
                <FlyoutNavDropdownItem dropdownLink={this._mobVenueDropdownLinkGroups[0].links[2]} />
                <FlyoutNavLine />
              </VenueOwner>
              <FlyoutNavDropdownItem dropdownLink={this._mobDropdownLinkGroups[0].links[1]} />
              <VenueOwner>
                <FlyoutNavLink
                  subtitle={{ transKey: 'nav.widget_subtitle' }}
                  title={{ transKey: 'nav.widget' }}
                  url="/dashboard/widget"
                />
              </VenueOwner>
              <NonVenueOwner>
                <FlyoutNavLine />
                <FlyoutNavLink
                  subtitle={{ transKey: 'nav.listing_subtitle' }}
                  title={{ transKey: 'nav.list_your_space' }}
                  url="/venues/new"
                />
              </NonVenueOwner>
            </SpoofOrNonAdmin>
          </LoggedIn>
          <NonLoggedIn>
            <FlyoutNavLink
              subtitle={{ transKey: 'nav.listing_subtitle' }}
              title={{ transKey: 'nav.list_your_space' }}
              url="/get-started"
            />
          </NonLoggedIn>
          <SpoofOrNonAdmin>
            <FlyoutNavLine />
            <FlyoutNavDropdownItem dropdownLink={this._mobHelpDropdownLinkGroups[0].links[0]} />
            <FlyoutNavDropdownItem dropdownLink={this._mobHelpDropdownLinkGroups[0].links[1]} />
            <FlyoutNavDropdownItem dropdownLink={this._mobHelpDropdownLinkGroups[0].links[2]} />
          </SpoofOrNonAdmin>
          <FlyoutNavLine />
          <NonLoggedIn>
            <FlyoutNavLink
              title={{ transKey: 'common.sign_up' }}
              url="/users/signup"
            />
            <FlyoutNavLink
              title={{ transKey: 'common.login' }}
              url="/users/signin"
            />
          </NonLoggedIn>
          <LoggedIn>
            <FlyoutNavLink
              title={{ transKey: 'common.logout' }}
              url="/users/logout"
            />
          </LoggedIn>
        </ul>
      </nav>
    );
  }
}

export default FlyoutNav;

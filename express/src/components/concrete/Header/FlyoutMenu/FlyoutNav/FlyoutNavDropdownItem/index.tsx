import * as React from 'react';

// Components
import FlyoutNavLink from '@src/components/concrete/Header/FlyoutMenu/FlyoutNav/FlyoutNavLink';

// Types
import { Nav } from '@src/typings/types';

type Props = {
  color?: string;
  dropdownLink: Nav.DropdownLink;
};

const FlyoutNavDropdownItem = ({ color, dropdownLink }: Props) => (
  <FlyoutNavLink
    action={dropdownLink.action}
    color={color}
    icon={dropdownLink.icon}
    tel={dropdownLink.tel}
    title={dropdownLink.title}
    url={dropdownLink.url}
  />
);

export default FlyoutNavDropdownItem;

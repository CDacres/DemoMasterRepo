import * as React from 'react';
import isMobile from 'ismobilejs';

// Components
import MenuDesktop from '@src/components/concrete/Dashboard/CardMenu/MenuDesktop';
import MenuMobile from '@src/components/concrete/Dashboard/CardMenu/MenuMobile';

// Data
import { userInformation } from '@src/data/dashboard/page';

// Types
import { DashboardMenu } from '@src/typings/types';

type Props = {
  dataItems: DashboardMenu[];
  title: string;
};

const CardMenu = ({ dataItems, title }: Props) => (
  <React.Fragment>
    {!isMobile.any ? (
      <MenuDesktop
        dataItems={dataItems}
        title={title}
        user={userInformation}
      />
    ) : (
      <MenuMobile
        dataItems={dataItems}
        title={title}
      />
    )}
  </React.Fragment>
);

export default CardMenu;

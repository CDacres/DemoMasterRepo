import * as React from 'react';

// Components
import LandingPageCrumbs from '@src/components/concrete/Breadcrumbs/LandingPageCrumbs';
import PageCrumbs from '@src/components/concrete/Breadcrumbs/PageCrumbs';

// Types
import { BreadcrumbType } from '@src/typings/types';

type Props = {
  items: BreadcrumbType;
  type?: 'landing_page' | 'normal_page';
};

const Breadcrumbs: React.FunctionComponent<Props> = ({ items, type }) => {
  if (type === 'normal_page') {
    return (
      <PageCrumbs items={items} />
    );
  } else if (type === 'landing_page') {
    return (
      <LandingPageCrumbs items={items} />
    );
  } else {
    return null;
  }
};

Breadcrumbs.defaultProps = {
  type: 'normal_page',
};

export default Breadcrumbs;

import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, padding, pagestyles } from '@src/styles';

// Components
import Breadcrumbs from '@src/components/concrete/Breadcrumbs';
import GenericHeader from '@src/components/concrete/GenericHeader';

// Types
import { BreadcrumbType } from '@src/typings/types';

type Props = {
  breadcrumbItems?: BreadcrumbType;
  children: JSX.Element | JSX.Element[];
  tabs?: JSX.Element;
  title: string;
};

const BusinessWrapper = ({ breadcrumbItems, children, tabs, title }: Props) => (
  <div className={css(margin.top_7)}>
    <section>
      <div className={css(margin.topbottom_5)}>
        {breadcrumbItems &&
          <Breadcrumbs items={breadcrumbItems} />
        }
        <GenericHeader
          stylesArray={[pagestyles.titleLarge, pagestyles.fontBlack, margin.all_0, padding.topbottom_0_75]}
          tag="h1"
          text={title}
        />
      </div>
    </section>
    {tabs &&
      <React.Fragment>
        {tabs}
      </React.Fragment>
    }
    <div role="tabpanel">
      <div>
        {children}
      </div>
    </div>
  </div>
);

export default BusinessWrapper;

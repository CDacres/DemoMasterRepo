/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import Breadcrumbs from '@src/components/concrete/Breadcrumbs';
import GenericHeader from '@src/components/concrete/GenericHeader';

// Types
import { BreadcrumbType } from '@src/typings/types';

type Props = {
  breadcrumbItems?: BreadcrumbType;
  children: JSX.Element | JSX.Element[];
  sideBar?: JSX.Element;
  tabs?: JSX.Element;
  title: string;
};

const DashboardWrapper = ({ breadcrumbItems, children, sideBar, tabs, title }: Props) => (
  <div className={css(margin.bottom_6)}>
    <section>
      <div className={css(margin.topbottom_5)}>
        {breadcrumbItems &&
          <Breadcrumbs items={breadcrumbItems} />
        }
        <div className={css(margin.top_1_5)}>
          <GenericHeader
            stylesArray={[pagestyles.titleLarge, pagestyles.fontBlack, margin.all_0, padding.topbottom_0]}
            tag="h1"
            text={title}
          />
        </div>
      </div>
    </section>
    {tabs &&
      <React.Fragment>
        {tabs}
      </React.Fragment>
    }
    <div dir="ltr">
      <div className={css(pagestyles.row, pagestyles.clearfix)}>
        <div className={css(padding.leftright_1, sideBar ? [pagestyles.columnSmallScreen, pagestyles.sevenTwelfthsColumnSmallScreen] : pagestyles.relativePosition)}>
          {children}
        </div>
        {sideBar &&
          <div className={css(styles.dashboardSidebar, pagestyles.column, pagestyles.thirdColumnSmallScreen, padding.leftright_1)}>
            {sideBar}
          </div>
        }
      </div>
    </div>
  </div>
);

export default DashboardWrapper;

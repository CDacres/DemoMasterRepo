/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, padding, pagestyles } from '@src/styles';

type Props = {
  bigTable?: boolean;
  children: JSX.Element | JSX.Element[];
  fullSize?: boolean;
  smallOnBigScreen?: boolean;
};

const DashboardTemplate = ({ bigTable, children, fullSize, smallOnBigScreen }: Props) => {
  let templateStyle = [];
  if (fullSize) {
    templateStyle = [pagestyles.pageContainerFullScreenWidth, pagestyles.pageContainerLarge, padding.leftright_5_small];
  } else if (bigTable) {
    templateStyle = [pagestyles.pageContainerBigTableWidth, pagestyles.pageContainerLarge, padding.leftright_5_small];
  } else {
    templateStyle = [pagestyles.pageContainer, pagestyles.pageContainerAutoWidth, pagestyles.fullColumn, pagestyles.pageContainerChangeableWidthLarge];
  }
  return (
    <div dir="ltr">
      <div className={css(templateStyle, padding.leftright_3, smallOnBigScreen ? pagestyles.pageContainerSmallOnBigScreen : null)}>
        <div className={css(margin.all_0)}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardTemplate;

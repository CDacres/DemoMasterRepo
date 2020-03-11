import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { RightSidebar } from '@src/components/abstract/MediaQuery';

type Props = {
  children: JSX.Element | JSX.Element[];
  sideBar?: JSX.Element;
};

const BusinessItem = ({ children, sideBar }: Props) => (
  <div className={css(pagestyles.largerRow, pagestyles.clearfix)}>
    <div className={css(pagestyles.column, pagestyles.twoThirdsColumn, pagestyles.columnFloat, padding.leftright_1_5)}>
      {children}
    </div>
    {sideBar &&
      <div className={css(pagestyles.column, pagestyles.thirdColumn, pagestyles.columnFloat, padding.leftright_1_5)}>
        <div>
          <div className={css(margin.left_5, margin.top_6)}>
            <RightSidebar>
              {matches => {
                if (matches) {
                  return (
                    <React.Fragment>
                      {sideBar}
                    </React.Fragment>
                  );
                }
                return null;
              }}
            </RightSidebar>
          </div>
        </div>
      </div>
    }
  </div>
);

export default BusinessItem;

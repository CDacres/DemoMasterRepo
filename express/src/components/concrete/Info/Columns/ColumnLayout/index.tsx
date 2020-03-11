/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import SectionInner from '@src/components/concrete/Info/Section/SectionInner';

type Props = {
  data: JSX.Element[];
  smallScreenFull?: boolean;
};

const ColumnLayout = ({ data, smallScreenFull }: Props) => {
  let smallScreenOuterWidth: object = {};
  let largeScreenOuterWidth: object = {};
  let innerMargin: object[] = [];
  if (data.length === 2) {
    smallScreenOuterWidth = pagestyles.halfColumnSmallScreen;
    largeScreenOuterWidth = pagestyles.halfColumnLargeScreen;
    innerMargin = [margin.leftright_7_small, margin.left_0_large, margin.right_8_large];
  } else if (data.length === 3) {
    smallScreenOuterWidth = pagestyles.thirdColumnSmallScreen;
    largeScreenOuterWidth = pagestyles.thirdColumnLargeScreen;
    innerMargin = [styles.inner, margin.leftright_7_small, margin.left_0_large];
  }
  return (
    <SectionInner hasHiddenFont={true}>
      <div className={css(pagestyles.row, pagestyles.clearfix)}>
        {data.map((item, index) => (
          <div
            className={css(pagestyles.column, padding.leftright_1, smallScreenFull ? pagestyles.fullColumnSmallScreen : smallScreenOuterWidth, largeScreenOuterWidth)}
            key={index}
          >
            <div className={css(margin.bottom_6, margin.bottom_0_small)}>
              <div className={css(margin.all_0, smallScreenFull ? innerMargin : [margin.leftright_0_25_small, margin.left_0_5_large, margin.right_0_large])}>
                {item}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionInner>
  );
};

export default ColumnLayout;

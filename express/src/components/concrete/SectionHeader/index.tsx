import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import GenericHeader from '@src/components/concrete/GenericHeader';

type Props = {
  sectionSubtitle?: string;
  sectionTitle: string;
};

const SectionHeader = ({ sectionSubtitle, sectionTitle }: Props) => (
  <div className={css(styles.sectionHeader, padding.all_0)}>
    <div className={css(pagestyles.fullColumn, pagestyles.tableCellBaseline)}>
      <div className={css(styles.sectionHeaderContainer)}>
        <div className={css(pagestyles.fullColumn, pagestyles.tableCellMiddle)}>
          <div className={css(pagestyles.fullColumn, margin.bottom_1, margin.bottom_1_small)}>
            <GenericHeader
              stylesArray={[styles.sectionHeaderH3, margin.topbottom_0, padding.topbottom_0_25]}
              text={sectionTitle}
            />
            {sectionSubtitle &&
              <GenericHeader
                stylesArray={[styles.sectionHeaderH4, margin.top_0, margin.bottom_2, padding.topbottom_0]}
                tag="h4"
                text={sectionSubtitle}
              />
            }
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SectionHeader;

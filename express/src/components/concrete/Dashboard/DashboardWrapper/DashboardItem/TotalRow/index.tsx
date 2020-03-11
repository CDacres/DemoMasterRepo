import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  text: string;
  total: string | number;
};

const TotalRow = ({ text, total }: Props) => (
  <React.Fragment>
    <div className={css(pagestyles.fullColumn, pagestyles.tableCellTop)}>
      <div className={css(pagestyles.clearfix)}>
        <Translatable content={{ transKey: text }}>
          <span className={css(pagestyles.text, margin.all_0)} />
        </Translatable>
      </div>
    </div>
    <div className={css(pagestyles.tableCellTop)}>
      <div className={css(margin.left_2)}>
        <div className={css(pagestyles.textNoWrap)}>
          <div className={css(pagestyles.text, margin.all_0)}>
            {total}
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>
);

export default TotalRow;

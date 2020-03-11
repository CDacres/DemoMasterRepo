/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, padding, pagestyles } from '@src/styles';

// Components
import SubtitleItem from '@src/components/concrete/Dashboard/Subtitle/SubtitleItem';
import HeaderItem from '@src/components/concrete/Dashboard/Columns/ColumnHeader/HeaderItem';

type Props = {
  list: string[];
  title: string;
};

const ColumnHeader = ({ list, title }: Props) => (
  <div className={css(margin.top_4, margin.bottom_2)}>
    <div className={css(pagestyles.row, pagestyles.clearfix)}>
      <div className={css(pagestyles.column, pagestyles.sevenTwelfthsColumn, pagestyles.columnFloat, padding.leftright_1)}>
        <section>
          <SubtitleItem
            changesSize={true}
            text={title}
          />
        </section>
      </div>
      <div className={css(pagestyles.column, pagestyles.fiveTwelfthsColumn, pagestyles.columnFloat, padding.leftright_1)}>
        <div className={css(margin.top_1)}>
          <div className={css(pagestyles.row, pagestyles.clearfix)}>
            {list.map((item, index) => (
              <HeaderItem
                key={index}
                label={item}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ColumnHeader;

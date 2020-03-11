import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  day: number;
  month: string;
  monthShort: string;
  text: string;
  time: string;
};

const DateItem = ({ day, month, monthShort, text, time }: Props) => (
  <div className={css(styles.wrapper)}>
    <div className={css(styles.dateWrapper)}>
      <div className={css(margin.topbottom_1, margin.leftright_1_5)}>
        <Translatable content={{ transKey: month }}>
          <span className={css(pagestyles.hiddenText)} />
        </Translatable>
        <div>
          <Translatable content={{ transKey: monthShort }}>
            <span className={css(pagestyles.smallSubtitle, pagestyles.fontBlack, margin.all_0)} />
          </Translatable>
        </div>
        <Translatable content={{ transKey: day.toString() }}>
          <div className={css(pagestyles.text, pagestyles.fontBlack, margin.all_0)} />
        </Translatable>
      </div>
    </div>
    <div className={css(pagestyles.inlineBlock, margin.top_1, margin.bottom_0_75, margin.leftright_2)}>
      <Translatable content={{ transKey: text }}>
        <span className={css(pagestyles.smallText, margin.all_0)} />
      </Translatable>
      <div className={css(margin.top_0_25)}>
        <Translatable content={{ transKey: time }}>
          <div className={css(pagestyles.text, margin.all_0)} />
        </Translatable>
      </div>
    </div>
  </div>
);

export default DateItem;

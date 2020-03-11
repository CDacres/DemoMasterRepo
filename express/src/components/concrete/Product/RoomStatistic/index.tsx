import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { Gear, Star } from '@src/components/concrete/Icons/svgs';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  count?: number;
  name: string;
  type: string;
};

const RoomStatistic = ({ count, name, type }: Props) => (
  <div className={css(pagestyles.inlineBlock, margin.right_2)}>
    <div className={css(styles.infoWrapperInner)}>
      <div className={css(styles.row)}>
        {type === 'review' ? (
          <a
            className={css(styles.reviewLink, pagestyles.tableCellMiddle)}
            href="#reviews"
          >
            <div className={css(pagestyles.tableCellMiddle)}>
              <div className={css(padding.right_1)}>
                <span aria-hidden="true">
                  <Star stylesArray={[pagestyles.icon12]} />
                </span>
              </div>
            </div>
            <Translatable content={{ transKey: name, count: count, replacements: { number: count } }}>
              <span className={css(pagestyles.tableCellMiddle)} />
            </Translatable>
          </a>
        ) : (
          <div className={css(pagestyles.tableCellMiddle)}>
            <div className={css(pagestyles.tableCellMiddle)}>
              <div className={css(padding.right_1)}>
                <span aria-hidden="true">
                  <Gear stylesArray={[pagestyles.icon12]} />
                </span>
              </div>
            </div>
            <Translatable content={{ transKey: name }}>
              <span className={css(pagestyles.tableCellMiddle)} />
            </Translatable>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default RoomStatistic;

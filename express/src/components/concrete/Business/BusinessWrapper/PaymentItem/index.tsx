import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import { Card } from '@src/components/concrete/Icons/svgs';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  subtitle: string;
  title: string;
};

const PaymentItem = ({ subtitle, title }: Props) => (
  <React.Fragment>
    <div className={css(padding.topbottom_3)}>
      <div className={css(styles.wrapper)}>
        <div className={css(pagestyles.tableCellTop)}>
          <div className={css(margin.right_2)}>
            <span className={css(styles.iconContainer)}>
              <span className={css(styles.iconInner)}>
                <Card />
              </span>
            </span>
          </div>
        </div>
        <div className={css(pagestyles.fullColumn, pagestyles.tableCellTop)}>
          <div className={css(pagestyles.clearfix)}>
            <Translatable content={{ transKey: title }}>
              <span className={css(pagestyles.text, margin.all_0)} />
            </Translatable>
          </div>
          <div className={css(margin.top_1)}>
            <Translatable content={{ transKey: subtitle }}>
              <div className={css(pagestyles.smallText)} />
            </Translatable>
          </div>
        </div>
      </div>
    </div>
    <ContentSeparator marginNum={0} />
  </React.Fragment>
);

export default PaymentItem;

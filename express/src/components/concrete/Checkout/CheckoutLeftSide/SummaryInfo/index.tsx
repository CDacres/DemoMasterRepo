import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import GenericCard from '@src/components/concrete/GenericCard';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  children: JSX.Element;
  text: string;
};

const SummaryInfo = ({ children, text }: Props) => (
  <div className={css(margin.top_1)}>
    <div className={css(styles.wrapper)}>
      <div className={css(pagestyles.tableCellTop)}>
        <GenericCard
          borderRadius="3px"
          boxShadow="none"
          customStyle={styles.iconContainer}
          padding="0px"
        >
          <div className={css(margin.all_2)}>
            {children}
          </div>
        </GenericCard>
      </div>
      <div className={css(pagestyles.fullColumn, pagestyles.tableCellTop)}>
        <div className={css(styles.textContainer)}>
          <div className={css(pagestyles.tableCellMiddle)}>
            <div className={css(margin.left_2)}>
              <Translatable content={{ transKey: text }}>
                <div className={css(pagestyles.text, margin.all_0)} />
              </Translatable>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SummaryInfo;

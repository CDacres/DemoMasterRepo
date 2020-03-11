/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import GenericCard from '@src/components/concrete/GenericCard';
import GenericHeader from '@src/components/concrete/GenericHeader';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  amount: string;
  isRed?: boolean;
  text: string;
};

const ReportingCard = ({ amount, isRed, text }: Props) => (
  <GenericCard
    borderColor="#e4e4e4"
    borderRadius="10px"
    boxShadow="none"
    customStyle={margin.all_0}
    padding="0px 24px"
  >
    <div className={css(pagestyles.centeredText)}>
      <div className={css(margin.topbottom_2)}>
        <section>
          <GenericHeader
            stylesArray={[pagestyles.defaultTitle]}
            tag="h1"
          >
            <div className={css(styles.text, margin.all_0, padding.topbottom_1, isRed ? styles.textRed : null)}>
              {amount}
            </div>
          </GenericHeader>
        </section>
        <Translatable content={{ transKey: text }}>
          <div className={css(margin.top_2)} />
        </Translatable>
      </div>
    </div>
  </GenericCard>
);

export default ReportingCard;

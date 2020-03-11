import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { ProductLargeScreen } from '@src/components/abstract/MediaQuery';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  label: string;
};

const HeaderItem = ({ label }: Props) => (
  <div className={css(pagestyles.column, pagestyles.columnFloat, pagestyles.thirdColumn, padding.leftright_1)}>
    <ProductLargeScreen>
      {matches => {
        if (matches) {
          return (
            <Translatable content={{ transKey: label }}>
              <div className={css(pagestyles.smallSubtitle, pagestyles.centeredText, margin.all_0)} />
            </Translatable>
          );
        }
        return (
          <Translatable content={{ transKey: label }}>
            <div className={css(styles.smallText, pagestyles.centeredText, margin.all_0)} />
          </Translatable>
        );
      }}
    </ProductLargeScreen>
  </div>
);

export default HeaderItem;

/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { LoginSecurity } from '@src/components/concrete/Icons/svgs';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import InteractionButton from '@src/components/concrete/Button/InteractionButton';

type Props = {
  description: string;
  onClick: () => void;
  title: string;
};

const CancellationDetails = ({ description, onClick, title }: Props) => (
  <div className={css(margin.bottom_3)}>
    <div className={css(pagestyles.row, pagestyles.clearfix)}>
      <div className={css(pagestyles.column, pagestyles.threeQuartersColumn, pagestyles.columnFloat, padding.leftright_1)}>
        <Translatable content={{ transKey: title }}>
          <div className={css(pagestyles.text, pagestyles.fontMedium, margin.all_0)} />
        </Translatable>
        <div className={css(margin.top_1)}>
          <div className={css(pagestyles.smallText, margin.all_0)}>
            <Translatable content={{ transKey: description }} />
            {' '}
            <Translatable content={{ transKey: 'common.more_details' }}>
              <InteractionButton action={onClick} />
            </Translatable>
          </div>
        </div>
      </div>
      <div className={css(styles.iconWrapper, pagestyles.column, padding.leftright_1)}>
        <div className={css(margin.top_1)}>
          <LoginSecurity stylesArray={[pagestyles.icon, pagestyles.icon45, pagestyles.iconOrange]} />
        </div>
      </div>
    </div>
  </div>
);

export default CancellationDetails;

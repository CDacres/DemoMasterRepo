/* tslint:disable:max-line-length */
import * as React from 'react';
import ReactTooltip from 'react-tooltip';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import { LearnMore } from '@src/components/concrete/Icons/svgs';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  customStyle?: object;
  tip?: string;
};

const LearnMoreTooltip = ({ customStyle, tip }: Props) => (
  <Translatable attributes={{ 'data-tip': { transKey: tip } }}>
    <div
      aria-busy="false"
      className={css(styles.learnMoreButton)}
    >
      <LearnMore stylesArray={[styles.learnMore, pagestyles.icon, pagestyles.icon15, pagestyles.iconBlack, margin.right_0, margin.topbottom_0]} />
      <ReactTooltip className={css(styles.tooltip, customStyle ? customStyle : null)} />
    </div>
  </Translatable>
);

export default LearnMoreTooltip;

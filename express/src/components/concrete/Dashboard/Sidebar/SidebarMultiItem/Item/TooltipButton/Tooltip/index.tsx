import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import tooltipButtonStyles from '../styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import GenericCard from '@src/components/concrete/GenericCard';
import { Close, Fang } from '@src/components/concrete/Icons/svgs';
import Button from '@src/components/concrete/Button';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  onClick: () => void;
  text: string;
};

const Tooltip = ({ onClick, text }: Props) => (
  <div className={css(styles.wrapper)}>
    <GenericCard
      borderRadius="none"
      boxShadow="0px 0px 5px rgba(0, 0, 0, 0.1)"
      customStyle={styles.card}
      padding="0px"
    >
      <div>
        <div
          className={css(pagestyles.leftText)}
          role="tooltip"
        >
          <div className={css(styles.content, padding.all_3)}>
            <div className={css(styles.textWrapper)}>
              <Translatable content={{ transKey: text }}>
                <div className={css(pagestyles.smallText, margin.all_0)} />
              </Translatable>
            </div>
            <div className={css(styles.buttonWrapper, margin.left_1)}>
              <Button
                action={onClick}
                stylesArray={[tooltipButtonStyles.tooltipButton, padding.all_0_25]}
              >
                <Close stylesArray={[pagestyles.icon, pagestyles.icon12, pagestyles.iconGrey]} />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Fang
        stroke="#ebebeb"
        stylesArray={[styles.fang]}
      />
    </GenericCard>
  </div>
);

export default Tooltip;

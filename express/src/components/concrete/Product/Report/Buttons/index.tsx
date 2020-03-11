import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import Button from '@src/components/concrete/Button';
import StyledButton from '@src/components/concrete/Button/StyledButton';
import { Chevron } from '@src/components/concrete/Icons/svgs';

type Props = {
  hasBack?: boolean;
};

const Buttons = ({ hasBack }: Props) => (
  <div className={css(margin.top_4, margin.bottom_2)}>
    <div className={css(styles.buttonContainer)}>
      {hasBack ? (
        <Button
          // action={} TODO: add action to move back
          stylesArray={[styles.backButton, padding.all_0]}
        >
          <div className={css(pagestyles.table)}>
            <div className={css(pagestyles.tableCellMiddle)}>
              <div className={css(margin.right_1)}>
                <Chevron
                  direction="left"
                  role="presentation"
                  stylesArray={[pagestyles.icon, pagestyles.icon16]}
                />
              </div>
            </div>
            <div className={css(pagestyles.tableCellMiddle)}>
              <Translatable content={{ transKey: 'common.back' }} />
            </div>
          </div>
        </Button>
      ) : (
        <div />
      )}
      <Translatable content={{ transKey: 'common.next' }}>
        <StyledButton
          // action={} TODO: add action to move next
          buttonColor="primary"
        />
      </Translatable>
    </div>
  </div>
);

export default Buttons;

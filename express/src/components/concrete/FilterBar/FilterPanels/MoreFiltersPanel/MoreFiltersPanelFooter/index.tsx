import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import StyledButton from '@src/components/concrete/Button/StyledButton';

type Props = {
  canClear: boolean;
  onApply: () => void;
  onClear: () => void;
};

const MoreFiltersPanelFooter = ({ canClear, onApply, onClear }: Props) => (
  <div className={css(styles.container, padding.right_3)}>
    <div className={css(margin.bottom_1)}>
      <div className={css(pagestyles.rightText)}>
        {canClear &&
          <div className={css(pagestyles.inlineBlock, margin.right_2)}>
            <span>
              <div className={css(styles.text, margin.all_0, padding.topbottom_0)}>
                <Translatable content={{ transKey: 'common.cancel' }}>
                  <StyledButton
                    action={onClear}
                    aria-busy="false"
                    aria-disabled="false"
                    buttonColor="link"
                    customSpanStyle={[styles.cancelButton]}
                  />
                </Translatable>
              </div>
            </span>
          </div>
        }
        <span>
          <Translatable content={{ transKey: 'common.apply' }}>
            <StyledButton
              action={onApply}
              aria-busy="false"
              aria-disabled="false"
              buttonColor="primary"
              customStyle={[styles.applyButton]}
            />
          </Translatable>
        </span>
      </div>
    </div>
  </div>
);

export default MoreFiltersPanelFooter;

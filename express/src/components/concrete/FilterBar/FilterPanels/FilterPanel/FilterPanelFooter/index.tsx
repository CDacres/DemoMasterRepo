import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import Button from '@src/components/concrete/Button';

type Props = {
  canClear: boolean;
  onApply: () => void;
  onClear: () => void;
};

const FilterPanelFooter = ({ canClear, onApply, onClear }: Props) => (
  <div className={css(padding.top_1)}>
    <div className={css(margin.top_0)}>
      <div className={css(pagestyles.flexWrapper)}>
        <div className={css(pagestyles.flexContainer)}>
          {canClear &&
            <div className={css(styles.panelActionsContainerInner, margin.all_0)}>
              <span data-action="cancel">
                <Translatable content={{ transKey: 'common.clear' }}>
                  <Button
                    action={onClear}
                    aria-busy="false"
                    stylesArray={[styles.panelActionsButton, styles.panelActions_cancelButton]}
                  />
                </Translatable>
              </span>
            </div>
          }
        </div>
        <div className={css(pagestyles.inlineBlockMiddle)}>
          <div className={css(styles.panelActionsContainerInner, margin.all_0)}>
            <span data-action="apply">
              <Translatable content={{ transKey: 'common.apply' }}>
                <Button
                  action={onApply}
                  aria-busy="false"
                  stylesArray={[styles.panelActionsButton, styles.panelActions_applyButton]}
                />
              </Translatable>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default FilterPanelFooter;

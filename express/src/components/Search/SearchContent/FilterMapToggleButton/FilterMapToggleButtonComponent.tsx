import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import Button from '@src/components/concrete/Button';
import { FoldOutMap, ThreeLine } from '@src/components/concrete/Icons/svgs';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  mapIsVisible: boolean;
  onClick: () => void;
};

const FilterMapToggleButtonComponent = ({ mapIsVisible, onClick }: Props) => (
  <div>
    <div
      aria-hidden="true"
      className={css(styles.iconContainer)}
      data-id="FloatingFilterButtonWrapper"
    >
      <div className={css(pagestyles.inlineBlock)}>
        <Button
          action={onClick}
          stylesArray={[styles.filterButton]}
        >
          <span className={css(pagestyles.inlineBlockMiddle)}>
            <div className={css(pagestyles.table)}>
              <Translatable content={{ transKey: mapIsVisible ? 'search.list' : 'common.map' }}>
                <div className={css(pagestyles.tableCellMiddle)} />
              </Translatable>
              <div className={css(pagestyles.tableCellMiddle)}>
                <div className={css(margin.left_0_75)}>
                  <div className={css(styles.filterToggleIconContainer)}>
                    {mapIsVisible ? (
                      <ThreeLine stylesArray={[pagestyles.icon]} />
                    ) : (
                      <FoldOutMap stylesArray={[pagestyles.icon]} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </span>
        </Button>
      </div>
    </div>
  </div>
);

export default FilterMapToggleButtonComponent;

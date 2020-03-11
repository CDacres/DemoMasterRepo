/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import headerStyles from '../../../styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components;
import GenericCard from '@src/components/concrete/GenericCard';
import InteractionButton from '@src/components/concrete/Button/InteractionButton';
import TableButton from '@src/components/concrete/Table/InteractionTable/Buttons/TableButton';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  children: JSX.Element;
  handleScroll: (e: any) => void;
  isBottom: boolean;
  onApply: () => void;
  onClear: () => void;
};

const FilterItemsComponent = ({ children, handleScroll, isBottom, onApply, onClear }: Props) => (
  <GenericCard
    borderRadius="0px 0px 4px 4px"
    borderWidth="0px 1px 1px"
    boxShadow="0px 14px 36px 2px rgba(0, 0, 0, 0.15)"
    customStyle={styles.wrapper}
    padding="0px"
  >
    <div className={css(pagestyles.block)}>
      <div className={css(styles.contentWrapper)}>
        <div
          className={css(styles.filtersWrapper)}
          onScroll={handleScroll}
        >
          <div className={css(margin.leftright_3, margin.top_2)}>
            <div className={css(margin.bottom_4)}>
              <Translatable content={{ transKey: 'common.filters' }}>
                <div className={css(pagestyles.subtitle, pagestyles.fontBlack, margin.all_0)} />
              </Translatable>
            </div>
            {children}
          </div>
          <div className={css(styles.spaceWrapper, headerStyles.blankWrapper, headerStyles.blankHidden)}>
            <div className={css(styles.spaceContainer, headerStyles.blankWrapper)}>
              <div />
            </div>
            <div className={css(styles.spaceContainer, headerStyles.blankWrapper, styles.spaceContainerBefore)} />
          </div>
        </div>
        <div className={css(styles.shadow, isBottom ? pagestyles.none : pagestyles.block)} />
      </div>
      <div className={css(pagestyles.rightText, padding.topbottom_2)}>
        <div className={css(margin.leftright_3)}>
          <div className={css(pagestyles.inlineBlock, margin.right_2)}>
            <Translatable content={{ transKey: 'common.clear' }}>
              <InteractionButton action={onClear} />
            </Translatable>
          </div>
          <TableButton
            action={onApply}
            text="common.apply"
          />
        </div>
      </div>
    </div>
  </GenericCard>
);

export default FilterItemsComponent;

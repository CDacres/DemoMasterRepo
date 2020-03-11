/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import Button from '@src/components/concrete/Button';
import CloseButton from '@src/components/concrete/Button/CloseButton';
import ContentSeparator from '@src/components/concrete/ContentSeparator';

type Props = {
  canClear: boolean;
  onClear: () => void;
  onClose: () => void;
};

const MobileFilterPanelHeader = ({ canClear, onClear, onClose }: Props) => (
  <React.Fragment>
    <div className={css(styles.panelHeaderContainer, padding.leftright_3)}>
      <div className={css(styles.panelHeader, pagestyles.tableCellMiddle, pagestyles.leftText)}>
        <CloseButton
          action={onClose}
          closeStyle={[pagestyles.icon15]}
          customStyle={[styles.panelHeaderCloseButton]}
        />
      </div>
      <div className={css(styles.panelHeader, styles.panelHeaderTitle, pagestyles.tableCellMiddle, pagestyles.centeredText)}>
        <div className={css(styles.panelHeaderText, margin.all_0)}>
          Filters
        </div>
      </div>
      {canClear &&
        <div className={css(styles.panelHeader, pagestyles.tableCellMiddle, pagestyles.rightText)}>
          <div className={css(styles.panelHeaderText, margin.all_0)}>
            <Translatable content={{ transKey: 'search.clear_all' }}>
              <Button
                action={onClear}
                aria-busy="false"
                stylesArray={[styles.panelHeaderClearButton, margin.all_0, padding.all_0]}
              />
            </Translatable>
          </div>
        </div>
      }
    </div>
    <ContentSeparator marginNum={0} />
  </React.Fragment>
);

export default MobileFilterPanelHeader;

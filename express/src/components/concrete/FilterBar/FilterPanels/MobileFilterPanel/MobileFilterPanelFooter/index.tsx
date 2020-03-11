import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { padding, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import StyledButton from '@src/components/concrete/Button/StyledButton';

type Props = {
  onApply: () => void;
};

const MobileFilterPanelFooter = ({ onApply }: Props) => (
  <div className={css(styles.mobileFilterPanelFooterContainer, padding.leftright_3)}>
    <div className={css(pagestyles.tableCellMiddle)}>
      <Translatable content={{ transKey: 'search.show_results' }}>
        <StyledButton
          action={onApply}
          aria-busy="false"
          buttonColor="primary"
          buttonStyle="updated"
          customStyle={[styles.mobileFilterPanelFooterButton]}
        />
      </Translatable>
    </div>
  </div>
);

export default MobileFilterPanelFooter;

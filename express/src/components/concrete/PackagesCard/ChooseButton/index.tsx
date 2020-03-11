import * as React from 'react';

// Styles
import packageCardStyles from '../styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import StyledButton from '@src/components/concrete/Button/StyledButton';

const ChooseButton = () => (
  <Translatable content={{ transKey: 'room.choose' }}>
    <StyledButton
      // action={}
      // TODO: add action to select the right type in the sidebar or open the mobile sidebar and choose type
      buttonStyle="updated"
      customStyle={[packageCardStyles.priceButton]}
    />
  </Translatable>
);

export default ChooseButton;

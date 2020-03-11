import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import Button from '@src/components/concrete/Button';

const ContactInfo = () => (
  <React.Fragment>
    <div className={css(margin.bottom_2)}>
      <Translatable content={{ transKey: 'venue.popup_contact_text' }}>
        <div className={css(pagestyles.text)} />
      </Translatable>
    </div>
    <div className={css(pagestyles.text, margin.all_0)}>
      <Translatable content={{ transKey: 'venue.popup_contact_button' }}>
        <Button
          // action={onClick} // TODO: add action
          stylesArray={[styles.button, padding.all_0]}
        />
      </Translatable>
    </div>
  </React.Fragment>
);

export default ContactInfo;

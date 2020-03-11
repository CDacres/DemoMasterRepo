import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import GenericHeader from '@src/components/concrete/GenericHeader';
import StyledButton from '@src/components/concrete/Button/StyledButton';
import StyledInput from '@src/components/concrete/Inputs/StyledInput';

type Props = {
  buttonDisabled: boolean;
  domain: string;
  handleChange: (e: any) => void;
  subtitle: string;
  title: string;
  value: string;
};

const ContactPopUpComponent = ({ buttonDisabled, domain, handleChange, subtitle, title, value }: Props) => (
  <section>
    <header>
      <div className={css(styles.titleWrapper, padding.bottom_3, padding.top_0)}>
        <GenericHeader
          stylesArray={[pagestyles.defaultTitle, pagestyles.fontMedium]}
          tag="h1"
        >
          <Translatable content={{ transKey: title }}>
            <div className={css(pagestyles.title, pagestyles.fontBlack, margin.all_0)} />
          </Translatable>
        </GenericHeader>
        <Translatable content={{ transKey: subtitle }} />
      </div>
    </header>
    <section>
      <div className={css(margin.top_2, margin.bottom_4)}>
        <Translatable attributes={{ placeholder: { transKey: 'venue.contact_message_placeholder' } }}>
          <StyledInput
            hiddenLabel={true}
            id="contact"
            label="venue.contact_message"
            name="contact"
            onChange={handleChange}
            value={value}
          />
        </Translatable>
      </div>
    </section>
    <footer className={css(pagestyles.block)}>
      <div className={css(margin.top_3)}>
        <Translatable content={{ transKey: 'venue.contact_button' }}>
          <StyledButton
            // action={() => {}} // TODO: make this a proper action
            disabled={buttonDisabled}
            buttonColor="primary"
            buttonStyle="updated"
          />
        </Translatable>
        <div className={css(margin.top_4)}>
          <Translatable content={{ transKey: 'venue.contact_footer', count: 1, replacements: { domain: domain } }}>
            <div className={css(pagestyles.text, margin.all_0)} />
          </Translatable>
        </div>
      </div>
    </footer>
  </section>
);

export default ContactPopUpComponent;

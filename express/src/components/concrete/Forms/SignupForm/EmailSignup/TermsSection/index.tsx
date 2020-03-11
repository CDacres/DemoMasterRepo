import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { pagestyles } from '@src/styles';

// Connectors
import { useConfig } from '@src/store/connectors';

// Components
import NonTranslatable from '@src/components/abstract/NonTranslatable';
import BrowserLink from '@src/components/abstract/Link';

const TermsSection = (props) => {
  const { config: { language } } = props;
  return (
    <React.Fragment>
      {(language === 'en' || language === 'en_IE' || language === 'en_US') ? (
        <NonTranslatable>
          <div className={css(pagestyles.textBlockSmall)}>
            By signing up, I agree to Zipcube's{' '}
            <BrowserLink
              attributes={{ title: { transKey: 'Terms of Use' } }}
              className={css(pagestyles.link)}
              href="/legal"
              prefetch={true}
            >
              Terms of Use
            </BrowserLink>
            {' '}and{' '}
            <BrowserLink
              attributes={{ title: { transKey: 'Privacy Policy' } }}
              className={css(pagestyles.link)}
              href="/legal#PrivacyPolicy"
            >
              Privacy Policy
            </BrowserLink>
            .
          </div>
        </NonTranslatable>
      ) : (language === 'de') ? (
        <NonTranslatable>
          <div className={css(pagestyles.textBlockSmall)}>
            Mit der Anmeldung erkläre ich mich mit den{' '}
            <BrowserLink
              attributes={{ title: { transKey: 'Nutzungsbedingungen' } }}
              className={css(pagestyles.link)}
              href="/legal"
              prefetch={true}
            >
              Nutzungsbedingungen
            </BrowserLink>
            {' '}und den{' '}
            <BrowserLink
              attributes={{ title: { transKey: 'Datenschutzrichtlinien' } }}
              className={css(pagestyles.link)}
              href="/legal#PrivacyPolicy"
            >
              Datenschutzrichtlinien
            </BrowserLink>
            {' '}von Zipcube einverstanden.
          </div>
        </NonTranslatable>
      ) : (language === 'fr') ? (
        <NonTranslatable>
          <div className={css(pagestyles.textBlockSmall)}>
            En m'inscrivant, j'accepte les{' '}
            <BrowserLink
              attributes={{ title: { transKey: 'Conditions d\'utilisation' } }}
              className={css(pagestyles.link)}
              href="/legal"
              prefetch={true}
            >
              Conditions d'utilisation
            </BrowserLink>
            {' '}et la{' '}
            <BrowserLink
              attributes={{ title: { transKey: 'Politique de confidentalité' } }}
              className={css(pagestyles.link)}
              href="/legal#PrivacyPolicy"
            >
              Politique de confidentalité
            </BrowserLink>
            {' '}de Zipcube.
          </div>
        </NonTranslatable>
      ) : (
        null
      )}
    </React.Fragment>
  );
};

export default useConfig(TermsSection);

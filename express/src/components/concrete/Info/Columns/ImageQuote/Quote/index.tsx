/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import StyledButton from '@src/components/concrete/Button/StyledButton';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  buttonText?: string;
  href: string;
  isSmall?: boolean;
  quoteSubText: string;
  quoteText: string;
};

const Quote = ({ buttonText, href, isSmall, quoteSubText, quoteText }: Props) => (
  <div>
    <div className={css(styles.symbol, margin.left_0, margin.topbottom_0_small, padding.all_0, padding.top_0_small, padding.leftright_0_small, padding.bottom_0_small)}>
      “
    </div>
    <div className={css(margin.bottom_1, margin.bottom_2_small)}>
      <div>
        <Translatable content={{ transKey: quoteText }}>
          <div className={css(isSmall ? [pagestyles.subtitle, margin.all_0] : styles.quote)} />
        </Translatable>
      </div>
    </div>
    <div className={css(margin.bottom_2, margin.bottom_3_large)}>
      <div>
        <div className={css(margin.all_0, isSmall ? pagestyles.smallText : pagestyles.text)}>
          <div className={css(styles.subTextContainer)}>
            <div>
              <Translatable content={{ transKey: quoteSubText }}>
                <p />
              </Translatable>
            </div>
          </div>
        </div>
      </div>
    </div>
    {buttonText &&
      <Translatable content={{ transKey: buttonText }}>
        <StyledButton
          buttonColor="white"
          buttonStyle="updated"
          href={href}
        />
      </Translatable>
    }
  </div>
);

export default Quote;

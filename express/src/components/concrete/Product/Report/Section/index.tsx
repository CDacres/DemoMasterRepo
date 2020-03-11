import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  children: JSX.Element;
  text: string;
};

const Section = ({ children, text }: Props) => (
  <div className={css(styles.section)}>
    <fieldset className={css(pagestyles.noBorder, margin.all_0, padding.all_0)}>
      <legend className={css(padding.all_0)}>
        <Translatable content={{ transKey: text }}>
          <span className={css(pagestyles.hiddenText)} />
        </Translatable>
      </legend>
      <div className={css(margin.topbottom_2)}>
        {children}
      </div>
    </fieldset>
  </div>
);

export default Section;

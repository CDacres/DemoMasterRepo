import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  text: string;
};

const SectionText = ({ text }: Props) => (
  <section>
    <div className={css(styles.wrapper)}>
      <Translatable content={{ transKey: text }}>
        <div className={css(styles.content, margin.all_0)} />
      </Translatable>
    </div>
  </section>
);

export default SectionText;

import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  text: string;
};

const DescriptionInner = ({ text }: Props) => (
  <div className={css(pagestyles.description, margin.all_0)}>
    <div>
      <Translatable content={{ transKey: text }}>
        <p />
      </Translatable>
    </div>
  </div>
);

export default DescriptionInner;

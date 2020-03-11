import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  text: string;
};

const ColumnHeaderText = ({ text }: Props) => (
  <div>
    <Translatable content={{ transKey: text }}>
      <div className={css(pagestyles.leftText, pagestyles.smallText, margin.all_0)} />
    </Translatable>
  </div>
);

export default ColumnHeaderText;

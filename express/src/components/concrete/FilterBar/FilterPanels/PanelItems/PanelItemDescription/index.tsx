import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  text: string;
};

const PanelItemDescription = ({ text }: Props) => (
  <div className={css(margin.top_0_5)}>
    <Translatable content={{ transKey: text }}>
      <div className={css(pagestyles.smallText, margin.all_0)} />
    </Translatable>
  </div>
);

export default PanelItemDescription;

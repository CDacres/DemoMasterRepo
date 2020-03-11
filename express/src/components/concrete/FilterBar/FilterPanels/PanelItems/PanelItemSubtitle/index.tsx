import * as React from 'react';
import isMobile from 'ismobilejs';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

// Components
import EnclosingLabel from '@src/components/concrete/EnclosingLabel';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  text: string;
};

const PanelItemSubtitle = ({ text }: Props) => (
  <EnclosingLabel>
    <Translatable content={{ transKey: text }}>
      {isMobile.any ? (
        <span className={css(pagestyles.subtitle, margin.all_0)} />
      ) : (
        <span className={css(pagestyles.text, pagestyles.fontMedium, margin.all_0)} />
      )}
    </Translatable>
  </EnclosingLabel>
);

export default PanelItemSubtitle;

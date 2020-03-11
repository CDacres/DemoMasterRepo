import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, padding, pagestyles } from '@src/styles';

// Components
import GenericHeader from '@src/components/concrete/GenericHeader';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  subtext?: string;
  text?: string;
};

const ModalTop = ({ subtext, text }: Props) => (
  <header>
    <div className={css(pagestyles.noBottomBorder, padding.top_0, padding.bottom_3)}>
      {text &&
        <GenericHeader
          stylesArray={[pagestyles.defaultTitle]}
          tag="h1"
        >
          <Translatable content={{ transKey: text }}>
            <div className={css(pagestyles.title, pagestyles.fontMedium, margin.all_0, padding.topbottom_0_25)} />
          </Translatable>
        </GenericHeader>
      }
      {subtext &&
        <div className={css(margin.top_2)}>
          <Translatable content={{ transKey: subtext }}>
            <div />
          </Translatable>
        </div>
      }
    </div>
  </header>
);

export default ModalTop;

import * as React from 'react';
import isMobile from 'ismobilejs';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import GenericHeader from '@src/components/concrete/GenericHeader';

type Props = {
  text: string;
};

const PanelItemHeader = ({ text }: Props) => {
  if (isMobile.any) {
    return (
      <div className={css(margin.topbottom_2)}>
        <GenericHeader
          stylesArray={[pagestyles.defaultTitle]}
          tag="h1"
        >
          <Translatable content={{ transKey: text }}>
            <span className={css(pagestyles.subtitle, pagestyles.fontMedium, margin.all_0)} />
          </Translatable>
        </GenericHeader>
      </div>
    );
  } else {
    return (
      <GenericHeader
        stylesArray={[pagestyles.defaultTitle]}
        tag="h1"
      >
        <Translatable content={{ transKey: text }}>
          <span className={css(pagestyles.text, pagestyles.fontMedium, margin.all_0)} />
        </Translatable>
      </GenericHeader>
    );
  }
};

export default PanelItemHeader;

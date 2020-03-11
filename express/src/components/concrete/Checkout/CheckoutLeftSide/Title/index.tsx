import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import GenericHeader from '@src/components/concrete/GenericHeader';

type Props = {
  text: string;
};

const Title = ({ text }: Props) => (
  <div className={css(margin.bottom_4)}>
    <GenericHeader
      stylesArray={[pagestyles.defaultTitle]}
      tag="h1"
    >
      <Translatable content={{ transKey: text }}>
        <div className={css(pagestyles.titleLarge, pagestyles.fontBlack, margin.all_0)} />
      </Translatable>
    </GenericHeader>
  </div>
);

export default Title;

import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, padding, pagestyles } from '@src/styles';

// Components
import GenericHeader from '@src/components/concrete/GenericHeader';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  title: string;
};

const Title = ({ title }: Props) => (
  <section>
    <section>
      <GenericHeader
        stylesArray={[pagestyles.defaultTitle]}
        tag="h3"
      >
        <Translatable content={{ transKey: title }}>
          <div className={css(pagestyles.title, pagestyles.fontBlack, margin.all_0, padding.topbottom_0_25)} />
        </Translatable>
      </GenericHeader>
    </section>
  </section>
);

export default Title;

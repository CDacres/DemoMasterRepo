import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

// Components
import GenericHeader from '@src/components/concrete/GenericHeader';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  text: string;
};

const FilterSectionTitle = ({ text }: Props) => (
  <GenericHeader tag="h2">
    <Translatable content={{ transKey: text }}>
      <div className={css(pagestyles.text, pagestyles.fontMedium, margin.all_0)} />
    </Translatable>
  </GenericHeader>
);

export default FilterSectionTitle;

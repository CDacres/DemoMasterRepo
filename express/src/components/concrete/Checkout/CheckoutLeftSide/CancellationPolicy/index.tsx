import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import GenericHeader from '@src/components/concrete/GenericHeader';
import InteractionButton from '@src/components/concrete/Button/InteractionButton';

type Props = {
  description: string;
  onClick: () => void;
  title: string;
};

const CancellationPolicy = ({ description, onClick, title }: Props) => (
  <div className={css(margin.top_4)}>
    <section>
      <GenericHeader
        stylesArray={[pagestyles.defaultTitle]}
        tag="h2"
      >
        <Translatable content={{ transKey: title }}>
          <div className={css(pagestyles.text, pagestyles.fontMedium, margin.all_0)} />
        </Translatable>
      </GenericHeader>
      <div className={css(margin.top_1)}>
        <div className={css(pagestyles.text, margin.all_0)}>
          <Translatable content={{ transKey: description }} />
          {' '}
          <Translatable content={{ transKey: 'common.more_details' }}>
            <InteractionButton action={onClick} />
          </Translatable>
        </div>
      </div>
    </section>
  </div>
);

export default CancellationPolicy;

/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, padding, pagestyles } from '@src/styles';

// Components
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import InteractionButton from '@src/components/concrete/Button/InteractionButton';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  handleRemove: () => void;
  peopleCount: number;
  text: string;
};

const DomainItemComponent = ({ handleRemove, peopleCount, text }: Props) => (
  <React.Fragment>
    <div className={css(padding.topbottom_3)}>
      <div className={css(pagestyles.flexWrapper)}>
        <div className={css(pagestyles.flexContainer)}>
          <div>
            <div className={css(pagestyles.text)}>
              {text}
            </div>
            <div className={css(margin.top_1)}>
              <div className={css(margin.topbottom_1)}>
                <Translatable content={{ transKey: 'business.settings_domain_used', count: peopleCount, replacements: { number: peopleCount } }}>
                  <div className={css(pagestyles.text, margin.all_0)} />
                </Translatable>
              </div>
            </div>
          </div>
        </div>
        <div className={css(pagestyles.inlineBlockMiddle)}>
          <div className={css(pagestyles.text, pagestyles.fontMedium, margin.all_0)}>
            <Translatable content={{ transKey: 'business.settings_domain_remove' }}>
              <InteractionButton action={handleRemove} />
            </Translatable>
          </div>
        </div>
      </div>
    </div>
    <ContentSeparator marginNum={0} />
  </React.Fragment>
);

export default DomainItemComponent;

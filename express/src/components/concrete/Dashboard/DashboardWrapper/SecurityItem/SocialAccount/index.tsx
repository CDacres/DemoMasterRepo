import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import InteractionButton from '@src/components/concrete/Button/InteractionButton';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  connected: boolean;
  label: string;
  onConnect: () => void;
};

const SocialAccount = ({ connected, label, onConnect }: Props) => (
  <React.Fragment>
    <div className={css(padding.topbottom_3)}>
      <div className={css(pagestyles.flexWrapper)}>
        <div className={css(pagestyles.flexContainer)}>
          <span className={css(pagestyles.text, margin.all_0)}>
            <Translatable content={{ transKey: label }}>
              <div className={css(pagestyles.text, pagestyles.fontMedium, margin.all_0)} />
            </Translatable>
          </span>
        </div>
        <div className={css(pagestyles.inlineBlockMiddle)}>
          <span className={css(pagestyles.text, margin.all_0)}>
            <InteractionButton action={onConnect}>
              <Translatable content={{ transKey: connected ? 'dashboard.disconnect' : 'dashboard.connect' }}>
                <div className={css(pagestyles.text, pagestyles.fontMedium, margin.all_0)} />
              </Translatable>
            </InteractionButton>
          </span>
        </div>
      </div>
      <div className={css(margin.top_1)}>
        <div className={css(pagestyles.smallText, margin.all_0)}>
          <Translatable content={{ transKey: connected ? 'dashboard.connected' : 'dashboard.not_connected' }}>
            <div className={css(styles.greyText, pagestyles.text, margin.all_0)} />
          </Translatable>
        </div>
      </div>
    </div>
    <ContentSeparator marginNum={0} />
  </React.Fragment>
);

export default SocialAccount;

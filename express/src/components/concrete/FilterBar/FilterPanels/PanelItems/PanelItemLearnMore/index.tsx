import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import BrowserLink from '@src/components/abstract/Link';

const PanelItemLearnMore = () => (
  <div className={css(margin.top_0)}>
    <div className={css(pagestyles.smallText, margin.all_0)}>
      <BrowserLink
        attributes={{ title: { transKey: 'common.learn_more' } }}
        className={css(pagestyles.link, pagestyles.leftText)}
        href="/" // TODO: correct link
      >
        <Translatable content={{ transKey: 'common.learn_more' }} />
      </BrowserLink>
    </div>
  </div>
);

export default PanelItemLearnMore;

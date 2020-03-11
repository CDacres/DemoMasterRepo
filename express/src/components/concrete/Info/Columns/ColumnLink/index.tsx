import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

// Components
import BrowserLink from '@src/components/abstract/Link';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

// Types
import { Link } from '@src/typings/types';

const ColumnLink = ({ href, text }: Link) => (
  <div className={css(margin.top_2)}>
    <div className={css(pagestyles.description, margin.all_0)}>
      <BrowserLink
        className={css(pagestyles.link, pagestyles.linkUnderlined)}
        href={href}
      >
        <Translatable content={{ transKey: text }} />
      </BrowserLink>
    </div>
  </div>
);

export default ColumnLink;

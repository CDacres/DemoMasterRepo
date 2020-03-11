import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

// Components
import BrowserLink from '@src/components/abstract/Link';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  description: string;
  href: string;
  text: string;
};

const Link = ({ description, href, text }: Props) => (
<div className={css(pagestyles.text, margin.all_0)}>
  <Translatable content={{ transKey: description }} />
  <div className={css(pagestyles.inline, margin.left_1)}>
    <BrowserLink
      className={css(pagestyles.link, pagestyles.linkUnderlined)}
      href={href}
    >
      <Translatable content={{ transKey: text }} />
    </BrowserLink>
  </div>
</div>
);

export default Link;

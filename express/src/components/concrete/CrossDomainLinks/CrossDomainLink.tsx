import * as React from 'react';

// Components
import BrowserLink from '@src/components/abstract/Link';

const CrossDomainLink = ({ flag, href, prefix, transKey }) => (
  <BrowserLink
    attributes={{ title: { transKey: transKey } }}
    forceDomain={prefix}
    href={href}
  >
    {flag}
  </BrowserLink>
);

export default CrossDomainLink;

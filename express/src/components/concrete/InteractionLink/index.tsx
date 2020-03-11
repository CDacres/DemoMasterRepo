/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

// Types
import { LinkProp, TelLink, MailLink, ActionLink } from '@src/typings/types';

const InteractionLink = ({ action, attributes, children, mail, tel, ...initialProps }: LinkProp & TelLink & MailLink & ActionLink) => {
  const props = {
    ...initialProps,
    href: mail ? `mailto:${mail}` : tel ? `tel:${tel}` : null,
    onClick: action ? action : null,
  };
  return (
    <Translatable attributes={attributes}>
      <a {...props}>
        {children}
      </a>
    </Translatable>
  );
};

export default InteractionLink;

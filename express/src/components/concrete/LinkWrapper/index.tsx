/* tslint:disable:max-line-length */
import * as React from 'react';

// Components
import BrowserLink from '@src/components/abstract/Link';
import InteractionLink from '@src/components/concrete/InteractionLink';

// Types
import { LinkProp, BrowserLinkProps, TelLink, MailLink, ActionLink } from '@src/typings/types';

class LinkWrapper extends React.PureComponent<LinkProp & BrowserLinkProps & TelLink & MailLink & ActionLink> {
  render() {
    const { children, href } = this.props;
    if (href) {
      return (
        <BrowserLink
          href={href}
          {...this.props}
        >
          {children}
        </BrowserLink>
      );
    } else {
      return (
        <InteractionLink
          {...this.props}
        >
          {children}
        </InteractionLink>
      );
    }
  }
}

export default LinkWrapper;
